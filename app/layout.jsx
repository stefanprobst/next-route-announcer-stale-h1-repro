export const metadata = { title: { template: "%s - Repro", default: "Repro" } };

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body style={{ fontFamily: "sans-serif" }}>{children}</body>
		</html>
	);
}
