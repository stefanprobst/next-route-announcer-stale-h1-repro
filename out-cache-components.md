
## chromium 153.0.8010.12

| link | announced | final `document.title` | `document.title` during the navigation |
| --- | --- | --- | --- |
| Static | "Static - Repro" | "Static - Repro" | "Home" (h1: Home heading) → "Static - Repro" (h1: Static heading, Home heading (hidden)) |
| Streamed page | "Streamed page - Repro" | "Streamed page - Repro" | "Home" (h1: Home heading) → "Streamed page - Repro" (h1: Streamed page heading, Home heading (hidden)) |
| Dynamic metadata | "Dynamic metadata heading" ❌ | "Dynamic metadata - Repro" | "Home" (h1: Home heading) → "" (h1: Dynamic metadata heading, Home heading (hidden)) → "Dynamic metadata - Repro" (h1: Dynamic metadata heading, Home heading (hidden)) |
| Dynamic metadata, streamed heading | "Home heading" ❌ | "Dynamic metadata, streamed heading - Repro" | "Home" (h1: Home heading) → "" (h1: Home heading (hidden)) → "Dynamic metadata, streamed heading - Repro" (h1: Home heading (hidden)) → "Dynamic metadata, streamed heading - Repro" (h1: Dynamic metadata, streamed heading heading, Home heading (hidden)) |
| Item one | "Item one - Repro" | "Item one - Repro" | "Home" (h1: Home heading) → "Item one - Repro" (h1: Item one heading, Home heading (hidden)) |

## firefox 155.0

| link | announced | final `document.title` | `document.title` during the navigation |
| --- | --- | --- | --- |
| Static | "Static - Repro" | "Static - Repro" | "Home" (h1: Home heading) → "Static - Repro" (h1: Static heading, Home heading (hidden)) |
| Streamed page | "Streamed page - Repro" | "Streamed page - Repro" | "Home" (h1: Home heading) → "Streamed page - Repro" (h1: Streamed page heading, Home heading (hidden)) |
| Dynamic metadata | "Dynamic metadata heading" ❌ | "Dynamic metadata - Repro" | "Home" (h1: Home heading) → "" (h1: Dynamic metadata heading, Home heading (hidden)) → "Dynamic metadata - Repro" (h1: Dynamic metadata heading, Home heading (hidden)) |
| Dynamic metadata, streamed heading | "Home heading" ❌ | "Dynamic metadata, streamed heading - Repro" | "Home" (h1: Home heading) → "" (h1: Home heading (hidden)) → "Dynamic metadata, streamed heading - Repro" (h1: Home heading (hidden)) → "Dynamic metadata, streamed heading - Repro" (h1: Dynamic metadata, streamed heading heading, Home heading (hidden)) |
| Item one | "Item one - Repro" | "Item one - Repro" | "Home" (h1: Home heading) → "Item one - Repro" (h1: Item one heading, Home heading (hidden)) |

## webkit 26.6

| link | announced | final `document.title` | `document.title` during the navigation |
| --- | --- | --- | --- |
| Static | "Static - Repro" | "Static - Repro" | "Home" (h1: Home heading) → "Static - Repro" (h1: Static heading, Home heading (hidden)) |
| Streamed page | "Streamed page - Repro" | "Streamed page - Repro" | "Home" (h1: Home heading) → "Streamed page - Repro" (h1: Streamed page heading, Home heading (hidden)) |
| Dynamic metadata | "Dynamic metadata heading" ❌ | "Dynamic metadata - Repro" | "Home" (h1: Home heading) → "" (h1: Dynamic metadata heading, Home heading (hidden)) → "Dynamic metadata - Repro" (h1: Dynamic metadata heading, Home heading (hidden)) |
| Dynamic metadata, streamed heading | "Home heading" ❌ | "Dynamic metadata, streamed heading - Repro" | "Home" (h1: Home heading) → "" (h1: Home heading (hidden)) → "Dynamic metadata, streamed heading - Repro" (h1: Home heading (hidden)) → "Dynamic metadata, streamed heading - Repro" (h1: Dynamic metadata, streamed heading heading, Home heading (hidden)) |
| Item one | "Item one - Repro" | "Item one - Repro" | "Home" (h1: Home heading) → "Item one - Repro" (h1: Item one heading, Home heading (hidden)) |
