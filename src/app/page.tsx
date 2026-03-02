import { HydrateClient, serverCaller } from "@/trpc/server";

export default async function Home() {
	const hello = await serverCaller.hello();
	return (
		<HydrateClient>
			<div>{hello}</div>
		</HydrateClient>
	);
}
