import { sql } from "drizzle-orm";
import { pgTableCreator, timestamp, uuid } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name: string) => `${name}`);

export const baseTimestamps = {
	createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at")
		.default(sql`CURRENT_TIMESTAMP`)
		.$onUpdate(() => new Date()),
};

export const baseSchema = {
	...baseTimestamps,
	createdBy: uuid("created_by"),
	updatedBy: uuid("updated_by"),
};
