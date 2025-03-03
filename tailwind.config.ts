import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,astro}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["OpenSans-Regular", "sans-serif"],
        heading: ["Poppins-Bold", "sans-serif"],
        body: ["OpenSans-Light", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
