CREATE TABLE "rates" (
	"user_id" uuid NOT NULL,
	"recipe_id" uuid NOT NULL,
	"rate" integer,
	"liked_at" timestamp DEFAULT now(),
	CONSTRAINT "rates_user_id_recipe_id_pk" PRIMARY KEY("user_id","recipe_id")
);
--> statement-breakpoint
ALTER TABLE "rates" ADD CONSTRAINT "rates_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rates" ADD CONSTRAINT "rates_recipe_id_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;