ALTER TABLE "recipes" DROP CONSTRAINT "recipes_created_by_users_id_fk";
--> statement-breakpoint
ALTER TABLE "recipes" DROP COLUMN "created_by";