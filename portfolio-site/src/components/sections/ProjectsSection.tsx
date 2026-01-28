import { Reveal } from "@/components/Reveal";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-6 scroll-mt-24">
      <SectionHeading title="Projects" />
      <Reveal className="mt-3">
        <Card className="p-6">
          <div className="text-sm text-zinc-300">
            Send me your 3–6 best projects (name + GitHub + live demo if any) and I’ll add a strong
            Projects section with impact-focused bullets.
          </div>
        </Card>
      </Reveal>
    </section>
  );
}
