import { Reveal } from "@/components/Reveal";
import { Profile4D } from "@/components/Profile4D";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import { RESUME_DATA } from "@/data/resumeData";

export function HeroSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="grid gap-5 md:grid-cols-[1.35fr_.65fr]">
        <Reveal>
          <Card className="p-6">
            <h1 className="text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
              {RESUME_DATA.headline}
            </h1>
            <p className="mt-3 max-w-2xl text-zinc-300">{RESUME_DATA.summary}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              <ButtonLink href="#assistant" variant="primary">
                Ask my resume
              </ButtonLink>
              <ButtonLink href="/resume.pdf" target="_blank" rel="noreferrer" variant="secondary">
                View resume
              </ButtonLink>
              {RESUME_DATA.links.github ? (
                <ButtonLink
                  href={RESUME_DATA.links.github}
                  target="_blank"
                  rel="noreferrer"
                  variant="secondary"
                >
                  GitHub
                </ButtonLink>
              ) : null}
              {RESUME_DATA.links.linkedin ? (
                <ButtonLink
                  href={RESUME_DATA.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  variant="secondary"
                >
                  LinkedIn
                </ButtonLink>
              ) : null}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {RESUME_DATA.highlights.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-200 hover:bg-white/8"
                >
                  {pill}
                </span>
              ))}
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.05}>
          <Card className="p-6">
            <div className="text-xs font-semibold tracking-[0.22em] text-zinc-400 uppercase">
              Quick Facts
            </div>

            <div className="mt-4">
              <Profile4D src="/profile.jpg" alt={`${RESUME_DATA.name} profile photo`} />
            </div>

            <div className="mt-4 grid gap-3">
              {RESUME_DATA.quickFacts.map((f) => (
                <Card key={f.label} className="p-4">
                  <div className="text-sm font-medium">{f.label}</div>
                  <div className="mt-1 text-sm text-zinc-300">{f.value}</div>
                </Card>
              ))}
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
