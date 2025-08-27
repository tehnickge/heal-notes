// src/lib/schema/user.ts
import { pgTable, text, uuid } from "drizzle-orm/pg-core";


export const users = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: text("username").notNull().unique(),
  name: text("name").notNull(),
  secondname: text("secondname"),
  password: text("password").notNull(),
});
