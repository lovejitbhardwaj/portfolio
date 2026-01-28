import { Reveal } from "@/components/Reveal";
import { Profile4D } from "@/components/Profile4D";
import { ResumeAssistant } from "@/components/ResumeAssistant";
import { RESUME_DATA } from "@/data/resumeData";

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
          <a href="#top" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-sky-400 to-emerald-400 shadow-[0_0_0_6px_rgba(255,255,255,0.03)]" />
            <span className="font-semibold tracking-wide">{RESUME_DATA.name}</span>
          </a>

          <nav className="hidden items-center gap-2 md:flex" aria-label="Primary">
            {[
              ["About", "#about"],
              ["Experience", "#experience"],
              ["Skills", "#skills"],
              ["Projects", "#projects"],
              ["AI Assistant", "#assistant"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="rounded-xl px-3 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
              >
                {label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/8"
          >
            Contact
          </a>
        </div>
      </header>

      <main id="top" className="mx-auto w-full max-w-6xl px-4">
        <section className="py-12 md:py-16">
          <div className="grid gap-5 md:grid-cols-[1.35fr_.65fr]">
            <Reveal className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h1 className="text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
                {RESUME_DATA.headline}
              </h1>
              <p className="mt-3 max-w-2xl text-zinc-300">{RESUME_DATA.summary}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href="#assistant"
                  className="rounded-xl border border-sky-400/40 bg-sky-400/10 px-4 py-2 text-sm font-medium hover:bg-sky-400/15"
                >
                  Ask my resume
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/8"
                >
                  View resume
                </a>
                {RESUME_DATA.links.github ? (
                  <a
                    href={RESUME_DATA.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/8"
                  >
                    GitHub
                  </a>
                ) : null}
                {RESUME_DATA.links.linkedin ? (
                  <a
                    href={RESUME_DATA.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/8"
                  >
                    LinkedIn
                  </a>
                ) : null}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {RESUME_DATA.highlights.map((pill) => (
                  <span
                    key={pill}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-200"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal className="rounded-2xl border border-white/10 bg-white/5 p-6" delay={0.05}>
              <div className="text-xs font-semibold tracking-[0.22em] text-zinc-400 uppercase">
                Quick Facts
              </div>

              <div className="mt-4">
                <Profile4D src="/profile.jpg" alt={`${RESUME_DATA.name} profile photo`} />
              </div>

              <div className="mt-4 grid gap-3">
                {RESUME_DATA.quickFacts.map((f) => (
                  <div
                    key={f.label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="text-sm font-medium">{f.label}</div>
                    <div className="mt-1 text-sm text-zinc-300">{f.value}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="about" className="py-6">
          <div className="text-xs font-semibold tracking-[0.22em] text-zinc-400 uppercase">
            About
          </div>
          <Reveal className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-zinc-200 leading-relaxed">{RESUME_DATA.about}</p>
          </Reveal>
        </section>

        <section id="experience" className="py-6">
          <div className="text-xs font-semibold tracking-[0.22em] text-zinc-400 uppercase">
            Experience
          </div>
          <div className="mt-3 grid gap-4">
            {RESUME_DATA.experience.map((exp) => (
              <Reveal
                key={`${exp.company}-${exp.role}`}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
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
              </Reveal>
            ))}
          </div>
        </section>

        <section id="skills" className="py-6">
          <div className="text-xs font-semibold tracking-[0.22em] text-zinc-400 uppercase">
            Skills
          </div>

          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <Reveal className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="grid gap-3">
                {RESUME_DATA.skills.map((g) => (
                  <div
                    key={g.label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="text-sm font-semibold">{g.label}</div>
                    <div className="mt-1 text-sm text-zinc-300">
                      {g.items.join(" · ")}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="rounded-2xl border border-white/10 bg-white/5 p-6" delay={0.05}>
              <div className="text-xs font-semibold tracking-[0.22em] text-zinc-400 uppercase">
                What I focus on
              </div>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-zinc-200">
                {RESUME_DATA.focus.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section id="projects" className="py-6">
          <div className="text-xs font-semibold tracking-[0.22em] text-zinc-400 uppercase">
            Projects
          </div>
          <Reveal className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-sm text-zinc-300">
              Send me your 3–6 best projects (name + GitHub + live demo if any) and I’ll add a
              strong Projects section with impact-focused bullets.
            </div>
          </Reveal>
        </section>

        <section id="assistant" className="py-6">
          <div className="text-xs font-semibold tracking-[0.22em] text-zinc-400 uppercase">
            AI Resume Assistant (Local)
          </div>
          <Reveal className="mt-3">
            <ResumeAssistant
              rawResumeText={RESUME_DATA.rawResumeText}
              prompts={RESUME_DATA.prompts}
            />
          </Reveal>
        </section>

        <section id="contact" className="py-6">
          <div className="text-xs font-semibold tracking-[0.22em] text-zinc-400 uppercase">
            Contact
          </div>

          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <Reveal className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="grid gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-sm font-semibold">Location</div>
                  <div className="mt-1 text-sm text-zinc-300">{RESUME_DATA.location}</div>
                </div>
                {RESUME_DATA.contact.email ? (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-sm font-semibold">Email</div>
                    <a
                      href={`mailto:${RESUME_DATA.contact.email}`}
                      className="mt-1 block text-sm text-zinc-200 underline decoration-white/20 underline-offset-4 hover:decoration-white/40"
                    >
                      {RESUME_DATA.contact.email}
                    </a>
                  </div>
                ) : null}
                {RESUME_DATA.contact.phone ? (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-sm font-semibold">Phone</div>
                    <a
                      href={`tel:${RESUME_DATA.contact.phone}`}
                      className="mt-1 block text-sm text-zinc-200 underline decoration-white/20 underline-offset-4 hover:decoration-white/40"
                    >
                      {RESUME_DATA.contact.phone}
                    </a>
                  </div>
                ) : null}
              </div>
            </Reveal>

            <Reveal className="rounded-2xl border border-white/10 bg-white/5 p-6" delay={0.05}>
              <div className="text-sm text-zinc-300">
                If you want the assistant to be a real LLM chatbot for all visitors, we can upgrade
                to an API-backed version later (Gemini/OpenAI) and deploy it behind Firebase
                Functions.
              </div>
            </Reveal>
          </div>
        </section>

        <footer className="py-10 text-sm text-zinc-400">
          © {new Date().getFullYear()} {RESUME_DATA.name}. Built for Firebase Hosting.
        </footer>
      </main>
    </div>
  );
}
