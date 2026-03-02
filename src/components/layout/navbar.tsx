import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { cn } from "@/lib/utils";

const navLinks = [
	{ href: "/", label: "Home" },
	{ href: "/courses", label: "Courses" },
	{ href: "/about", label: "About" },
];

export function Navbar() {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-14 items-center justify-between">
				<Link className="flex items-center gap-2 font-semibold" href="/">
					<span className="text-xl">Wisdom</span>
				</Link>

				<nav className="flex items-center gap-6">
					{navLinks.map((link) => (
						<Link
							className={cn(
								"font-medium text-muted-foreground text-sm transition-colors hover:text-foreground",
							)}
							href={link.href}
							key={link.href}
						>
							{link.label}
						</Link>
					))}
					<Button asChild size="sm">
						<Link href="/login">Login</Link>
					</Button>
					<ModeToggle />
				</nav>
			</div>
		</header>
	);
}
