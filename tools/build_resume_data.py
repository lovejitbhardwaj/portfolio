from __future__ import annotations

import json
import pathlib
import re


def _find_email(text: str) -> str | None:
    m = re.search(r"[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}", text, flags=re.I)
    return m.group(0) if m else None


def _find_phone(text: str) -> str | None:
    # Captures +91-xxxxxxxxxx or similar
    m = re.search(r"\+?\d{1,3}[-\s]?\d{9,12}", text)
    return m.group(0).strip() if m else None


def _find_link(text: str, keyword: str) -> str | None:
    # crude but works for extracted resume lines where URLs may be split
    keyword_lower = keyword.lower()
    for line in text.splitlines():
        if keyword_lower in line.lower():
            m = re.search(r"(https?://\S+|\b\w+\.com/\S+)", line)
            if m:
                val = m.group(0)
                if not val.startswith("http"):
                    val = "https://" + val
                return val
    return None


def main() -> None:
    root = pathlib.Path(r"D:\Portfolio")
    src = root / "resume_extracted.txt"
    if not src.exists():
        raise SystemExit("resume_extracted.txt not found. Run tools/extract_resume.py first.")

    text = src.read_text(encoding="utf-8", errors="ignore")

    name = "Lovejit Bhardwaj"
    headline = "Software Engineer & Full‑Stack Developer"

    # Try to pull a better headline from first 10 lines
    first_lines = [ln.strip() for ln in text.splitlines() if ln.strip()][:12]
    if len(first_lines) >= 2:
        # Often: name then headline
        possible_name = first_lines[0]
        if 3 <= len(possible_name) <= 40 and " " in possible_name:
            name = possible_name
        possible_headline = first_lines[1]
        if 6 <= len(possible_headline) <= 80:
            headline = possible_headline.replace("&", "&").strip()

    email = _find_email(text) or ""
    phone = _find_phone(text) or ""
    linkedin = _find_link(text, "linkedin") or ""
    github = _find_link(text, "github") or ""

    # Professional summary block
    summary = "Software Engineer with expertise in full-stack development and AI/ML technologies."
    about = summary
    summary_match = re.search(r"Professional Summary\s+(.*?)(?:Professional Experience|Experience)\s+", text, flags=re.S | re.I)
    if summary_match:
        s = summary_match.group(1).strip()
        s = re.sub(r"\s+", " ", s)
        if len(s) > 40:
            summary = s[:320].rstrip() + ("…" if len(s) > 320 else "")
            about = s

    # Experience: Schneider Electric block
    exp_bullets: list[str] = []
    exp_block = None
    exp_match = re.search(
        r"Schneider Electric.*?\n(.*?)(?:Education|Projects|Certifications|Technical Skills|Skills|$)",
        text,
        flags=re.S | re.I,
    )
    if exp_match:
        exp_block = exp_match.group(0)
        for line in exp_block.splitlines():
            line = line.strip().lstrip("•").strip()
            if not line:
                continue
            if line.startswith("Contributed") or line.startswith("Led") or line.startswith("Implemented") or line.startswith("Built"):
                exp_bullets.append(re.sub(r"\s+", " ", line))
        exp_bullets = exp_bullets[:6]

    experience = [
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
    ]

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
        "experience": experience,
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

    out = root / "public" / "resume-data.js"
    out.parent.mkdir(parents=True, exist_ok=True)

    js = "window.RESUME_DATA = " + json.dumps(data, ensure_ascii=False) + ";\n"
    out.write_text(js, encoding="utf-8")

    print(f"Wrote {out}")


if __name__ == "__main__":
    main()
