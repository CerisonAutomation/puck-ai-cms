# Puck AI CMS

Production-ready visual page builder built on [`@measured/puck`](https://puckeditor.com) v0.20.2, Next.js 15, Vercel KV, and Google Gemini AI.

## Stack

| Layer | Tech |
|---|---|
| Editor | `@measured/puck` v0.20.2 |
| Framework | Next.js 15 App Router |
| Styling | Tailwind CSS v4 |
| Backend | Vercel KV (Redis) |
| AI | Google Gemini 2.0 Flash via Vercel AI SDK |
| Deploy | Vercel |

## Routes

| Route | Description |
|---|---|
| `/editor/[slug]` | Visual Puck editor with AI toolbar |
| `/preview/[slug]` | Server-rendered published page (60s ISR) |
| `POST /api/pages/[slug]` | Save page data to Vercel KV |
| `GET /api/pages/[slug]` | Load page data from Vercel KV |
| `POST /api/ai` | Generate page layout from text prompt |
| `GET /api/healthz` | Health check |

## Deploy to Vercel

1. Import repo at [vercel.com/new](https://vercel.com/new)
2. Add a **KV Store**: Vercel Dashboard → Storage → KV → Create → Link to project
3. Add env var: `GOOGLE_GENERATIVE_AI_API_KEY` from [aistudio.google.com](https://aistudio.google.com/app/apikey)
4. Deploy ✓

## Local Dev

```bash
npm install
npm run dev
# Editor: http://localhost:3000/editor/home
```

> Without KV env vars, storage falls back to in-memory (data resets on restart).
