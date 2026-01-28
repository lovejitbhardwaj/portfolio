from __future__ import annotations

import pathlib
import re

from pypdf import PdfReader


def main() -> None:
    pdf_path = pathlib.Path(r"D:\Portfolio\Lovejit_Bhardwaj_Resume (3) (1).pdf")
    out_path = pathlib.Path(r"D:\Portfolio\resume_extracted.txt")

    reader = PdfReader(str(pdf_path))
    text_parts: list[str] = []
    for page in reader.pages:
        t = page.extract_text() or ""
        t = t.replace("\u00a0", " ")
        text_parts.append(t)

    text = "\n\n".join(text_parts)
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text).strip()

    out_path.write_text(text, encoding="utf-8")

    print(f"Extracted {len(text)} chars to {out_path}")
    print("--- Preview (first 1200 chars) ---")
    print(text[:1200])


if __name__ == "__main__":
    main()
