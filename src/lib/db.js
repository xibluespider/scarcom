import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import { users } from "./db-schema";
import { eq } from "drizzle-orm";

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
