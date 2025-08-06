import type { Config } from "drizzle-kit";

export default {
  dialect: "postgresql",
  schema: "./src/lib/drizzle/schema",
  out: "./drizzle/migrations",
  driver: "pglite",
  dbCredentials: {
    url: process.env.DATABASE_URL!, // URL для PostgreSQL
  },
} satisfies Config;
