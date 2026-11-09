# Raffli CMS — GitHub as the content database

## Overview

Owner-only editor: `/admin`. Portfolio frontend stays in Next.js 16 / Vercel.

- **Data**: `data/projects.cms.json` in **Darren0099/Raffli-dev**, committed through GitHub Contents API
- **Images**: `public/uploads/projects/...` in that same repository, committed as files
- **Authentication**: one admin username/password, salted **scrypt** password hash and short-lived **HMAC-signed HttpOnly** cookie
- **Authorization**: only server-side admin endpoints can write through `GITHUB_TOKEN`; repository & file paths are fixed on server
- **Existing projects**: `data/projectsData.ts` remains a backup. A one-time Import button copies them into the CMS file without overwriting existing slugs
- **Public display**: Published CMS records override static project slugs, and legacy records without overrides remain visible. Draft, Archived, and Deleted projects stay hidden; deletes are reversible via Git history
- **Media URL**: `/uploads/projects/...` works after the GitHub push triggers the Vercel build. GitHub commits may take time to deploy; uploading a draft image also creates a public repo asset

No Supabase project, SQL database, or OAuth app is required. This is a small-scale, Git-backed CMS and will be slower than a real database for heavy writes.

## Secrets: set ONLY in Vercel

In your Vercel **raffli-dev** project → Settings → Environment Variables, for **Production**:

| Key | Value | Notes |
|---|---|---|
| `GITHUB_TOKEN` | Fine-grained personal access token | Select **only** `Darren0099/Raffli-dev`; **Contents: Read and write**. Never use `NEXT_PUBLIC_` for this. |
| `GITHUB_CMS_BRANCH` | `main` | Matches production deployment branch. |
| `CMS_ADMIN_USERNAME` | Your chosen private admin username | No username/password defaults in source. |
| `CMS_ADMIN_PASSWORD_HASH` | `salt:hash` from scrypt | Never store plaintext passwords in source. |
| `CMS_SESSION_SECRET` | At least 32 random characters | Keep private; changing it signs every session out. |
| `PORTFOLIO_CMS_ENABLED` | `false` initially | Set to `true` **only after** successful import/permission tests. |

### Create secure values locally

Use Node.js in a local terminal. To generate a password hash without putting the password into a command argument:

```js
// Save this as a temporary local script OUTSIDE the repository, then run with node.
const crypto = require('node:crypto');
const readline = require('node:readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question('Enter chosen long CMS password: ', (password) => {
  const salt = crypto.randomBytes(16).toString('hex');
  console.log('CMS_ADMIN_PASSWORD_HASH=' + salt + ':' + crypto.scryptSync(password, salt, 64).toString('hex'));
  console.log('CMS_SESSION_SECRET=' + crypto.randomBytes(32).toString('hex'));
  rl.close();
});
```

Set the generated **hash** and **secret** in Vercel. Delete the temporary script. Password input is echoed by this basic terminal example, so run it privately; do not paste the password, hash, token, or session secret into ChatGPT.

### GitHub token permissions

GitHub Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token:
- Owner: your GitHub account
- Repository access: **Only select repositories** → **Darren0099/Raffli-dev**
- Repository permissions: **Contents → Read and write**
- Expiration: choose a reasonable expiry, track when to rotate it.
- No Actions, Administration or all-repositories access is required.

If GitHub returns `403`, inspect: correct Vercel project, environment scope, token expiration, repo selection, **Contents: Read and write**, and branch rules. Do not post the token anywhere.

## Release steps

1. Review and merge the **draft PR** after a green Vercel build, code review, and security check.
2. Configure the Production variables on Vercel, **except** keep `PORTFOLIO_CMS_ENABLED=false`.
3. Redeploy production to inject variables. Open `https://rafflidev.my.id/admin` directly. This URL is not linked from any public navigation, but its existence is **not** secret.
4. Login with the chosen username/password and press **Import existing projects**. The import is idempotent and saves to GitHub.
5. Confirm all legacy projects are listed, assets render, and admin GET/POST/PATCH/DELETE/UPLOAD are unauthorized for an anonymous browser.
6. Create a **Draft** test project, verify it is not public, upload a small image, then Publish. Ensure the GitHub push deploys, and check `/projects/<slug>`.
7. Archive a test project and confirm its public page disappears; then restore Published. Check DELETE tombstone behavior.
8. After testing, change `PORTFOLIO_CMS_ENABLED=true` in Vercel **Production** and redeploy. No other code edits needed for future projects.
9. Optional: use Vercel WAF/rate limits on `/api/admin/session` because in-memory rate limits are instance-specific and not distributed.

### Safety / recovery

- Never send credentials to the assistant or commit them to GitHub.
- All admin mutations require valid session and same-origin browser request; the GitHub API token never reaches client JavaScript.
- `SameSite=Strict`, `HttpOnly`, and `Secure` cookies (production), HMAC, no default credentials.
- Public GitHub repositories expose JSON post data and uploaded image files to GitHub viewers, even if a record is in Draft. **Do not upload confidential drafts or private imagery**.
- Snapshot `projectsData.ts` is unchanged. Restore static-only mode by setting `PORTFOLIO_CMS_ENABLED=false`, then redeploy.
- GitHub file history provides edit/restore tracking. Frequent file updates create commits and may trigger many Vercel deployments; this design suits small portfolios, not high-volume editorial systems.
- Draft/Archived visibility is enforced by the **public API** and the rendered site, not by making GitHub file contents private.
- Media upload currently accepts actual JPG, PNG or WebP **under 2.5MB**; images are committed on upload, and a subsequent project Save is a separate commit.
