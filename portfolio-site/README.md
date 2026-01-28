# Portfolio (Next.js → Static Export → Firebase Hosting)

This is the **Next.js** version of your AI-driven portfolio.

It is configured for **static export** (`output: "export"`) so you can deploy on **Firebase Hosting** easily.

## Run locally

```bash
cd portfolio-site
npm run dev
```

Open http://localhost:3000

## Build (generates static site)

```bash
cd portfolio-site
npm run build
```

This outputs the static site to `portfolio-site/out/`.

## Deploy to Firebase Hosting

1) Install Firebase CLI (one-time):

```bash
npm i -g firebase-tools
```

2) Login:

```bash
firebase login
```

3) From `portfolio-site/`, initialize hosting (or just use the included `firebase.json`):

```bash
cd portfolio-site
firebase init hosting
```

When asked for the public directory, use: `out`

4) Build then deploy:

```bash
cd portfolio-site
npm run build
firebase deploy
```

## AI Assistant mode

The AI Resume Assistant is currently **local** (no API key required) and answers by matching your question against the resume text.

If you want a true LLM chatbot later (Gemini/OpenAI), we can add a secure API route and deploy it via Firebase Functions (usually requires enabling billing).
