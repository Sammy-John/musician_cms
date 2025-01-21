const baseConfig = require("./tailwind.config.js");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  content: [
    "./src/cms/**/*.{js,jsx,ts,tsx}", // Limit to CMS content
  ],
  theme: {
    extend: {
      ...baseConfig.theme.extend,
      colors: {
        ...baseConfig.theme.extend.colors,
        // CMS-specific color scheme
        primary: {
          DEFAULT: "#1E3A8A", // Dark Blue
          light: "#3B82F6", // Lighter Blue
          dark: "#1E293B", // Navy Blue
        },
        secondary: {
          DEFAULT: "#F59E0B", // Amber
          light: "#FBBF24", // Light Amber
          dark: "#B45309", // Dark Amber
        },
        accent: {
          red: "#EF4444",
          green: "#10B981",
          cyan: "#06B6D4",
        },
        background: "#F9FAFB",
        text: {
          DEFAULT: "#1F2937",
          light: "#6B7280",
        },
      },
    },
  },
};
