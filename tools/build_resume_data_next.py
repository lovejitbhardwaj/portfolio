from __future__ import annotations

import json
import pathlib
import re


def _find_email(text: str) -> str:
    m = re.search(r"[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}", text, flags=re.I)
    return m.group(0) if m else ""


def _find_phone(text: str) -> str:
    m = re.search(r"\+?\d{1,3}[-\s]?\d{9,12}", text)
    return m.group(0).strip() if m else ""


def _find_link(text: str, keyword: str) -> str:
    keyword_lower = keyword.lower()
    for line in text.splitlines():
        if keyword_lower in line.lower():
            m = re.search(r"(https?://\S+|\b\w+\.com/\S+)", line)
            if m:
                val = m.group(0)
                if not val.startswith("http"):
                    val = "https://" + val
                return val
    return ""


def _get_summary(text: str) -> tuple[str, str]:
    summary = "Software Engineer with expertise in full-stack development and AI/ML technologies."
    about = summary
    m = re.search(r"Professional Summary\s+(.*?)(?:Professional Experience|Experience)\s+", text, flags=re.S | re.I)
    if not m:
        return summary, about
    s = re.sub(r"\s+", " ", m.group(1).strip())
    if len(s) > 40:
        return (s[:320].rstrip() + ("…" if len(s) > 320 else ""), s)
    return summary, about


def _get_exp_bullets(text: str) -> list[str]:
    m = re.search(
        r"Schneider Electric.*?\n(.*?)(?:Education|Projects|Certifications|Technical Skills|Skills|$)",
        text,
        flags=re.S | re.I,
    )
    if not m:
        return []
    block = m.group(0)
    bullets: list[str] = []
    for line in block.splitlines():
        line = line.strip().lstrip("•").strip()
        if not line:
            continue
        if line.startswith(("Contributed", "Led", "Implemented", "Built")):
            bullets.append(re.sub(r"\s+", " ", line))
    return bullets[:6]


def main() -> None:
    root = pathlib.Path(r"D:\Portfolio")
    resume_txt = root / "resume_extracted.txt"
    if not resume_txt.exists():
        raise SystemExit("resume_extracted.txt not found")

    text = resume_txt.read_text(encoding="utf-8", errors="ignore")

    # name/headline from first lines if possible
    first_lines = [ln.strip() for ln in text.splitlines() if ln.strip()][:12]
    name = "Lovejit Bhardwaj"
    headline = "Software Engineer & Full‑Stack Developer"
    if len(first_lines) >= 2:
        if 3 <= len(first_lines[0]) <= 40 and " " in first_lines[0]:
            name = first_lines[0]
        if 6 <= len(first_lines[1]) <= 90:
            headline = first_lines[1]

    email = _find_email(text)
    phone = _find_phone(text)
    linkedin = _find_link(text, "linkedin")
    github = _find_link(text, "github")

    summary, about = _get_summary(text)
    exp_bullets = _get_exp_bullets(text)

    data = {
        "name": name,
        "headline": headline,
        "location": "Gurgaon, Haryana, India",
        "summary": summary,
        "about": about,
        "links": {"linkedin": linkedin, "github": github},
        "contact": {"email": email, "phone": phone},
        "highlights": [
            ".NET microservices",
            "CI/CD (GitHub Actions/Terraform)",
            "Monitoring (Dynatrace/JFrog)",
            "Security-focused engineering",
            "AI/ML applications",
        ],
        "quickFacts": [
            {"label": "Role", "value": headline},
            {"label": "Location", "value": "Gurgaon, Haryana, India"},
            {"label": "Company", "value": "Schneider Electric"},
            {"label": "Focus", "value": "Scalable cloud-native systems"},
        ],
        "experience": [
            {
                "company": "Schneider Electric",
                "role": "Software Development Engineer",
                "dates": "Mar 2023 – Present",
                "location": "Bangalore, India",
                "bullets": exp_bullets
                or [
                    "Full-stack development across microservices and cloud-native systems.",
                    "CI/CD automation and monitoring to improve reliability and delivery speed.",
                ],
            }
        ],
        "skills": [
            {"label": "Backend", "items": [".NET", "Microservices", "APIs"]},
            {"label": "DevOps", "items": ["GitHub Actions", "Terraform", "CI/CD"]},
            {"label": "Observability", "items": ["Dynatrace", "Monitoring", "Diagnostics"]},
            {"label": "AI/ML", "items": ["AI-driven apps", "ML foundations"]},
        ],
        "focus": [
            "Performance and scalability under real production constraints",
            "Security-by-design and practical engineering discipline",
            "Automation-first delivery with strong CI/CD hygiene",
            "Clean UX that communicates impact quickly",
        ],
        "prompts": [
            "What did you build at Schneider Electric?",
            "What technologies do you use for microservices and CI/CD?",
            "Summarize your professional profile in 2 lines.",
            "What monitoring/observability work have you done?",
            "What kind of AI/ML work are you interested in?",
        ],
        "rawResumeText": text,
    }

    out = root / "portfolio-site" / "src" / "data" / "resumeData.ts"
    out.parent.mkdir(parents=True, exist_ok=True)

    # Embed as JSON for easy TS import
    json_str = json.dumps(data, ensure_ascii=False)
    # Keep file reasonably formatted
    content = (
        "export type ResumeData = {\n"
        "  name: string;\n"
        "  headline: string;\n"
        "  location: string;\n"
        "  summary: string;\n"
        "  about: string;\n"
        "  links: { linkedin: string; github: string };\n"
        "  contact: { email: string; phone: string };\n"
        "  highlights: string[];\n"
        "  quickFacts: { label: string; value: string }[];\n"
        "  experience: { company: string; role: string; dates: string; location: string; bullets: string[] }[];\n"
        "  skills: { label: string; items: string[] }[];\n"
        "  focus: string[];\n"
        "  prompts: string[];\n"
        "  rawResumeText: string;\n"
        "};\n\n"
        "export const RESUME_DATA: ResumeData = "
        + json_str
        + " as const;\n"
    )

    out.write_text(content, encoding="utf-8")
    print(f"Wrote {out}")


if __name__ == "__main__":
    main()
