CREATE TABLE "notes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"emotion_rating" real,
	"date" date NOT NULL,
	"note" text,
	"color" text,
	"user_fk" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"name" text NOT NULL,
	"secondname" text,
	"password" text NOT NULL,
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_user_fk_user_id_fk" FOREIGN KEY ("user_fk") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;