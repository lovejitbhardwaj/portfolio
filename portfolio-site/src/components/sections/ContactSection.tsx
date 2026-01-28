import { Reveal } from "@/components/Reveal";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RESUME_DATA } from "@/data/resumeData";

export function ContactSection() {
  return (
    <section id="contact" className="py-6 scroll-mt-24">
      <SectionHeading title="Contact" />

      <div className="mt-3 grid gap-4 md:grid-cols-2">
        <Reveal>
          <Card className="p-6">
            <div className="grid gap-3">
              <Card className="p-4">
                <div className="text-sm font-semibold">Location</div>
                <div className="mt-1 text-sm text-zinc-300">{RESUME_DATA.location}</div>
              </Card>

              {RESUME_DATA.contact.email ? (
                <Card className="p-4">
                  <div className="text-sm font-semibold">Email</div>
                  <a
                    href={`mailto:${RESUME_DATA.contact.email}`}
                    className="mt-1 block text-sm text-zinc-200 underline decoration-white/20 underline-offset-4 hover:decoration-white/40"
                  >
                    {RESUME_DATA.contact.email}
                  </a>
                </Card>
              ) : null}

              {RESUME_DATA.contact.phone ? (
                <Card className="p-4">
                  <div className="text-sm font-semibold">Phone</div>
                  <a
                    href={`tel:${RESUME_DATA.contact.phone}`}
                    className="mt-1 block text-sm text-zinc-200 underline decoration-white/20 underline-offset-4 hover:decoration-white/40"
                  >
                    {RESUME_DATA.contact.phone}
                  </a>
                </Card>
              ) : null}
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.05}>
          <Card className="p-6">
            <div className="text-sm text-zinc-300">
              If you want the assistant to be a real LLM chatbot for all visitors, we can upgrade to
              an API-backed version later (Gemini/OpenAI) and deploy it behind Firebase Functions.
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
