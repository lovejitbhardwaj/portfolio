import { Reveal } from "@/components/Reveal";
import { ResumeAssistant } from "@/components/ResumeAssistant";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RESUME_DATA } from "@/data/resumeData";

export function AssistantSection() {
  return (
    <section id="assistant" className="py-6 scroll-mt-24">
      <SectionHeading title="AI Resume Assistant (Local)" />
      <Reveal className="mt-3">
        <ResumeAssistant rawResumeText={RESUME_DATA.rawResumeText} prompts={RESUME_DATA.prompts} />
      </Reveal>
    </section>
  );
}
