# M7 Design System v1.1

Self-contained, browsable design system spec for M7 Health. One HTML file, no build step.

**Live**: once GitHub Pages is enabled, the site will be at `https://<org-or-user>.github.io/<repo>/`.

## What's in this repo

- `index.html` — the entire design system (tokens, foundations, components, engineering handoff). Self-contained: React/ReactDOM/Babel/Inter fonts loaded from CDN, everything else inline.
- `project/` — un-bundled source for reference (tokens, theme builder, component specs). Engineers porting to the real codebase can read these directly.
- `.github/workflows/deploy.yml` — auto-deploys to GitHub Pages on push to `main`.
- `.nojekyll` — disables Jekyll so files/folders starting with `_` aren't stripped.

## Sharing / deploying

1. Push this repo to GitHub.
2. In repo **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Push to `main` — the workflow deploys the repo root as-is.
4. Share the Pages URL.

Because everything is inlined, you can also just open `index.html` directly (`file://`) or drop it behind any static host.

## Local preview

```
npx serve -p 3400 .
```

Then open http://localhost:3400/.

## For engineers implementing this

Jump to the **Engineering handoff** section in the running site. It shows:
- The generated `theme.ts` (MUI v5 `createTheme` input) reflecting the current Tweaks.
- Legacy → new token alias map for the migration.
- TypeScript module augmentation needed for the custom `lighter` + `tertiary` palette roles.

The **Tweaks** button (top-right) lets you switch neutral scale, shift palette, and light/dark mode — the handoff code regenerates live so you can copy the variant you want.

## For designers

The site is the spec. Anything outside it (Figma, old tokens) is superseded by what renders here.
