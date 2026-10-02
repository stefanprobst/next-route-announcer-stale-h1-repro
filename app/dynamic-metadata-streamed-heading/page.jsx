import { connection } from "next/server";
import { Suspense } from "react";

/** Metadata which needs the request, and a heading which streams in after it, as on a CMS-backed detail page. */
export async function generateMetadata() {
	await connection();
	await new Promise((resolve) => setTimeout(resolve, 300));
	return { title: "Dynamic metadata, streamed heading" };
}

export default function DynamicMetadataStreamedHeading() {
	return (
		<main>
			<Suspense fallback={<p>Loading…</p>}>
				<Heading />
			</Suspense>
		</main>
	);
}

async function Heading() {
	await connection();
	await new Promise((resolve) => setTimeout(resolve, 600));
	return <h1>Dynamic metadata, streamed heading heading</h1>;
}
