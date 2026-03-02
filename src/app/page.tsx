import { serverCaller } from "@/trpc/server";

export default async function Home() {
	const hello = await serverCaller.hello();
	return <div>{hello}</div>;
}
