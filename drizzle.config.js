import { configDotenv } from "dotenv";
import { defineConfig } from "drizzle-kit";

configDotenv({ path: "./.env.local" });

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/lib/schema.js",
  out: "./src/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});