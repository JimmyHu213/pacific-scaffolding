import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Pacific Scaffolding Pty Ltd | Kwikstage Scaffolding Sales",
	description:
		"Australian Kwikstage scaffolding sales by Pacific Scaffolding Pty Ltd. Standards, ledgers, transoms, braces, base plates and complete scaffold packages.",
	openGraph: {
		title: "Pacific Scaffolding Pty Ltd | Kwikstage Scaffolding Sales",
		description:
			"Buy quality Kwikstage scaffolding components and complete scaffold packages from Pacific Scaffolding Pty Ltd.",
		type: "website",
		locale: "en_AU",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en-AU">
			<head>
				<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
			</head>
			<body>{children}</body>
		</html>
	);
}
