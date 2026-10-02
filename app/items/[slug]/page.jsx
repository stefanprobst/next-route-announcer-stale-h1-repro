import { Suspense } from "react";

export function generateStaticParams() {
	return [{ slug: "one" }];
}

/** Metadata from the params, as a CMS-backed detail page would. */
export async function generateMetadata({ params }) {
	const { slug } = await params;
	return { title: `Item ${slug}` };
}

export default function Item({ params }) {
	return (
		<main>
			<Suspense fallback={<p>Loading…</p>}>
				<Heading params={params} />
			</Suspense>
		</main>
	);
}

async function Heading({ params }) {
	const { slug } = await params;
	return <h1>Item {slug} heading</h1>;
}
