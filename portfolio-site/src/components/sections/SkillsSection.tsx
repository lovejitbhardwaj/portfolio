import { Reveal } from "@/components/Reveal";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RESUME_DATA } from "@/data/resumeData";

export function SkillsSection() {
  return (
    <section id="skills" className="py-6 scroll-mt-24">
      <SectionHeading title="Skills" />

      <div className="mt-3 grid gap-4 md:grid-cols-2">
        <Reveal>
          <Card className="p-6">
            <div className="grid gap-3">
              {RESUME_DATA.skills.map((g) => (
                <Card key={g.label} className="p-4">
                  <div className="text-sm font-semibold">{g.label}</div>
                  <div className="mt-1 text-sm text-zinc-300">{g.items.join(" · ")}</div>
                </Card>
              ))}
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.05}>
          <Card className="p-6">
            <SectionHeading title="What I focus on" />
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-zinc-200">
              {RESUME_DATA.focus.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
