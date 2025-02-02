require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models"); // Import Sequelize instance
const authenticateToken = require("./middleware/authMiddleware");

// Debugging Database Connection
console.log("Database Host:", process.env.DB_HOST);
console.log("Database Name:", process.env.DB_NAME);

// Import Routes
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const publicPostRoutes = require("./routes/publicPosts");
const gigRoutes = require("./routes/gigs");
const publicGigRoutes = require("./routes/publicGigs");
const imageRoutes = require("./routes/images");
const videoRoutes = require("./routes/videos");
const contactRoutes = require("./routes/contact");

// Initialize Express
const app = express();

// Middleware
app.use(express.json());

// ✅ Configure CORS
app.use(cors({
  origin: [
    "http://localhost:3000", // Local frontend for development
    "https://musician-cms.vercel.app" // Deployed frontend on Vercel
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Test Database Connection on Startup
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error.message);
  });

// Public Routes
app.use("/api/auth", authRoutes);
app.use("/api/public-posts", publicPostRoutes);
app.use("/api/public-gigs", publicGigRoutes);
app.use("/api/images", imageRoutes);

// Protected Routes (Requires Authentication)
app.use("/api/posts", authenticateToken, postRoutes);
app.use("/api/gigs", authenticateToken, gigRoutes);
app.use("/api/images/protected", authenticateToken, imageRoutes);
app.use("/api/videos", authenticateToken, videoRoutes);
app.use("/api/contact", authenticateToken, contactRoutes);

// Base Route
app.get("/", (req, res) => {
  res.send("API is running....");
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
