import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: uuid("id").defaultRandom().primaryKey(),
	email: text("email").notNull().unique(),
	name: text("name").notNull(),
	password: text("password").notNull(),
});
