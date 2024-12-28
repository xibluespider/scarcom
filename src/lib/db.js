import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import { users } from "./db-schema";
import { eq, or, like } from "drizzle-orm";

const pool = postgres(process.env.DATABASE_URL, { max: 1 });
export const db = drizzle(pool);

export async function getUserByEmail(email) {
	const iusers = await db.select().from(users).where(eq(users.email, email));
	const [user] = iusers;
	return user;
}

export async function addUser(credentials) {
	await db.insert(users).values(credentials);
}

export async function searchUser(query) {
	const iusers = await db
		.select({
			name: users.name,
			email: users.email,
		})
		.from(users)
		.where(or(like(users.name, `%${query}%`), like(users.email, `%${query}%`)));

	return iusers;
}
