/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Global content paths
  ],
  theme: {
    extend: {
      // Shared/global settings
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Shared sans-serif font
      },
      colors: {
        // Common colors for both CMS and public sides
        neutral: {
          light: "#F3F4F6",
          DEFAULT: "#9CA3AF",
          dark: "#374151",
        },
      },
    },
  },
  plugins: [],
};
