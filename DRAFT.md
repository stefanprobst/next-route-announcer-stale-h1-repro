**Title:** Route announcer announces the previous page's `<h1>` with `cacheComponents`, because `document.title` is empty while dynamic metadata streams in

### Link to the code that reproduces this issue

<REPO_URL>

### To Reproduce

1. `pnpm install`
2. `CACHE_COMPONENTS=1 pnpm build` (the env var toggles `cacheComponents` in `next.config.mjs`)
3. `CACHE_COMPONENTS=1 node repro.mjs`

The script starts `next start`, soft-navigates from `/` to five routes, and records what the route announcer says
(from the `next-route-announcer` shadow root), along with every change of `document.title` and of the `<h1>`s. You can
also click the links yourself with a screen reader running; I first noticed it with Orca on Firefox.

### Current vs. Expected behavior

**Current:** With `cacheComponents: true`, navigating to a route whose `generateMetadata` needs the request (here, awaits
`connection()`) leaves `document.title` empty for a moment. The announcer reads the title in that moment and falls back
to `document.querySelector('h1')`:

| destination | announced |
| --- | --- |
| `/dynamic-metadata` (static `<h1>`) | "Dynamic metadata heading", not the title |
| `/dynamic-metadata-streamed-heading` (`<h1>` streams in after the metadata) | **"Home heading", the page you just left** |

In the second case the only `<h1>` in the document is the previous page's, kept in the DOM in a hidden `<Activity>`.
The correct title arrives a few milliseconds later but is never announced, since the announcer only re-checks on a
router tree change:

```
"Home"                                         h1: Home heading
""                                             h1: Home heading (hidden)   <- announced
"Dynamic metadata, streamed heading - Repro"   h1: Home heading (hidden)
```

Static metadata, streamed page content, and `generateMetadata` that only awaits `params` (prerendered via
`generateStaticParams`) are all announced correctly. Without `cacheComponents`, every route is announced correctly
and the title is never empty.

**Expected:** The new page's title is announced, as without `cacheComponents`.

### Provide environment information

```
Operating System:
  Platform: linux
  Arch: x64
  Version: #34~24.04.1-Ubuntu SMP PREEMPT_DYNAMIC Fri Sep  4 15:38:29 UTC 2
  Available memory (MB): 32035
  Available CPU cores: 4
Binaries:
  Node: 24.21.0
  npm: N/A
  Yarn: N/A
  pnpm: 12.8.1
Relevant Packages:
  next: 16.4.0-canary.57 // Latest available version is detected (16.4.0-canary.57).
  eslint-config-next: N/A
  react: 19.3.0
  react-dom: 19.3.0
  typescript: N/A
Next.js Config:
  output: N/A
```

### Which area(s) are affected?

Linking and Navigating, Metadata, cacheComponents

### Which stage(s) are affected?

`next start` (local)

### Additional context

Same results in Chromium 153, Firefox 155 and WebKit 26.6.

This was reported before as #96797, which the bot closed for lacking a reproduction repo.

In `app-router-announcer.tsx`, the fallback to `document.querySelector('h1')` also picks hidden headings, so with
`<Activity>` it can return the previous page. Possible fixes: read the title once the streamed metadata has been
applied, re-check when `<title>` changes, and/or skip hidden headings (`checkVisibility()`) in the fallback.
