// Hero.tsx — mobile-first hero with arch frame (centered on mobile, two columns on md+)
import { useRole } from "../hooks/useRoles";
type HeroProps = {
  photoSrc?: string; // transparent PNG/WebP cutout, cropped hips/thighs down
  cvHref?: string,
  email?: string,
  githubHref?: string,
  linkedinHref?: string,
};

const STORY = ["Build", "Solve", "Deliver"];
const CATCHPHRASE = "Requirements in. Reliable software out.";

const display = "font-['Bricolage_Grotesque',system-ui,sans-serif]";

const nameGradient =
  "bg-[linear-gradient(160deg,#059669_0%,#14b8a6_55%,rgba(45,212,191,0.45)_100%)] " +
  "dark:bg-[linear-gradient(160deg,#34d399_0%,#2dd4bf_55%,rgba(94,234,212,0.45)_100%)]";

// Quiet emerald -> teal tint; slightly stronger in dark mode so it doesn't vanish
const archFill =
  "bg-[linear-gradient(180deg,rgba(16,185,129,0.22)_0%,rgba(20,184,166,0.06)_100%)] " +
  "dark:bg-[linear-gradient(180deg,rgba(52,211,153,0.28)_0%,rgba(45,212,191,0.08)_100%)]";

const socialBtn =
  "inline-flex size-11 items-center justify-center rounded-full border border-gray-400 transition-colors hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-gray-600 dark:hover:bg-gray-800";

const glassBtn =
  "inline-flex size-11 items-center justify-center rounded-full bg-white/35 shadow-lg shadow-black/10 ring-1 ring-white/60 backdrop-blur-lg backdrop-saturate-150 transition-colors active:bg-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:bg-gray-950/30 dark:ring-white/20 dark:active:bg-gray-950/50";

const githubColor = "text-[#181717] dark:text-white";
const linkedinColor = "text-[#0A66C2] dark:text-[#70B5F9]";

const GithubIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a10.9 10.9 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default function Hero({
  photoSrc = "/allen_croped.webp",
  cvHref = "/Joallen_Escartin_Resume.pdf",
  email = "joallen.escartin@gmail.com",
  githubHref = "https://github.com/jjescartin",
  linkedinHref = "https://www.linkedin.com/in/joallenescartin", // TODO: copy the same URL your Contact panel uses
}: HeroProps) {

  const role = useRole();

  return (
    <section
      aria-label="Introduction"
      className="flex h-dvh w-full flex-col overflow-hidden md:flex-row md:items-center"
    >
      {/* Text block: centered on mobile; on desktop a left-aligned column
          (main group vertically centered, social links pinned at the bottom like a footer) */}
      <div className="flex flex-none flex-col items-center px-6 pt-20 text-center md:h-full md:w-1/2 md:items-start md:px-16 md:pb-10 md:pt-24 md:text-left lg:px-24">
        {/* Main group */}
        <div className="flex flex-col items-center md:flex-1 md:items-start md:justify-center">
          {/* Name: on desktop "Hi, I'm" shares the first line with "Allen",
              spread so H lines up with E and the last n lines up with the n of Escartin */}
          <h1
            className={`${display} ${nameGradient} w-fit bg-clip-text pb-1 text-[clamp(3.5rem,19vw,7rem)] font-extrabold leading-[0.9] tracking-tighter text-transparent md:text-[clamp(5rem,9vw,9rem)]`}
          >
            <span className="flex items-baseline justify-center md:justify-between md:gap-3">
              <span className="hidden text-[clamp(1.25rem,2.5vw,2.5rem)] font-bold tracking-normal text-gray-900 md:inline dark:text-gray-100">
                Hi, I&apos;m
              </span>
              <span>Allen</span>
            </span>
            <span className="block">Escartin</span>
          </h1>

          {/* Role + story words + catchphrase */}
          <div className="flex flex-col items-center md:mt-5 md:items-start">
            <p
              className={`${display} mt-5 text-balance text-2xl font-medium leading-tight text-gray-900 dark:text-gray-100 md:mt-0 md:text-5xl`}
            >
              {role}
            </p>

            <ul
              aria-label="How I work"
              className="mt-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-gray-500 md:mt-3 md:text-sm dark:text-gray-400"
            >
              {STORY.map((word, i) => (
                <li key={word} className="flex items-center gap-2">
                  {i > 0 && (
                    <span aria-hidden="true" className="text-gray-400 dark:text-gray-600">
                      •
                    </span>
                  )}
                  {word}
                </li>
              ))}
            </ul>

            <p className="mt-4 text-base text-gray-600 md:mt-2 md:max-w-md md:text-lg dark:text-gray-400">
              {CATCHPHRASE}
            </p>
          </div>

          {/* CTAs */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:mt-6 md:justify-start">
            <a
              href={cvHref}
              download
              className="inline-flex h-12 items-center justify-center rounded-full bg-emerald-700 px-6 text-base font-semibold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:bg-emerald-400 dark:text-gray-950 dark:hover:bg-emerald-300"
            >
              Download CV
            </a>
            <a
              href={`mailto:${email}?subject=${encodeURIComponent("Hello Allen")}`}
              className="inline-flex h-12 items-center justify-center rounded-full border border-gray-400 px-6 text-base font-semibold text-gray-900 transition-colors hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-800"
            >
              Contact me
            </a>
          </div>
        </div>

        {/* Footer-style social links: desktop only, same left edge as the rest */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href={githubHref}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className={`${socialBtn} ${githubColor}`}
          >
            <GithubIcon />
          </a>
          <a
            href={linkedinHref}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            className={`${socialBtn} ${linkedinColor}`}
          >
            <LinkedinIcon />
          </a>
        </div>
      </div>

      {/* Photo area: takes the remaining height so it never collides with text */}
      <div className="relative min-h-[280px] w-full flex-1 md:h-full md:w-1/2 md:flex-none">
        {/* Arch frame (decorative); shifted slightly left on desktop to clear the dot nav */}
        <div
          aria-hidden="true"
          className={`${archFill} absolute bottom-0 left-1/2 h-[80%] w-[94%] max-w-[26rem] -translate-x-1/2 rounded-t-full md:left-[calc(50%-1.5rem)] md:h-[70%] md:max-w-[26rem]`}
        />
        {/* Cutout: taller than the arch so the head breaks out of the top */}
        <img
          src={photoSrc}
          alt="Allen Escartin"
          decoding="async"
          className="pointer-events-none absolute bottom-0 left-1/2 h-[100%] w-auto max-w-none -translate-x-1/2 translate-y-[12%] select-none object-contain object-bottom md:left-[calc(50%-1.5rem)] md:h-[88%] md:translate-y-[6%]"
        />

        {/* Mobile only: social links floating over the photo, footer-style */}
        <div className="absolute inset-x-0 bottom-5 z-10 flex justify-center gap-3 md:hidden">
          <a
            href={githubHref}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className={`${glassBtn} ${githubColor}`}
          >
            <GithubIcon />
          </a>
          <a
            href={linkedinHref}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            className={`${glassBtn} ${linkedinColor}`}
          >
            <LinkedinIcon />
          </a>
        </div>
        
      </div>
    </section>
  );
}