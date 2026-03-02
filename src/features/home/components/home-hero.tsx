import Link from "next/link";

import { Button } from "@/components/ui/button";

export function HomeHero() {
	return (
		<section className="flex flex-col items-center justify-center gap-8 px-4 py-24 text-center md:py-32">
			<div className="space-y-4">
				<h1 className="font-bold text-4xl tracking-tight sm:text-5xl md:text-6xl">
					Learn. Grow. <span className="text-primary">Succeed.</span>
				</h1>
				<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
					Wisdom is your education platform for discovering courses, tracking
					progress, and achieving your learning goals.
				</p>
			</div>
			<div className="flex flex-wrap items-center justify-center gap-4">
				<Button asChild size="lg">
					<Link href="/courses">Explore Courses</Link>
				</Button>
				<Button asChild size="lg" variant="outline">
					<Link href="/about">Learn More</Link>
				</Button>
			</div>
		</section>
	);
}
