ALTER TABLE "user" ADD COLUMN "createdAt" date DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "lastUpdate" date DEFAULT now() NOT NULL;