
## chromium 153.0.8010.12

| link | announced | final `document.title` | `document.title` during the navigation |
| --- | --- | --- | --- |
| Static | "Static - Repro" | "Static - Repro" | "Home" (h1: Home heading) → "Static - Repro" (h1: Static heading) |
| Streamed page | "Streamed page - Repro" | "Streamed page - Repro" | "Home" (h1: Home heading) → "Streamed page - Repro" (h1: Streamed page heading) |
| Dynamic metadata | "Dynamic metadata - Repro" | "Dynamic metadata - Repro" | "Home" (h1: Home heading) → "Dynamic metadata - Repro" (h1: Dynamic metadata heading) |
| Dynamic metadata, streamed heading | "Dynamic metadata, streamed heading - Repro" | "Dynamic metadata, streamed heading - Repro" | "Home" (h1: Home heading) → "Dynamic metadata, streamed heading - Repro" (h1: none) → "Dynamic metadata, streamed heading - Repro" (h1: Dynamic metadata, streamed heading heading) |
| Item one | "Item one - Repro" | "Item one - Repro" | "Home" (h1: Home heading) → "Item one - Repro" (h1: Item one heading) |

## firefox 155.0

| link | announced | final `document.title` | `document.title` during the navigation |
| --- | --- | --- | --- |
| Static | "Static - Repro" | "Static - Repro" | "Home" (h1: Home heading) → "Static - Repro" (h1: Static heading) |
| Streamed page | "Streamed page - Repro" | "Streamed page - Repro" | "Home" (h1: Home heading) → "Streamed page - Repro" (h1: Streamed page heading) |
| Dynamic metadata | "Dynamic metadata - Repro" | "Dynamic metadata - Repro" | "Home" (h1: Home heading) → "Dynamic metadata - Repro" (h1: Dynamic metadata heading) |
| Dynamic metadata, streamed heading | "Dynamic metadata, streamed heading - Repro" | "Dynamic metadata, streamed heading - Repro" | "Home" (h1: Home heading) → "Dynamic metadata, streamed heading - Repro" (h1: none) → "Dynamic metadata, streamed heading - Repro" (h1: Dynamic metadata, streamed heading heading) |
| Item one | "Item one - Repro" | "Item one - Repro" | "Home" (h1: Home heading) → "Item one - Repro" (h1: Item one heading) |

## webkit 26.6

| link | announced | final `document.title` | `document.title` during the navigation |
| --- | --- | --- | --- |
| Static | "Static - Repro" | "Static - Repro" | "Home" (h1: Home heading) → "Static - Repro" (h1: Static heading) |
| Streamed page | "Streamed page - Repro" | "Streamed page - Repro" | "Home" (h1: Home heading) → "Streamed page - Repro" (h1: Streamed page heading) |
| Dynamic metadata | "Dynamic metadata - Repro" | "Dynamic metadata - Repro" | "Home" (h1: Home heading) → "Dynamic metadata - Repro" (h1: Dynamic metadata heading) |
| Dynamic metadata, streamed heading | "Dynamic metadata, streamed heading - Repro" | "Dynamic metadata, streamed heading - Repro" | "Home" (h1: Home heading) → "Dynamic metadata, streamed heading - Repro" (h1: none) → "Dynamic metadata, streamed heading - Repro" (h1: Dynamic metadata, streamed heading heading) |
| Item one | "Item one - Repro" | "Item one - Repro" | "Home" (h1: Home heading) → "Item one - Repro" (h1: Item one heading) |
