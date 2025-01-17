import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import * as schema from "./db-schema";
import * as orm from "drizzle-orm";

const pool = postgres(process.env.DATABASE_URL, { max: 1 });
export const db = drizzle(pool);

export async function getUserByEmail(email) {
	const iusers = await db
		.select()
		.from(schema.users)
		.where(orm.eq(schema.users.email, email));
	const [user] = iusers;
	return user;
}

export async function addUser(credentials) {
	await db.insert(schema.users).values(credentials);
}

export async function searchUser(query) {
	const iusers = await db
		.select({
			username: schema.users.username,
			email: schema.users.email,
		})
		.from(schema.users)
		.where(
			orm.or(
				orm.like(schema.users.username, `%${query}%`),
				orm.like(schema.users.email, `%${query}%`)
			)
		);

	return iusers;
}

export async function addMessageToGlobal(payload) {
	await db
		.insert(schema.globalMessages)
		.values(payload)
		.onConflictDoUpdate({
			target: schema.globalMessages.ringId,
			set: { ...payload, createdAt: orm.sql`NOW()` },
		});
}

export async function getGlobalMessages() {
	const initialGlobalMessages = await db
		.select({
			username: schema.users.username,
			message: schema.globalMessages.message,
			messageId: schema.globalMessages.messageId,
			createdAt: schema.globalMessages.createdAt,
		})
		.from(schema.globalMessages)
		.innerJoin(
			schema.users,
			orm.eq(schema.globalMessages.userId, schema.users.id)
		)
		.orderBy(orm.asc(schema.globalMessages.createdAt));

	return initialGlobalMessages;
}

export async function getUserByUsername(username) {
	const iusers = await db
		.select()
		.from(schema.users)
		.where(orm.eq(schema.users.username, username));
	const [user] = iusers;
	return user;
}

export async function deleteGlobalMessage(messageId) {
	await db
		.delete(schema.globalMessages)
		.where(orm.eq(schema.globalMessages.messageId, messageId));
}
