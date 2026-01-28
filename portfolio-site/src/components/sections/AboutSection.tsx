import { Reveal } from "@/components/Reveal";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RESUME_DATA } from "@/data/resumeData";

export function AboutSection() {
  return (
    <section id="about" className="py-6 scroll-mt-24">
      <SectionHeading title="About" />
      <Reveal className="mt-3">
        <Card className="p-6">
          <p className="text-zinc-200 leading-relaxed">{RESUME_DATA.about}</p>
        </Card>
      </Reveal>
    </section>
  );
}
