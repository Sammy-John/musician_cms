module.exports = {
  content: [
    "./src/cms/**/*.{js,jsx,ts,tsx}", // Adjust as necessary
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1E3A8A",
          light: "#3B82F6",
          dark: "#1E293B",
        },
        secondary: {
          DEFAULT: "#F59E0B",
          light: "#FBBF24",
          dark: "#B45309",
        },
        accent: {
          red: "#EF4444",
          green: "#10B981",
          cyan: "#06B6D4",
        },
      },
    },
  },
  plugins: [],
};
