"use client";

import { useMemo, useRef, useState } from "react";

type Message = { id: string; role: "user" | "assistant"; text: string };

type Chunk = { text: string; tokens: string[] };

function tokenize(text: string): string[] {
  return (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function buildChunks(rawText: string): Chunk[] {
  const cleaned = (rawText || "").replace(/\r/g, "");
  const parts = cleaned
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .slice(0, 80);

  return parts.map((p) => ({ text: p, tokens: tokenize(p) }));
}

function scoreChunk(queryTokens: string[], chunkTokens: string[]): number {
  if (queryTokens.length === 0) return 0;
  const chunkSet = new Set(chunkTokens);
  let hit = 0;
  for (const token of queryTokens) {
    if (chunkSet.has(token)) hit += 1;
  }
  return hit / Math.max(3, Math.sqrt(chunkTokens.length));
}

function answerFromResume(question: string, chunks: Chunk[]): string {
  const q = question.trim();
  const qTokens = tokenize(q);
  if (!q) return "Ask something like: ‘What did you build at Schneider Electric?’";

  const scored = chunks
    .map((c) => ({ c, s: scoreChunk(qTokens, c.tokens) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, 3)
    .filter((x) => x.s > 0.08);

  if (scored.length === 0) {
    return "I couldn’t find a strong match in the resume text. Try asking about: Schneider Electric, .NET microservices, CI/CD, monitoring, or AI/ML.";
  }

  const snippets = scored.map((x) => x.c.text.replace(/\n/g, " "));
  return `Here’s what I found in the resume:\n\n- ${snippets.join("\n- ")}`;
}

export function ResumeAssistant({
  rawResumeText,
  prompts,
}: {
  rawResumeText: string;
  prompts: string[];
}) {
  const chunks = useMemo(() => buildChunks(rawResumeText), [rawResumeText]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m0",
      role: "assistant",
      text: "Hi! Ask me anything about my resume (experience, skills, impact).",
    },
  ]);
  const [value, setValue] = useState("");
  const logRef = useRef<HTMLDivElement | null>(null);

  function push(role: Message["role"], text: string) {
    setMessages((prev) => {
      const next = [...prev, { id: crypto.randomUUID(), role, text }];
      queueMicrotask(() => {
        if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
      });
      return next;
    });
  }

  function submit(q: string) {
    push("user", q);
    const a = answerFromResume(q, chunks);
    push("assistant", a);
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <p className="text-sm text-zinc-300">
          Ask questions about my resume. This assistant runs fully in your browser and answers using
          semantic-style matching over my resume text.
        </p>

        <div
          ref={logRef}
          className="mt-4 h-[360px] overflow-auto rounded-2xl border border-white/10 bg-black/20 p-4"
          aria-live="polite"
        >
          {messages.map((m) => (
            <div key={m.id} className="mb-3">
              <div className="text-[11px] font-semibold tracking-[0.18em] text-zinc-400 uppercase">
                {m.role === "user" ? "You" : "Assistant"}
              </div>
              <div
                className={
                  "mt-1 rounded-2xl border p-3 text-sm leading-relaxed " +
                  (m.role === "user"
                    ? "border-sky-400/30 bg-sky-400/5"
                    : "border-white/10 bg-white/5")
                }
              >
                {m.text.split("\n").map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <form
          className="mt-3 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const q = value.trim();
            setValue("");
            submit(q);
          }}
        >
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="e.g., What did you build at Schneider Electric?"
            className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-sky-500/25"
          />
          <button
            type="submit"
            className="rounded-2xl border border-sky-400/40 bg-sky-400/10 px-4 py-3 text-sm font-medium hover:bg-sky-400/15"
          >
            Ask
          </button>
        </form>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="text-[12px] font-semibold tracking-[0.22em] text-zinc-400 uppercase">
          Try these
        </div>
        <ul className="mt-4 space-y-3 text-sm text-zinc-200">
          {prompts.map((p) => (
            <li key={p}>
              <button
                type="button"
                onClick={() => {
                  setValue(p);
                }}
                className="text-left underline decoration-white/20 underline-offset-4 hover:decoration-white/40"
              >
                {p}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
