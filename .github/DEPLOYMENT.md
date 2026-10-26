# Frontend CI/CD

The workflow lives in `.github/workflows/frontend.yml`. This page covers what it does and the one-time setup it needs.

## What runs when

| Event | Lint + build | Deploy |
|---|---|---|
| Push to `main` | ✅ | Production |
| Push to `Dashboard` | ✅ | — |
| Pull request into `main` | ✅ | Preview at `pr-<number>--<site>.netlify.app`, with the link posted as a PR comment |
| Push that only changes `Backend/` or `*.md` | skipped | — |

Both deploys ship the exact `dist/` folder that the lint + build job produced. Dependabot opens one grouped dependency PR each week, and CI checks it like any other PR.

## One-time setup

Repo settings can only be changed by the repo owner (`ablaesther12`) or a collaborator with admin rights.

1. **Create the Netlify site.** In Netlify, go to *Add new site → Deploy manually* and drop in any folder; the content doesn't matter. Do **not** choose "Import from Git". GitHub Actions does the deploying, and a Git-linked site would build every commit a second time. If the site is already Git-linked, turn off builds under *Site configuration → Build & deploy → Stop builds*.
2. **Copy two values:**
   - **Site ID:** *Site configuration → General → Site details → Site ID*.
   - **Personal access token:** *User settings → Applications → Personal access tokens → New access token*.
3. **Add the repo secrets.** In GitHub, open *Settings → Secrets and variables → Actions → New repository secret* and add:
   - `NETLIFY_AUTH_TOKEN` = the token
   - `NETLIFY_SITE_ID` = the Site ID
4. **Optional: add the API address.** Once the backend is live, add a repository **variable** (not a secret, since it ends up in the public bundle anyway): `VITE_API_URL` = `https://api.thetechspace.com`.
5. **Recommended: protect `main`.** Under *Settings → Branches → Add rule* for `main`, turn on "Require status checks to pass" and select **Lint & build**.

Until step 3 is done, the deploy job shows a notice and passes, so CI stays green.

## Running the same checks locally

```bash
npm ci
npm run lint
npm run build
```
