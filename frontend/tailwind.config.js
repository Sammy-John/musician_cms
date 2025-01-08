/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary color scheme
        primary: {
          DEFAULT: "#1E3A8A", // Dark Blue
          light: "#3B82F6", // Lighter Blue
          dark: "#1E293B", // Navy Blue
        },
        // Secondary color scheme
        secondary: {
          DEFAULT: "#F59E0B", // Amber
          light: "#FBBF24", // Light Amber
          dark: "#B45309", // Dark Amber
        },
        // Neutral colors
        neutral: {
          light: "#F3F4F6", // Light Gray
          DEFAULT: "#9CA3AF", // Gray
          dark: "#374151", // Dark Gray
        },
        // Accent colors
        accent: {
          red: "#EF4444", // Red for alerts or errors
          green: "#10B981", // Green for success messages
          cyan: "#06B6D4", // Cyan accent
        },
        // Background and text
        background: "#F9FAFB", // Light background
        text: {
          DEFAULT: "#1F2937", // Default text color
          light: "#6B7280", // Light text
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Modern sans-serif font
      },
    },
  },
  plugins: [],
};
