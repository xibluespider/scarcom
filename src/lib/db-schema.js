import {
	integer,
	pgSequence,
	pgTable,
	text,
	timestamp,
	uuid,
	primaryKey,
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
	ringId: integer("ring_id")
		.primaryKey()
		.default(sql`nextval('global_msg_id_seq')`),

	messageId: uuid("message_id").notNull(),

	userId: uuid("user_id").references(() => users.id),
	message: text("message").notNull(),

	createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const channels = pgTable("channels", {
	id: uuid("id").primaryKey().defaultRandom(),
	createdAt: timestamp("created_at").defaultNow(),
});

export const channelParticipants = pgTable(
	"channel_participants",
	{
		channelId: uuid("channel_id")
			.notNull()
			.references(() => channels.id),
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id),
	},
	(table) => {
		return [
			{
				pk: primaryKey({
					columns: [table.channelId, table.userId],
				}),
			},
		];
	}
);

export const messages = pgTable("messages", {
	id: uuid("id").primaryKey().defaultRandom(),

	channelId: uuid("channel_id")
		.notNull()
		.references(() => channels.id),

	userId: uuid("user_id")
		.notNull()
		.references(() => users.id),

	message: text("message").notNull(),
	createdAt: timestamp("created_at").defaultNow(),
});
