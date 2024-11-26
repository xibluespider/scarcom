import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { users } from "./schema";

import { eq } from "drizzle-orm";

const pool = postgres(process.env.DATABASE_URL, { max: 1 });
export const db = drizzle(pool);

export async function getUserByEmail(email) {
  try {
    const iusers = await db.select().from(users).where(eq(users.email, email));
    const [user] = iusers;
    return user;
  } catch (error) {
    throw new Error("DatabaseError");
  }
}
