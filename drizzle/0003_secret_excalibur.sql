ALTER TABLE "recipes" ADD COLUMN "rating" numeric(3, 2);--> statement-breakpoint
ALTER TABLE "recipes" ADD COLUMN "views" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "recipes" DROP COLUMN "title";--> statement-breakpoint
ALTER TABLE "recipes" DROP COLUMN "description";