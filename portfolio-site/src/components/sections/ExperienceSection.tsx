import { Reveal } from "@/components/Reveal";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RESUME_DATA } from "@/data/resumeData";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-6 scroll-mt-24">
      <SectionHeading title="Experience" />
      <div className="mt-3 grid gap-4">
        {RESUME_DATA.experience.map((exp) => (
          <Reveal key={`${exp.company}-${exp.role}`}>
            <Card className="p-6">
              <div className="text-base font-semibold">
                {exp.role} · {exp.company}
              </div>
              <div className="mt-1 text-sm text-zinc-300">
                {exp.location} · {exp.dates}
              </div>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-zinc-200">
                {exp.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
