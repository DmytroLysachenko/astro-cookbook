CREATE TABLE "ingredients" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"calories" numeric(6, 2) NOT NULL,
	"total_fat" numeric(6, 2) NOT NULL,
	"saturated_fat" numeric(6, 2) NOT NULL,
	"trans_fat" numeric(6, 2) NOT NULL,
	"polyunsaturated_fat" numeric(6, 2) NOT NULL,
	"monounsaturated_fat" numeric(6, 2) NOT NULL,
	"cholesterol" numeric(6, 2) NOT NULL,
	"sodium" numeric(6, 2) NOT NULL,
	"total_carbs" numeric(6, 2) NOT NULL,
	"dietary_fiber" numeric(6, 2) NOT NULL,
	"sugars" numeric(6, 2) NOT NULL,
	"protein" numeric(6, 2) NOT NULL,
	CONSTRAINT "ingredients_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "recipes" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"image_url" text,
	"created_by" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "recipes_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" varchar NOT NULL,
	"bio" text,
	"last_active" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;