import { connection } from "next/server";
import { Suspense } from "react";

export const metadata = { title: "Streamed page" };

/** Static metadata, page content streamed behind Suspense. */
export default function StreamedPage() {
	return (
		<main>
			<h1>Streamed page heading</h1>
			<Suspense fallback={<p>Loading…</p>}>
				<Slow />
			</Suspense>
		</main>
	);
}

async function Slow() {
	await connection();
	await new Promise((resolve) => setTimeout(resolve, 500));
	return <p>Loaded.</p>;
}
