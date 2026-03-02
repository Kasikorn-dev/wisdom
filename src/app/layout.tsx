import "@/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Footer, Navbar } from "@/components/layout";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
	title: "Wisdom Education Platform",
	description: "Wisdom Education Platform",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html className={`${geist.variable}`} lang="en" suppressHydrationWarning>
			<body className="flex min-h-screen flex-col">
				<TRPCReactProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						disableTransitionOnChange
						enableSystem
					>
						<TooltipProvider>
							<Navbar />
							<main className="flex-1">{children}</main>
							<Footer />
							<Toaster />
						</TooltipProvider>
					</ThemeProvider>
				</TRPCReactProvider>
			</body>
		</html>
	);
}
