// Swap these with your real details
const EMAIL = 'joallen.escartin@gmail.com'
const GITHUB_URL = 'https://github.com/jjescartin'
const LINKEDIN_URL = 'https://www.linkedin.com/in/joallenescartin'
const CV_URL = '/Joallen_Escartin_Resume.pdf' // same file as the hero button

const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent('Hello Allen')}`

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const EnvelopeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-5 shrink-0"
    aria-hidden="true"
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
)

const DownloadIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-5 shrink-0"
    aria-hidden="true"
  >
    <path d="M12 3v12" />
    <path d="m7 10 5 5 5-5" />
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
  </svg>
)

// Needs the Space Grotesk (700) Google Font link in index.html
const Wordmark = () => (
  <span className="font-['Space_Grotesk'] text-2xl font-bold tracking-tight">
    <span className="text-white">Allen</span>
    <span className="text-teal-400">ESC</span>
  </span>
)

const socials = [
  { label: 'GitHub', href: GITHUB_URL, Icon: GitHubIcon },
  { label: 'LinkedIn', href: LINKEDIN_URL, Icon: LinkedInIcon },
]

export default function ContactPanel() {
  return (
    <section
      id="contact"
      className="relative flex h-full min-h-screen w-full flex-col overflow-hidden bg-neutral-950 text-neutral-100"
    >
      {/* soft accent glow so the dark bg ties back to the rest of the hub (wider on desktop) */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(45,212,191,0.12),transparent_60%)] md:bg-[radial-gradient(ellipse_90%_60%_at_50%_0%,rgba(45,212,191,0.14),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-12 text-center max-md:px-11 md:pt-16">
        <h2 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
          Let’s <span className="text-teal-400">Connect</span>
        </h2>

        <p className="mt-4 max-w-md text-base text-neutral-400 sm:text-lg md:mt-6 md:max-w-xl md:text-xl">
          Whether you’re looking for a developer to join your team or someone to help bring a
          project to life, I’d be happy to connect.
        </p>

        <div className="mt-8 flex w-full max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center md:mt-10 md:gap-4">
          <a
            href={MAILTO}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-400 px-6 py-3 font-semibold text-neutral-950 transition hover:bg-teal-300 md:px-8 md:py-4 md:text-lg"
          >
            <EnvelopeIcon />
            Contact me
          </a>
          <a
            href={CV_URL}
            download
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold transition hover:border-teal-400 hover:text-teal-400 md:px-8 md:py-4 md:text-lg"
          >
            <DownloadIcon />
            Download CV
          </a>
        </div>

        {/* Socials: circles on mobile, labeled pills on desktop */}
        <div className="mt-8 flex gap-4 md:mt-10">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-12 w-12 items-center justify-center gap-2 rounded-full border border-white/15 text-neutral-300 transition hover:border-teal-400 hover:text-teal-400 md:w-auto md:px-5"
            >
              <Icon />
              <span className="hidden text-sm font-medium md:inline">{label}</span>
            </a>
          ))}
        </div>
      </div>

      <footer className="relative z-10 border-t border-white/10 px-6 py-5 text-center text-xs text-neutral-500">
        {/* Wordmark is already in the nav bar on desktop */}
        <div className="md:hidden">
          <Wordmark />
        </div>
        <p className="mt-2 md:mt-0">Designed and built by yours truly</p>
        <p className="mt-1">
          React · TypeScript · Vite · Tailwind CSS · Crafted in VS Code with Claude
        </p>
        <p className="mt-1">
          © {new Date().getFullYear()} Allen Escartin. All rights reserved.
        </p>
      </footer>
    </section>
  )
}