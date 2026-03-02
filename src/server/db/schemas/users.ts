import { sql } from "drizzle-orm";
import { pgPolicy, uuid, varchar } from "drizzle-orm/pg-core";
import { baseTimestamps, createTable } from "../lib/utils";

export const users = createTable(
	"user",
	{
		id: uuid("id").primaryKey().notNull(),
		name: varchar("name", { length: 255 }),
		email: varchar("email", { length: 255 }).notNull(),
		image: varchar("image", { length: 255 }),
		...baseTimestamps,
	},
	(t) => [
		pgPolicy("users_read_own_policy", {
			as: "permissive",
			for: "select",
			to: ["authenticated"],
			using: sql`auth.uid() = id`,
		}),
		pgPolicy("users_update_own_policy", {
			as: "permissive",
			for: "update",
			to: ["authenticated"],
			using: sql`auth.uid() = id`,
		}),
	],
);
