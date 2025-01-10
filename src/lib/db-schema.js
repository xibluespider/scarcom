import {
	integer,
	pgSequence,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const users = pgTable("users", {
	id: uuid("id").defaultRandom().primaryKey(),
	username: text("username").notNull().unique(),
	email: text("email").notNull().unique(),
	password: text("password").notNull(),
});

export const globalMsgIdSeq = pgSequence("global_msg_id_seq", {
	startWith: 1,
	increment: 1,
	maxValue: 5,
	cycle: true,
});

export const globalMessages = pgTable("global_messages", {
	id: integer("id")
		.primaryKey()
		.default(sql`nextval('global_msg_id_seq')`),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	userId: uuid("user_id").references(() => users.id),
	message: text("message").notNull(),
});
