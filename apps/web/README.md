# StudyBuddy Web

This is the Next.js app for StudyBuddy. It now includes a hackathon-friendly backend structure using:

- Next.js API routes
- Supabase Auth, Postgres, and Storage
- io.net-compatible AI chat completions

The main backend demo lives at `/dashboard`.

## Getting Started

Install dependencies from the repo root if needed:

```bash
npm install
```

Create `apps/web/.env.local` from `apps/web/.env.example`:

```bash
# Use the project URL from Supabase Dashboard → Settings → API (not the REST endpoint)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

IONET_API_KEY=
IONET_BASE_URL=https://api.intelligence.io.solutions/api/v1
IONET_MODEL=meta-llama/Llama-3.3-70B-Instruct
```

In Supabase, open **SQL Editor**, paste the full contents of `apps/web/supabase/schema.sql`, and click **Run**. This creates the `notes`, `ai_outputs`, and `profiles` tables plus the `study-notes` storage bucket.

Verify setup: [http://localhost:3000/api/setup](http://localhost:3000/api/setup) should return `{ "ready": true }`.

Then run the development server from the repo root:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Demo Flow

1. Click **Get Started** on the marketing site, or go to `/auth/signup`.
2. Create an account with email and password.
3. You are redirected to `/dashboard`.
4. Paste notes or upload a `.txt` / `.md` file.
5. Generate a summary, quiz, or study schedule through io.net.
6. Outputs are saved to Supabase and shown in the dashboard.

If you already have an account, use `/auth/login`.

## Important Files

- `src/app/dashboard` - working backend demo UI
- `src/app/api/notes` - create and list notes
- `src/app/api/uploads` - upload text notes to Supabase Storage
- `src/app/api/ai/*` - generate summary, quiz, and schedule
- `src/lib/ai/ionet.ts` - io.net API wrapper
- `src/lib/supabase` - Supabase clients
- `supabase/schema.sql` - database and storage setup

For the hackathon build, uploads intentionally support `.txt` and `.md` first. PDF parsing can be added after the main demo loop works.

## Production Notes

Keep `SUPABASE_SERVICE_ROLE_KEY` and `IONET_API_KEY` server-only. Never expose them with a `NEXT_PUBLIC_` prefix.

Run checks before demo/deploy:

```bash
npm run build
npm run lint
```
