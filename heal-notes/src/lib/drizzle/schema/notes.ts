// src/lib/schema/notes.ts
import {
  pgTable,
  uuid,
  text,
  real,
  timestamp,
  date,
} from "drizzle-orm/pg-core";
import { users } from "./user";

export const notes = pgTable("notes", {
  id: uuid("id").primaryKey().defaultRandom(),
  emotionRating: real("emotion_rating").notNull(),
  date: date("date").notNull(),
  note: text("note"),
  color: text("color"),
  userFk: uuid("user_fk")
    .notNull()
    .references(() => users.id),
});
