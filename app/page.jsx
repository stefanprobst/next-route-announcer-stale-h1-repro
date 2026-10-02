import Link from "next/link";

export const metadata = { title: "Home" };

export default function Home() {
	return (
		<main>
			<h1>Home heading</h1>
			<ul>
				<li><Link href="/static">Static</Link></li>
				<li><Link href="/streamed-page">Streamed page</Link></li>
				<li><Link href="/dynamic-metadata">Dynamic metadata</Link></li>
				<li><Link href="/dynamic-metadata-streamed-heading">Dynamic metadata, streamed heading</Link></li>
				<li><Link href="/items/one">Item one</Link></li>
			</ul>
		</main>
	);
}
