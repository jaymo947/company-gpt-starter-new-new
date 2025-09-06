# Company-GPT Starter (JS-only, Very Stable)

This version removes TypeScript and relaxes linting to avoid common Vercel build failures.

## Deploy
1) Create a GitHub repo and upload these files.
2) On Vercel → New Project → import repo → Framework: Next.js.
3) Add env var: `OPENAI_API_KEY`.
4) Deploy.

## Use
- Full page: `/`  → `/?companyId=NAYA&companyName=NAYA%20Therapeutics`
- Embed: `/embed` → `/embed?companyId=NAYA&companyName=NAYA%20Therapeutics`

## Embed in Elementor
```html
<iframe
  src="https://YOUR-APP.vercel.app/embed?companyId=NAYA&companyName=NAYA%20Therapeutics"
  style="width:100%;height:700px;border:0;border-radius:12px;overflow:hidden"
  allow="clipboard-write; microphone *;">
</iframe>
```

## Context
Put your company text in `data/context/NAYA.txt`. Duplicate for other companies.
