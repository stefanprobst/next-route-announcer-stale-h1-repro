# With `cacheComponents`, the route announcer announces an `<h1>` instead of the new title, often the previous page's

With `cacheComponents: true`, a soft navigation to a route whose metadata needs the request leaves `document.title`
empty for a moment: the previous `<title>` is removed before the new one has streamed in. Next.js's route announcer
reads the title in that moment, finds it empty, and falls back to `document.querySelector('h1')`:

- if the new page's `<h1>` is already there, it announces the heading instead of the title;
- if the heading is still streaming, the first `<h1>` in the document is the **previous page's**, which `cacheComponents`
  keeps in the DOM, hidden in an `<Activity>`, so screen readers announce the page you just left.

The announcer only re-checks when the router tree changes, so the correct title, which arrives a few milliseconds
later, is never announced.

Without `cacheComponents`, the same routes are announced correctly.

Previously reported as [#96797](https://github.com/vercel/next.js/issues/96797), closed by the bot for lacking a
reproduction repo.

## Versions

- `next` 16.4.0-canary.57, `react` 19.3.0
- Node 24.21.0, pnpm 12.8.1, Linux
- Chromium 153, Firefox 155, WebKit 26.6 (Playwright 1.63.0); same results in all three

## Reproduce

```sh
pnpm install
CACHE_COMPONENTS=1 pnpm build
CACHE_COMPONENTS=1 node repro.mjs   # 2 of 5 routes announced wrongly, in each browser

pnpm build
node repro.mjs                      # all announced correctly
```

`CACHE_COMPONENTS` toggles `cacheComponents` in `next.config.mjs`; it has to be set for the script too, since
`next start` re-reads the config.

`repro.mjs` starts `next start`, clicks each link on `/`, and records the announcer's text (from the
`next-route-announcer` shadow root) and every change of `document.title` and of the `<h1>`s. The routes:

| route | metadata | `<h1>` |
| --- | --- | --- |
| `/static` | static | static |
| `/streamed-page` | static | static, rest of the page streams |
| `/dynamic-metadata` | `generateMetadata` awaits `connection()` | static |
| `/dynamic-metadata-streamed-heading` | `generateMetadata` awaits `connection()` | streams, after the metadata |
| `/items/one` | `generateMetadata` awaits `params` (prerendered via `generateStaticParams`) | streams |

## Results (Firefox; Chromium and WebKit are the same)

With `cacheComponents: true` ([out-cache-components.md](./out-cache-components.md)):

| link | announced | expected |
| --- | --- | --- |
| Static | "Static - Repro" | "Static - Repro" |
| Streamed page | "Streamed page - Repro" | "Streamed page - Repro" |
| Dynamic metadata | "Dynamic metadata heading" ❌ | "Dynamic metadata - Repro" |
| Dynamic metadata, streamed heading | "Home heading" ❌ (the previous page) | "Dynamic metadata, streamed heading - Repro" |
| Item one | "Item one - Repro" | "Item one - Repro" |

`document.title` and the `<h1>`s during the navigation to `/dynamic-metadata-streamed-heading`:

```
"Home"                                         h1: Home heading
""                                             h1: Home heading (hidden)   <- the announcer reads this
"Dynamic metadata, streamed heading - Repro"   h1: Home heading (hidden)
"Dynamic metadata, streamed heading - Repro"   h1: Dynamic metadata, streamed heading heading, Home heading (hidden)
```

Without `cacheComponents` ([out-default.md](./out-default.md)), every route is announced with its title, and the title
is never empty.

## Cause

`AppRouterAnnouncer` (`packages/next/src/client/components/app-router-announcer.tsx`) runs on every `tree` change:

```js
if (document.title) {
	currentTitle = document.title;
} else {
	const pageHeader = document.querySelector("h1");
	...
}
```

With `cacheComponents`, the commit that swaps the router tree removes the old `<title>`, while the new one only comes
with the streamed metadata. The fallback then picks the first `<h1>` in document order, including hidden ones.

Possible fixes: wait for the streamed metadata before reading the title, re-check when `<title>` changes, or at least
skip hidden headings (`checkVisibility()`) in the fallback.
