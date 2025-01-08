/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/cms/**/*.{js,jsx,ts,tsx}", // CMS-specific files
    "./src/**/*.{js,jsx,ts,tsx}", // Public site files (if needed later)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
