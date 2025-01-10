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
