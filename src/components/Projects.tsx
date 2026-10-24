import { useState } from "react";

type Project = {
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  caseStudyUrl: string;
  demoUrl: string;
  githubUrl: string;
  screenshot?: string;
};

const projects: Project[] = [
  {
    title: "ESCend",
    subtitle: "Kanban Application",
    description:
      "A task management application built with Laravel, React, and TypeScript.",
    stack: ["Laravel", "React", "TypeScript", "SQLite", "Tailwind CSS"],
    caseStudyUrl: "https://github.com/jjescartin/ESCend/blob/main/CASE_STUDY.md",
    demoUrl: "https://escend.onrender.com/", // TODO: live demo URL
    githubUrl: "https://github.com/jjescartin/ESCend", // TODO: GitHub repo URL
    screenshot: "/ESC.jpg", // TODO: e.g. "/escend-mobile.png" (put the image in /public)
  },
];

const iconProps = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const DocIcon = () => (
  <svg {...iconProps}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6M8 13h8M8 17h8" />
  </svg>
);

const ExternalIcon = () => (
  <svg {...iconProps}>
    <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </svg>
);

const GithubIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a10.9 10.9 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z" />
  </svg>
);

export default function ProjectsPanel() {
  const [index, setIndex] = useState(0);
  const project = projects[index];
  const hasMany = projects.length > 1;

  const prev = () => setIndex((i) => (i - 1 + projects.length) % projects.length);
  const next = () => setIndex((i) => (i + 1) % projects.length);

  // Shared by the header (mobile) and the bottom-left footer (desktop)
  const pagerControls = (
    <>
      <span className="text-sm tabular-nums">
        {String(index + 1).padStart(2, "0")} /{" "}
        {String(projects.length).padStart(2, "0")}
      </span>
      <button
        type="button"
        onClick={prev}
        aria-label="Previous project"
        className="px-1 hover:text-gray-900 md:px-2 md:text-lg"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next project"
        className="px-1 hover:text-gray-900 md:px-2 md:text-lg"
      >
        ›
      </button>
    </>
  );

  return (
    <div className="flex h-full w-full max-w-md flex-col self-stretch pb-6 pl-6 pr-11 pt-14 text-white md:max-w-none md:pb-10 md:pl-16 md:pr-16 md:pt-24 lg:pl-24 lg:pr-24">
      {/* HEADER: top-left on desktop (start of the Z) */}
      <header className="flex shrink-0 items-start justify-between gap-4">
        <h2
          id="projects-title"
          className="pb-3 text-3xl font-extrabold leading-tight tracking-tight text-black md:text-6xl lg:text-7xl"
        >
          What I Build
        </h2>

        {/* Pager: header on mobile only */}
        {hasMany && (
          <div className="flex shrink-0 items-center gap-3 pt-1 text-neutral-400 md:hidden">
            {pagerControls}
          </div>
        )}
      </header>

      {/* PROJECT CONTENT: stacked on mobile, two columns on desktop (text left, image right) */}
      <div className="mt-2 flex min-h-0 flex-1 flex-col overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="mb-auto mt-[clamp(0.5rem,4dvh,3rem)] flex flex-col gap-3 md:my-auto md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:items-center md:gap-12 lg:gap-16">
          {/* Image: first on mobile, right column on desktop */}
          <div className="h-[clamp(8rem,24dvh,16rem)] w-full overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 md:order-2 md:aspect-[16/10] md:h-auto md:max-h-[60dvh]">
            {project.screenshot ? (
              <img
                src={project.screenshot}
                alt={`${project.title} screenshot`}
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-neutral-600">
                Screenshot
              </div>
            )}
          </div>

          {/* Text group: below the image on mobile, left column on desktop */}
          <div className="flex flex-col gap-3 md:order-1 md:gap-5">
            <div>
              <h3 className="text-4xl font-bold tracking-tight md:text-6xl">
                <span className="text-neutral-900">{project.title.slice(0, 3)}</span>
                <span className="text-teal-500">{project.title.slice(3)}</span>
              </h3>
              <p className="mt-1 text-gray-600 md:mt-2 md:text-xl">{project.subtitle}</p>
            </div>

            <p className="text-sm leading-relaxed text-gray-700 md:max-w-md md:text-base lg:text-lg">
              {project.description}
            </p>

            <ul className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-neutral-800 bg-neutral-900 px-3 py-1 text-xs text-neutral-300 md:text-sm"
                >
                  {tech}
                </li>
              ))}
            </ul>

            {/* Buttons: stacked on mobile, one row on desktop (end of the Z, bottom-left of the text) */}
            <div className="flex flex-col gap-2 pt-2 md:flex-row md:flex-wrap md:items-center md:gap-3 md:pt-3">
              <a
                href={project.caseStudyUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-400 md:px-6 md:py-3 md:text-base"
              >
                <DocIcon />
                View Case Study
              </a>
              <div className="grid grid-cols-2 gap-2 md:contents">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full border border-teal-500 px-3 py-2 text-sm font-medium text-teal-400 transition hover:bg-teal-500/10 md:px-6 md:py-3 md:text-base"
                >
                  <ExternalIcon />
                  Live Demo
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full border border-gray-400 px-3 py-2 text-sm font-medium text-gray-900 transition hover:bg-neutral-800 md:px-6 md:py-3 md:text-base"
                >
                  <GithubIcon />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pager: footer-style, bottom-left on desktop only */}
      {hasMany && (
        <div className="mt-4 hidden w-72 shrink-0 items-center gap-3 border-t border-gray-300 pt-4 text-gray-500 md:flex">
          {pagerControls}
        </div>
      )}
    </div>
  );
}