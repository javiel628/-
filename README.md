# Order of the Veil — full-stack website

A Next.js app with a black-and-gold responsive design, Supabase email/password authentication, membership application storage, a protected member dashboard, and a role-gated admin view.

## Important: this is source code, not a hosted website

The frontend pages and routes are implemented, but real authentication and database actions require your own Supabase project and environment variables. The project has not been deployed or tested against your private credentials.

## Requirements

- Node.js 20.9 or newer
- A Supabase account/project
- A compatible Next.js host (Vercel is the simplest option for this stack)

## Setup

1. Extract the ZIP.
2. Create a Supabase project at https://supabase.com.
3. In Supabase, open **SQL Editor**, paste `supabase/schema.sql`, and run it.
4. Copy `.env.example` to `.env.local`.
5. In Supabase Project Settings / API, copy the Project URL and publishable/anon key into `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_PUBLIC_KEY
   ```
   Never put a Supabase service-role key in a `NEXT_PUBLIC_` variable or in frontend code.
6. Install dependencies and run locally:
   ```
   npm install
   npm run dev
   ```
7. Open http://localhost:3000.

## Authentication

- Sign-in is real Supabase Auth; there is no fake demo account.
- For account creation, use Supabase Authentication to create or invite trusted accounts. Public self-registration is intentionally not exposed in this starter.
- After creating an account, verify it as required by your Supabase Auth settings.
- The dashboard requires a signed-in user.
- To grant admin access, open the user's **app_metadata** in the Supabase dashboard and set `{"role":"admin"}`. Do not grant admin by editing user metadata or client-side code.
- The SQL RLS policy checks the protected JWT app_metadata role for admin application access.

## Membership application form

The form inserts records into `membership_applications`. It works only after the schema is installed and the public Supabase URL/key are configured. Database policies allow visitors to submit but only admins to read/update applications.

## Deploy without publishing to GitHub

A ZIP is a convenient way to transfer the source, but a full Next.js server application cannot be made live by uploading its source ZIP to a static drag-and-drop host.

Options:
- **Vercel:** deploy the extracted project using the Vercel CLI (`npm install`, then `npx vercel`) or import it from a Git provider. Configure both environment variables in project settings.
- **Node.js host:** upload/extract the project, install dependencies, set environment variables, build with `npm run build`, then run `npm start`. The host must support persistent Next.js server processes.

Netlify Drop is for static output and is not sufficient for these server routes/authenticated pages by itself.

## Before publishing

- Replace any placeholder contact details and review the copy.
- Configure Supabase Auth URL settings for your final domain.
- Keep database RLS enabled.
- Add rate limiting / anti-spam protection to the public application form before wide public launch.
- Never store credentials in the repository or ZIP.
