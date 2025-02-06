import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import * as orm from "drizzle-orm";

import * as schema from "./db-schema";

const pool = postgres(process.env.DATABASE_URL, { max: 1 });
const db = drizzle(pool);

export { db, schema, orm };
