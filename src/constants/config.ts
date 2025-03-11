export const SITE_TITLE = "Cooking Spot";
export const SITE_DESCRIPTION = "Welcome to the Cooking Spot cookbook website!";

export const COMMENTS_PER_PAGE = 10;

export const HEADER_LINKS = [
  { href: "/recipes", text: "Recipes" },
  { href: "/about", text: "About" },
  { href: "/ingredients", text: "Ingredients" },
];

export const OAUTH_PROVIDERS = [
  { provider: "google", iconPath: "/assets/icons/google.svg" },
  { provider: "facebook", iconPath: "/assets/icons/facebook.svg" },
  { provider: "github", iconPath: "/assets/icons/github.svg" },
];

// FOOTER

export const QUICK_LINKS = [
  { href: "/", text: "Home" },
  { href: "/recipes", text: "Recipes" },
  { href: "/ingredients", text: "Ingredients" },
];

export const CATEGORIES_LINKS = [
  { href: "/recipes?category=breakfast", text: "Breakfast" },
  { href: "/recipes?category=dinner", text: "Dinner" },
  { href: "/recipes?category=healthy", text: "Healthy" },
  { href: "/recipes?category=dessert", text: "Desserts" },
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
    text: "Twitter",
    icon: "/assets/icons/youtube.svg",
  },
  {
    href: "https://youtube.com",
    text: "YouTube",
    icon: "/assets/icons/twitter.svg",
  },
];

// Define private routes

export const PRIVATE_ROUTES = ["/my-profile"];

export const PRIVATE_API_ROUTES = [
  "/api/user",
  "/api/recipe/like",
  "/api/recipe/rate",
  "/api/comments/create",
  "/api/image-kit/avatar",
];
