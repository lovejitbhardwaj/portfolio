/* global RESUME_DATA */

function el(tag, className) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  return node;
}

function escapeText(value) {
  return (value || "").toString();
}

function addRevealObserver() {
  const nodes = document.querySelectorAll(".reveal");
  const obs = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      }
    },
    { threshold: 0.12 }
  );
  nodes.forEach((n) => obs.observe(n));
}

function renderHero() {
  document.getElementById("brandName").textContent = RESUME_DATA.name;
  document.getElementById("footerName").textContent = RESUME_DATA.name;

  document.getElementById("heroTitle").textContent = RESUME_DATA.headline;
  document.getElementById("heroSummary").textContent = RESUME_DATA.summary;

  const github = document.getElementById("githubLink");
  github.href = RESUME_DATA.links.github || "#";

  const linkedin = document.getElementById("linkedinLink");
  linkedin.href = RESUME_DATA.links.linkedin || "#";

  const pills = document.getElementById("heroPills");
  pills.innerHTML = "";
  for (const pill of RESUME_DATA.highlights) {
    const p = el("div", "pill");
    p.textContent = pill;
    pills.appendChild(p);
  }

  const quick = document.getElementById("quickFacts");
  quick.innerHTML = "";
  for (const fact of RESUME_DATA.quickFacts) {
    const item = el("div", "item");
    const h3 = el("h3");
    h3.textContent = fact.label;
    const meta = el("div", "meta");
    meta.textContent = fact.value;
    item.appendChild(h3);
    item.appendChild(meta);
    quick.appendChild(item);
  }
}

function renderAbout() {
  document.getElementById("aboutText").textContent = RESUME_DATA.about;
}

function renderExperience() {
  const list = document.getElementById("experienceList");
  list.innerHTML = "";

  for (const exp of RESUME_DATA.experience) {
    const item = el("div", "item reveal");
    const h3 = el("h3");
    h3.textContent = `${exp.role} · ${exp.company}`;
    const meta = el("div", "meta");
    meta.textContent = `${exp.location} · ${exp.dates}`;
    const ul = el("ul", "ul");

    for (const bullet of exp.bullets) {
      const li = el("li");
      li.textContent = bullet;
      ul.appendChild(li);
    }

    item.appendChild(h3);
    item.appendChild(meta);
    item.appendChild(ul);
    list.appendChild(item);
  }
}

function renderSkills() {
  const skillsList = document.getElementById("skillsList");
  skillsList.innerHTML = "";

  for (const group of RESUME_DATA.skills) {
    const item = el("div", "item");
    const h3 = el("h3");
    h3.textContent = group.label;
    const meta = el("div", "meta");
    meta.textContent = group.items.join(" · ");
    item.appendChild(h3);
    item.appendChild(meta);
    skillsList.appendChild(item);
  }

  const focus = document.getElementById("focusList");
  focus.innerHTML = "";
  for (const point of RESUME_DATA.focus) {
    const li = el("li");
    li.textContent = point;
    focus.appendChild(li);
  }
}

function renderContact() {
  const list = document.getElementById("contactList");
  list.innerHTML = "";

  const items = [
    { label: "Location", value: RESUME_DATA.location },
    { label: "Email", value: RESUME_DATA.contact.email, href: `mailto:${RESUME_DATA.contact.email}` },
    { label: "Phone", value: RESUME_DATA.contact.phone, href: RESUME_DATA.contact.phone ? `tel:${RESUME_DATA.contact.phone}` : null },
    { label: "LinkedIn", value: RESUME_DATA.links.linkedin, href: RESUME_DATA.links.linkedin },
    { label: "GitHub", value: RESUME_DATA.links.github, href: RESUME_DATA.links.github },
  ].filter((x) => x.value);

  for (const it of items) {
    const box = el("div", "item");
    const h3 = el("h3");
    h3.textContent = it.label;
    const meta = el("div", "meta");

    if (it.href) {
      const a = el("a");
      a.href = it.href;
      a.target = it.href.startsWith("http") ? "_blank" : "";
      a.rel = it.href.startsWith("http") ? "noreferrer" : "";
      a.textContent = it.value;
      meta.appendChild(a);
    } else {
      meta.textContent = it.value;
    }

    box.appendChild(h3);
    box.appendChild(meta);
    list.appendChild(box);
  }
}

function tokenize(text) {
  return (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function scoreChunk(queryTokens, chunkTokens) {
  if (queryTokens.length === 0) return 0;
  const chunkSet = new Set(chunkTokens);
  let hit = 0;
  for (const t of queryTokens) {
    if (chunkSet.has(t)) hit += 1;
  }
  return hit / Math.max(3, Math.sqrt(chunkTokens.length));
}

function buildResumeChunks(rawText) {
  const cleaned = (rawText || "").replace(/\r/g, "");
  const parts = cleaned
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .slice(0, 80);

  return parts.map((p) => ({
    text: p,
    tokens: tokenize(p),
  }));
}

function answerFromResume(question, chunks) {
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
  const intro = "Here’s what I found in the resume:";
  return `${intro}\n\n- ${snippets.join("\n- ")}`;
}

function addMessage(log, who, text, isUser) {
  const msg = el("div", `msg ${isUser ? "user" : "assistant"}`);
  const label = el("div", "who");
  label.textContent = who;
  const bubble = el("div", "bubble");

  const lines = escapeText(text).split("\n");
  for (const line of lines) {
    const p = el("div");
    p.textContent = line;
    bubble.appendChild(p);
  }

  msg.appendChild(label);
  msg.appendChild(bubble);
  log.appendChild(msg);
  log.scrollTop = log.scrollHeight;
}

function initAssistant() {
  const log = document.getElementById("chatLog");
  const form = document.getElementById("chatForm");
  const input = document.getElementById("chatInput");

  const chunks = buildResumeChunks(RESUME_DATA.rawResumeText);

  addMessage(log, "Assistant", "Hi! Ask me anything about Lovejit’s resume (experience, skills, impact).", false);

  const promptList = document.getElementById("promptList");
  const prompts = RESUME_DATA.prompts;
  promptList.innerHTML = "";
  for (const p of prompts) {
    const li = el("li");
    const a = el("a");
    a.href = "#assistant";
    a.textContent = p;
    a.addEventListener("click", (e) => {
      e.preventDefault();
      input.value = p;
      input.focus();
    });
    li.appendChild(a);
    promptList.appendChild(li);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = input.value;
    input.value = "";
    addMessage(log, "You", q, true);
    const a = answerFromResume(q, chunks);
    addMessage(log, "Assistant", a, false);
  });
}

function init() {
  renderHero();
  renderAbout();
  renderExperience();
  renderSkills();
  renderContact();
  initAssistant();
  addRevealObserver();
  document.getElementById("year").textContent = String(new Date().getFullYear());
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
