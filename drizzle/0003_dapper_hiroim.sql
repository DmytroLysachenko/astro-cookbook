ALTER TABLE "comments" ADD CONSTRAINT "comments_recipe_slug_unique" UNIQUE("recipe_slug");--> statement-breakpoint
ALTER TABLE "likes" ADD CONSTRAINT "likes_recipe_slug_unique" UNIQUE("recipe_slug");--> statement-breakpoint
ALTER TABLE "rates" ADD CONSTRAINT "rates_recipe_slug_unique" UNIQUE("recipe_slug");--> statement-breakpoint
ALTER TABLE "views" ADD CONSTRAINT "views_recipe_slug_unique" UNIQUE("recipe_slug");