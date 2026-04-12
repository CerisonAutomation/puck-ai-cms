# Puck AI CMS

> Production-grade AI-powered visual CMS built on **Puck v0.21.2** + **Next.js 15** + **Supabase** + **Tailwind v4**

## Stack

| Layer | Technology |
|---|---|
| Visual Editor | [@puckeditor/core](https://github.com/puckeditor/puck) v0.21.2 |
| AI Generation | `@puckeditor/plugin-ai` → GPT-4o |
| SEO Analysis | `@puckeditor/plugin-heading-analyzer` |
| Style Isolation | `@puckeditor/plugin-emotion-cache` |
| Framework | Next.js 15 (App Router, Turbo) |
| Database | Supabase (PostgreSQL + RLS) |
| Auth | Supabase Auth |
| Styling | Tailwind CSS v4 |
| Validation | Zod |

## Features

- 🤖 **AI page generation** — describe a page, get a full Puck layout
- 🔒 **Auth-gated editor** — `/path/edit` requires Supabase session
- 📄 **ISR public rendering** — published pages revalidate every 60s
- 🧩 **5 production blocks** — Hero, FeatureGrid, RichText, Stats, CTA
- 📊 **Heading Analyzer** — live SEO H1–H6 audit in editor sidebar
- ⚡ **Experimental virtualization** — 99% faster for large pages
- 🗄️ **Supabase RLS** — row-level security on all page data

## Setup

```bash
npm install
cp .env.example .env.local
# Fill in NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, OPENAI_API_KEY
supabase db push   # or run supabase/migrations/001_pages.sql manually
npm run dev
```

## Usage

| Action | URL |
|---|---|
| View page | `/{path}` |
| Edit page | `/{path}/edit` |
| API: save page | `PUT /api/pages/{path}` |
| API: list pages | `GET /api/pages` |
| AI endpoint | `POST /api/puck` |

## Adding Components

1. Create `components/puck/blocks/MyBlock.tsx`
2. Add type to `PuckProps` in `components/puck/config.tsx`
3. Register in `config.components` with fields + defaultProps + render

The AI will automatically learn your new components from the config schema.
