// src/lib/db.ts
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { notes } from "./schema/notes";
import { users } from "./schema/user";

const schema = { notes, users };

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });
