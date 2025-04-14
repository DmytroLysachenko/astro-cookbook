# Cooking Spot - A Modern Recipe Platform

![Cooking Spot](https://ik.imagekit.io/lysachenkodmytro/cooking-spot/Screenshot%202025-03-13%20at%2015-48-13%20Cooking%20Spot.png) <!-- Replace with actual banner image URL -->

## 🚀 Overview

Cooking Spot is a high-performance, SEO-optimized, and scalable recipe website built with **Astro v5**. The platform efficiently combines **SSG, SSR, and CSR** using Astro's **Island architecture**, ensuring maximum speed while keeping dynamic features interactive.

Users can explore recipes, filter and sort them, view ingredient nutrition data, and engage with content by liking, rating, and commenting. A personalized profile allows users to manage their interactions and update their avatars.

## ✨ Features

- 🔥 **High-performance Astro v5 site** with **SSG-first approach**
- 🛠 **Astro Islands for interactivity** (CSR for dynamic UI parts, SSR for real-time data, and SSG for static content)
- 🏗 **MDX-powered content collections** for storing recipes
- 🔐 **OAuth authentication** with Google, Facebook, and GitHub via **Auth.js**
- 📊 **PostgreSQL + Drizzle ORM** for storing user interactions (likes, ratings, comments)
- 🖼 **Avatar management** via **ImageKit** (file upload & storage)
- 💡 **SEO-optimized** for maximum discoverability
- 🎨 **Tailwind CSS + shadcn/ui** for modern styling
- 🌍 **Edge-optimized backend logic** using Astro API endpoints
- ✅ **Code quality ensured** with **ESLint & Prettier**

## 🏗 Tech Stack

- **Frontend:** Astro v5, React, Tailwind CSS, shadcn/ui
- **Backend:** Astro API routes, PostgreSQL (Neon DB), Drizzle ORM
- **Auth:** Auth.js (OAuth with Google, Facebook, GitHub)
- **Storage:** MDX for recipes, PostgreSQL for dynamic content
- **Hosting:** Vercel
- **Utilities:** ESLint, Prettier, ImageKit for media handling

## 📸 Screenshots

![Recipe List](https://ik.imagekit.io/lysachenkodmytro/cooking-spot/Screenshot%202025-03-13%20at%2015-53-45%20Recipes.png?updatedAt=1741877992242)
![User Profile](https://ik.imagekit.io/lysachenkodmytro/cooking-spot/Screenshot%202025-03-13%20at%2015-54-57%20User%20Dashboard.png?updatedAt=1741877992218)

## ⚡ Setup & Installation

1. **Clone the repo:**
   ```sh
   git clone https://github.com/DmytroLysachenko/astro-cookbook.git
   cd astro-cookbook
   ```
2. **Install dependencies:**
   ```sh
   npm install  # or pnpm install / yarn install
   ```
3. **Set up environment variables:**
   Create a `.env` file and configure database, OAuth, and ImageKit settings.
   ```env
   DATABASE_URL=
   AUTH_TRUST_HOST=true
   AUTH_SECRET=
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   GITHUB_CLIENT_ID=
   GITHUB_CLIENT_SECRET=
   FACEBOOK_CLIENT_ID=
   FACEBOOK_CLIENT_SECRET=
   IMAGEKIT_URL_ENDPOINT=
   IMAGEKIT_PUBLIC_KEY=
   IMAGEKIT_PRIVATE_KEY=
   BASE_URL=
   API_BASE_URL=
   ```

4. **Run the development server:**
   ```sh
   npm run dev  # Start the Astro dev server on port 4321
   ```

5. **Build for production:**
   ```sh
   npm run build  # Generates static output
   ```

## 🛠 Key Functionalities

### 🌟 Recipe Pages

- MDX-based recipes for fast, SEO-friendly content
- Dynamic elements like comments, ratings, and likes (SSR islands)

### 👤 User Profile

- Manage bio & avatar (ImageKit integration)
- View liked & rated recipes

### 🔥 Interactive Features

- Like, rate, and comment on recipes (CSR-enabled UI for instant feedback)
- Sort & filter recipes dynamically (SSR-powered data fetching)

### 🔐 Authentication

- OAuth via Google, Facebook, GitHub
- Astro API endpoints for secure authentication

## 📬 Contact

For inquiries or collaborations, reach out:

- **GitHub:** [Dmytro Lysachenko](https://github.com/DmytroLysachenko)
- **Email:** dlysachenko98@gmail.com

---

Made with ❤️ using Astro v5 & Tailwind CSS 🚀
