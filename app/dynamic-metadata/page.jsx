import { connection } from "next/server";
import { Suspense } from "react";

/** Metadata which needs the request, so it is resolved at request time. */
export async function generateMetadata() {
	await connection();
	await new Promise((resolve) => setTimeout(resolve, 300));
	return { title: "Dynamic metadata" };
}

export default function DynamicMetadata() {
	return (
		<main>
			<h1>Dynamic metadata heading</h1>
			<Suspense fallback={<p>Loading…</p>}>
				<Slow />
			</Suspense>
		</main>
	);
}

async function Slow() {
	await connection();
	return <p>Loaded.</p>;
}
