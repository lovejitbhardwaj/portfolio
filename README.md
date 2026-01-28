# Portfolio

This repo contains two versions of the portfolio:

- **Recommended (Next.js + animations):** `portfolio-site/` (Next.js App Router + Tailwind + Framer Motion)
- **Legacy static version:** `public/` (plain HTML/CSS/JS)

## What’s included (Next.js version)
- Responsive single-page portfolio
- Framer Motion reveals + interactive profile tilt (“4D” effect)
- **AI Resume Assistant (Local):** browser-only Q&A over your resume text (no API key required)

## Run locally (Next.js)

```bash
cd portfolio-site
npm install
npm run dev
```

Open http://localhost:3000

## Build + deploy (Firebase Hosting, free)

The Next.js version is configured for **static export**, so Firebase Hosting can serve it.

```bash
cd portfolio-site
npm run build
```

Then deploy from `portfolio-site/`:

```bash
npm i -g firebase-tools
firebase login
cd portfolio-site
firebase deploy
```

(`portfolio-site/firebase.json` already points Hosting at `out/`.)

## Legacy static version

- Open `public/index.html` directly, or run `python -m http.server 5173` inside `public/`.
- Deploy it with the root `firebase.json` (it serves the root `public/` folder).

## Upgrade to “real” LLM AI later
If you want the chat to work for **all visitors**, we can add a secure backend (Firebase Functions) that calls Gemini/OpenAI without exposing secrets.
That usually requires enabling billing (Blaze), but can still stay near $0/month under free quotas.
