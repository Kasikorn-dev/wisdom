import Link from "next/link";

import { cn } from "@/lib/utils";

const footerLinks = {
	product: [
		{ href: "/courses", label: "Courses" },
		{ href: "/pricing", label: "Pricing" },
		{ href: "/features", label: "Features" },
	],
	company: [
		{ href: "/about", label: "About" },
		{ href: "/contact", label: "Contact" },
		{ href: "/blog", label: "Blog" },
	],
	legal: [
		{ href: "/privacy", label: "Privacy Policy" },
		{ href: "/terms", label: "Terms of Service" },
	],
};

export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="border-t bg-background">
			<div className="container py-12 md:py-16">
				<div className="grid gap-8 md:grid-cols-4">
					<div className="md:col-span-2">
						<Link className="font-semibold text-xl" href="/">
							Wisdom
						</Link>
						<p className="mt-2 max-w-md text-muted-foreground text-sm">
							Education platform for learning and growth. Discover courses,
							track progress, and achieve your goals.
						</p>
					</div>

					<div>
						<h4 className="mb-4 font-semibold text-sm">Product</h4>
						<ul className="space-y-3">
							{footerLinks.product.map((link) => (
								<li key={link.href}>
									<Link
										className={cn(
											"text-muted-foreground text-sm transition-colors hover:text-foreground",
										)}
										href={link.href}
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h4 className="mb-4 font-semibold text-sm">Company</h4>
						<ul className="space-y-3">
							{footerLinks.company.map((link) => (
								<li key={link.href}>
									<Link
										className={cn(
											"text-muted-foreground text-sm transition-colors hover:text-foreground",
										)}
										href={link.href}
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
					<p className="text-muted-foreground text-sm">
						© {currentYear} Wisdom. All rights reserved.
					</p>
					<div className="flex gap-6">
						{footerLinks.legal.map((link) => (
							<Link
								className={cn(
									"text-muted-foreground text-sm transition-colors hover:text-foreground",
								)}
								href={link.href}
								key={link.href}
							>
								{link.label}
							</Link>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
}
