// Starts `next start`, soft-navigates from `/` to each link, and records what Next.js's route announcer says, along with
// every change of `document.title` and of the `<h1>`s during the navigation.
// Set `CACHE_COMPONENTS=1` for both `pnpm build` and this script to compare with `cacheComponents: true`: `next start`
// re-reads `next.config.mjs`.

import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
import { chromium, firefox, webkit } from "playwright";

const port = 3201;
const base = `http://localhost:${port}`;

const links = [
	{ name: "Static", title: "Static - Repro" },
	{ name: "Streamed page", title: "Streamed page - Repro" },
	{ name: "Dynamic metadata", title: "Dynamic metadata - Repro" },
	{ name: "Dynamic metadata, streamed heading", title: "Dynamic metadata, streamed heading - Repro" },
	{ name: "Item one", title: "Item one - Repro" },
];

const server = spawn("node_modules/.bin/next", ["start", "-p", String(port)], { stdio: "ignore" });

try {
	await waitForServer();

	for (const browserType of [chromium, firefox, webkit]) {
		const browser = await browserType.launch();
		console.log(`\n## ${browserType.name()} ${browser.version()}\n`);
		console.log("| link | announced | final `document.title` | `document.title` during the navigation |");
		console.log("| --- | --- | --- | --- |");

		for (const link of links) {
			const page = await browser.newPage();
			await page.goto(base);
			// Let prefetches finish, so the navigation is not slowed down by them.
			await sleep(1000);
			await page.evaluate(record);
			await page.getByRole("link", { name: link.name, exact: true }).click();
			await page.getByRole("heading", { level: 1, name: `${link.name} heading` }).waitFor();
			await sleep(1500);
			const { announcements, titles } = await page.evaluate(() => window.__repro);
			const announced = announcements.map((text) => JSON.stringify(text)).join(", ") || "(nothing)";
			const finalTitle = await page.title();
			const verdict = announcements.at(-1) === link.title ? "" : " ❌";
			const titleVerdict = finalTitle === link.title ? "" : ` ❌ (expected ${JSON.stringify(link.title)})`;
			console.log(
				`| ${link.name} | ${announced}${verdict} | ${JSON.stringify(finalTitle)}${titleVerdict} | ${titles.join(" → ")} |`,
			);
			await page.close();
		}

		await browser.close();
	}
} finally {
	server.kill();
}

/** Runs in the page: records the announcer's text, and `document.title` with the `<h1>`s each time either changes. */
function record() {
	const state = { announcements: [], titles: [] };
	window.__repro = state;

	const announcer = document.querySelector("next-route-announcer").shadowRoot.firstElementChild;
	new MutationObserver(() => {
		if (announcer.textContent !== "") state.announcements.push(announcer.textContent);
	}).observe(announcer, { childList: true, subtree: true, characterData: true });

	let previous = "";
	const snapshot = () => {
		const headings = [...document.querySelectorAll("h1")]
			.map((heading) => (heading.checkVisibility() ? heading.textContent : `${heading.textContent} (hidden)`))
			.join(", ");
		const current = `${JSON.stringify(document.title)} (h1: ${headings || "none"})`;
		if (current !== previous) state.titles.push(current);
		previous = current;
	};
	snapshot();
	new MutationObserver(snapshot).observe(document.documentElement, {
		childList: true,
		subtree: true,
		characterData: true,
	});
}

async function waitForServer() {
	for (let attempt = 0; attempt < 60; attempt++) {
		try {
			await fetch(base);
			return;
		} catch {
			await sleep(500);
		}
	}
	throw new Error("next start did not come up");
}
