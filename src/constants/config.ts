export const SITE_TITLE = "Cooking Spot";
export const SITE_DESCRIPTION = "Welcome to the Cooking Spot cookbook website!";

export const COMMENTS_PER_PAGE = 10;

export const INGREDIENTS_PER_PAGE = 20;

export const INGREDIENTS_TABLE_COLUMNS = [
  { title: "Name", data: "name" },
  { title: "Category", data: "category" },
  { title: "Calories", data: "calories" },
  { title: "Protein (g)", data: "protein" },
  { title: "Total Fat (g)", data: "totalFat" },
  { title: "Sat. Fat (g)", data: "saturatedFat" },
  { title: "Trans Fat (g)", data: "transFat" },
  { title: "Poly. Fat (g)", data: "polyunsaturatedFat" },
  { title: "Mono. Fat (g)", data: "monounsaturatedFat" },
  { title: "Cholesterol (mg)", data: "cholesterol" },
  { title: "Sodium (mg)", data: "sodium" },
  { title: "Total Carbs (g)", data: "totalCarbs" },
  { title: "Dietary Fiber (g)", data: "dietaryFiber" },
  { title: "Sugars (g)", data: "sugars" },
];

export const HEADER_LINKS = [
  { href: "/recipes", text: "Recipes" },
  { href: "/about", text: "About" },
  { href: "/ingredients", text: "Ingredients" },
  { href: "/contact-us", text: "Contact" },
];

export const OAUTH_PROVIDERS = [
  { provider: "google", iconPath: "/assets/icons/google.svg" },
  { provider: "facebook", iconPath: "/assets/icons/facebook.svg" },
  { provider: "github", iconPath: "/assets/icons/github.svg" },
];

// FOOTER

export const QUICK_LINKS = [
  { href: "/", text: "Home", emoji: "🏠" },
  { href: "/recipes", text: "Recipes", emoji: "📓" },
  { href: "/ingredients", text: "Ingredients", emoji: "🎒" },
];

export const CATEGORIES_LINKS = [
  { href: "/recipes?category=breakfast", text: "Breakfast", emoji: "🍳" },
  { href: "/recipes?category=dinner", text: "Dinner", emoji: "🍽️" },
  { href: "/recipes?category=healthy", text: "Healthy", emoji: "🍎" },
  { href: "/recipes?category=dessert", text: "Desserts", emoji: "🍰" },
];

export const SOCIAL_LINKS = [
  {
    href: "https://facebook.com",
    text: "Facebook",
    icon: "/assets/icons/facebook.svg",
  },
  {
    href: "https://instagram.com",
    text: "Instagram",
    icon: "/assets/icons/instagram.svg",
  },
  {
    href: "https://twitter.com",
    text: "X (Twitter)",
    icon: "/assets/icons/twitter.svg",
  },
  {
    href: "https://youtube.com",
    text: "YouTube",
    icon: "/assets/icons/youtube.svg",
  },
];

// Private routes

export const PRIVATE_ROUTES = ["/my-profile"];

export const PRIVATE_API_ROUTES = [
  "/api/user",
  "/api/recipe/like",
  "/api/recipe/rate",
  "/api/comments/create",
  "/api/image-kit/avatar",
];
