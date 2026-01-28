import { RESUME_DATA } from "@/data/resumeData";
import { ButtonLink } from "@/components/ui/ButtonLink";

const navItems: Array<[label: string, href: string]> = [
  ["About", "#about"],
  ["Experience", "#experience"],
  ["Skills", "#skills"],
  ["Projects", "#projects"],
  ["AI Assistant", "#assistant"],
  ["Contact", "#contact"],
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <a href="#top" className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-sky-400 to-emerald-400 shadow-[0_0_0_6px_rgba(255,255,255,0.03)]" />
          <span className="font-semibold tracking-wide">{RESUME_DATA.name}</span>
        </a>

        <nav className="hidden items-center gap-2 md:flex" aria-label="Primary">
          {navItems.map(([label, href]) => (
            <ButtonLink key={href} href={href} variant="ghost" className="px-3 py-2">
              {label}
            </ButtonLink>
          ))}
        </nav>

        <ButtonLink href="#contact" variant="secondary" className="px-3 py-2">
          Contact
        </ButtonLink>
      </div>
    </header>
  );
}
