// Hero.tsx — mobile-first hero with arch frame (centered on mobile, two columns on md+)
import { useRole } from "../hooks/useRoles";
type HeroProps = {
  photoSrc?: string; // transparent PNG/WebP cutout, cropped hips/thighs down
  cvHref?: string,
  email?: string,
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

export default function Hero({
  photoSrc = "/allen_croped.webp",
  cvHref = "/Joallen_Escartin_Resume.pdf",
  email = "joallen.escartin@gmail.com"
}: HeroProps) {

  const role = useRole();

  return (
    <section
      aria-label="Introduction"
      className="flex h-dvh w-full flex-col overflow-hidden md:flex-row md:items-center"
      // className="flex h-dvh w-full flex-col overflow-hidden bg-gray-100 dark:bg-gray-950 md:flex-row md:items-center"
    >
      {/* Text block: centered on mobile, left-aligned on desktop */}
      <div className="flex flex-none flex-col items-center px-6 pt-20 text-center md:w-1/2 md:items-start md:px-16 md:pt-0 md:text-left">
        <h1
          className={`${display} ${nameGradient} w-fit bg-clip-text pb-1 text-[clamp(3.5rem,19vw,7rem)] font-extrabold leading-[0.9] tracking-tighter text-transparent`}
        >
          <span className="block">Allen</span>
          <span className="block">Escartin</span>
        </h1>

        <p
          className={`${display} mt-5 text-balance text-2xl font-medium leading-tight text-gray-900 dark:text-gray-100 md:text-4xl`}
        >
          {role}
        </p>

        <ul
          aria-label="How I work"
          className="mt-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400 md:text-sm"
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

        <p className="mt-4 text-base text-gray-600 dark:text-gray-400 md:max-w-md md:text-lg">
          {CATCHPHRASE}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
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

      {/* Photo area: takes the remaining height so it never collides with text */}
      <div className="relative min-h-[280px] w-full flex-1 md:h-full md:w-1/2 md:flex-none">
        {/* Arch frame (decorative) */}
        <div
          aria-hidden="true"
          className={`${archFill} absolute bottom-0 left-1/2 h-[80%] w-[94%] max-w-[26rem] -translate-x-1/2 rounded-t-full md:h-[70%] md:max-w-[26rem]`}
        />
        {/* Cutout: taller than the arch so the head breaks out of the top */}
        <img
          src={photoSrc}
          alt="Allen Escartin"
          decoding="async"
          className="pointer-events-none absolute bottom-0 left-1/2 h-[100%] w-auto max-w-none -translate-x-1/2 translate-y-[12%] select-none object-contain object-bottom md:h-[140%]"
        />
      </div>
    </section>
  );
}