# Raffli Portfolio CMS — setup & security

The CMS lives at `/admin` but **a hidden URL is not security**. All writes are secured server-side by Supabase Auth, owner UUID verification, and Postgres/Storage RLS.

## Status

The CMS is implemented on branch `feature/private-project-cms` and uses a dedicated Supabase project **not** the existing InterYouthHRD database. Do not merge/enable in production before provisioning the dedicated project and testing an owner login, image upload, and publish flow.

## Provisioning

1. Create **a new dedicated Supabase project**. Do not reuse any HRD database. Confirm the project's actual billing/cost in Supabase.
2. Apply `db/portfolio-cms.sql` in that **new** project's SQL editor (review before execution).
3. In Supabase Authentication > Users, invite or create **one admin account**, verify email and set a strong password. If supported, enable MFA for that account. Disable public signups unless explicitly needed.
4. Retrieve the user UUID from the Authentication Users dashboard. In the **new database** SQL editor run:
   `insert into public.portfolio_admins(id) values ('UUID-FROM-AUTH-USERS');`
5. In Vercel project **raffli-dev** > Settings > Environment Variables add:
   - `SUPABASE_URL`: URL of the new project (not secret).
   - `SUPABASE_PUBLISHABLE_KEY`: the **publishable** API key (not service role or secret).
   - `PORTFOLIO_ADMIN_USER_ID`: UUID of that single permitted user.
   - `PORTFOLIO_CMS_ENABLED`: `false` initially, then `true` only **after** import and validation.
6. Verify `/admin` login. Use **Import existing projects** once: this inserts all `projectsData.ts` projects into DB and skips existing slugs (no overwrite). Compare public pages against the imported DB entries.
7. Test Draft (not publicly visible), image upload, Published, edit, Archived, and Delete. Verify anonymous POST/PATCH/DELETE return 401, unauthorized accounts cannot access, public list excludes drafts.
8. When verified, set `PORTFOLIO_CMS_ENABLED=true`, redeploy, and confirm public `/projects` and `/projects/[slug]` render from the DB. Maintain `projectsData.ts` as a rollback snapshot.

## Safety and operation

- Public visitors cannot access admin data; the login route itself is discoverable and this is normal. No public navigation links to admin.
- Server-side UUID checks and RLS are both required. Merely hiding a button is insufficient.
- Never commit passwords, Supabase service-role keys, tokens, or `.env` values.
- Upload limits: 6 MB; JPEG, PNG, WebP, AVIF. PDF and SVG uploads deliberately rejected. Existing SVG assets in `public/img/` remain usable.
- A new project starts with **Draft** until you explicitly publish.
- Image uploads are public *once uploaded*; do not upload sensitive/private files.
- Project data saved in database is not a Git commit; enable Supabase backups/exports suited to your plan.
- Reverting to static-only is possible by setting `PORTFOLIO_CMS_ENABLED=false` and redeploying; the original code/data remain intact.
- Login sessions expire and refresh; access cookies are HttpOnly, Secure in production and SameSite Strict.
- Ensure DNS is served through HTTPS; check Vercel logs for failures.
