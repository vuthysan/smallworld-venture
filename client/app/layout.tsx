import "@/styles/globals.css";

import { AppNavbar } from "@/components/navbar";
import { Link } from "@nextui-org/link";
import { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Providers } from "./providers";
import clsx from "clsx";
import { siteConfig } from "@/config/site";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={
					"min-h-screen font-sans antialiased light text-foreground bg-[#f5f5f5]"
				}
			>
				<Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
					<div className="relative flex flex-col h-screen">
						<AppNavbar />
						<main className={`${nunito.className} bg-[#f5f5f5f5]`}>
							{children}
						</main>
						{/* <footer className="w-full flex items-center justify-center py-3">
							<Link
								isExternal
								className="flex items-center gap-1 text-current"
								href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
								title="nextui.org homepage"
							>
								<span className="text-default-600">Powered by</span>
								<p className="text-primary">NextUI</p>
							</Link>
						</footer> */}
					</div>
				</Providers>
			</body>
		</html>
	);
}
