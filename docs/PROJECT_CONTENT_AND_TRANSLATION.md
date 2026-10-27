# Portfolio project content and automatic language support

## Edit or add a project

Edit only `data/projectsData.ts`. Write all narrative fields in **Bahasa Indonesia**:
- `title`, `summaryQuote`, `descriptionParagraphs`, section titles/text, `outcomeText`
- `services.list` and `outcomeStats[].label`
- `tools` must name technologies actually present in the linked repository, not general domains (e.g. don't label an app React unless its package manifest shows React).
- Add `repoUrl` for verifiable code and `link` for a functioning demo or repository. Use valid URLs beginning with `https://`.
- Prefer demonstrable outputs over claimed revenue growth or traffic. Never invent metrics.
- Place gallery files in `public/img/` and use exact paths and filenames.

No English copy needs to be manually added for a new project. When a visitor chooses **EN**, the browser requests translation for that project's text fields through `/api/translate`, not the technology names. The selected language is saved locally and shared across pages.

## Translator setup

The server route `app/api/translate/route.ts` supports the official DeepL API if `DEEPL_API_KEY` is set on the deployment. Free subscriptions use `https://api-free.deepl.com/v2/translate`; for a Pro subscription set `DEEPL_API_URL=https://api.deepl.com/v2/translate`. Secrets stay on the server, never in `NEXT_PUBLIC_*` variables.

Without a DeepL key, the site tries a public Google Translate endpoint (unofficial, potentially rate-limited and not guaranteed). If both providers fail, the Indonesian source text is displayed instead of a fabricated translation. Translation is performed on demand and cached per server process; this does not require editing translations for each new case study. For production reliability, configure DeepL.

Short fixed UI labels live in the React components or `data/translations.ts` and are intentionally translated manually for quality.
