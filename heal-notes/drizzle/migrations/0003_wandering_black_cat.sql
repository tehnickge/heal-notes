ALTER TABLE "User" RENAME TO "user";--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "User_username_unique";--> statement-breakpoint
ALTER TABLE "notes" DROP CONSTRAINT "notes_user_fk_User_id_fk";
--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_user_fk_user_id_fk" FOREIGN KEY ("user_fk") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_username_unique" UNIQUE("username");