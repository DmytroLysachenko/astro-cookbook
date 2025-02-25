/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
import defaultTheme from "tailwindcss/defaultTheme";

export const config = {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF6B6B", // Vibrant red for accents
        secondary: "#4ECDC4", // Teal for secondary elements
        accent: "#FFE66D", // Yellow for highlights
        background: "#F7FFF7", // Light greenish background
        text: "#1A535C", // Dark teal for text
        error: "#FF3B3B", // Bright red for errors
        success: "#4CAF50", // Green for success messages
      },
      fontFamily: {
        sans: ['"Open Sans"', ...defaultTheme.fontFamily.sans],
        serif: ['"Playfair Display"', ...defaultTheme.fontFamily.serif],
        mono: ['"Source Code Pro"', ...defaultTheme.fontFamily.mono],
      },
      container: {
        center: true,
        padding: "1.5rem",
      },
      boxShadow: {
        custom:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"), // For MDX content styling
    require("@tailwindcss/forms"), // For form elements
  ],
};
