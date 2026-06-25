# StudyBuddy Agent 🎓

AI study assistant for university students — summarize lecture notes, generate practice quizzes, and build revision schedules. Built for hackathon demos with a marketing site, Supabase backend, and io.net-powered AI.

## Monorepo layout

```
StudyBuddy/
├── apps/web/          # Next.js app (marketing + dashboard + API)
├── package.json       # npm workspaces root scripts
└── README.md
```

## Tech stack

- **Frontend:** Next.js 16, React 19, Framer Motion, Three.js
- **Backend:** Next.js API routes, Supabase Auth / Postgres / Storage
- **AI:** io.net chat completions (Llama 3.3 70B)

## Quick start

### 1. Clone and install

```bash
git clone https://github.com/plutodev1/StudyBuddy.git
cd StudyBuddy
npm install
```

### 2. Environment variables

Copy the example env file and fill in your keys:

```bash
cp apps/web/.env.example apps/web/.env.local
```

| Variable | Where to get it |
|----------|-----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API → **Project URL** (no `/rest/v1/`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API → **anon** key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API → **service_role** key (server only) |
| `IONET_API_KEY` | [io.net](https://io.net) intelligence API |

### 3. Database setup

In Supabase Dashboard → **SQL Editor**, paste and run the full contents of:

```
apps/web/supabase/schema.sql
```

This creates `profiles`, `notes`, `ai_outputs`, and the `study-notes` storage bucket.

Verify: `http://localhost:3000/api/setup` should return `{ "ready": true }`.

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Demo flow

1. **Get Started** → sign up at `/auth/signup`
2. Redirected to `/dashboard`
3. Paste notes or upload `.txt` / `.md`
4. Generate **summary**, **quiz**, or **schedule**
5. AI outputs are saved to Supabase and shown in the UI

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |

## Security

- **Never commit** `.env.local` or API keys.
- `SUPABASE_SERVICE_ROLE_KEY` and `IONET_API_KEY` must not use a `NEXT_PUBLIC_` prefix.
- If keys were ever exposed, rotate them in Supabase and io.net immediately.

## License

MIT
