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
const postRoutes = require("./routes/posts"); // CMS protected posts
const publicPostRoutes = require("./routes/publicPosts"); // Public posts route
const gigRoutes = require("./routes/gigs");
const publicGigRoutes = require("./routes/publicGigs"); // Public gigs route
const imageRoutes = require("./routes/images");
const videoRoutes = require("./routes/videos");
const contactRoutes = require("./routes/contact");

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Test Database Connection on Startup
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error.message);
  });

// Debug Routes
app.get("/debug-posts", async (req, res) => {
  try {
    const results = await sequelize.query(
      `SELECT * FROM public.posts WHERE status = 'published'`,
      { type: sequelize.QueryTypes.SELECT }
    );
    console.log("Raw query results for posts:", results);
    res.json(results);
  } catch (error) {
    console.error("Error executing raw query for posts:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

app.get("/debug-gigs", async (req, res) => {
  try {
    const results = await sequelize.query(
      `SELECT * FROM public.gigs WHERE status = 'published'`,
      { type: sequelize.QueryTypes.SELECT }
    );
    console.log("Raw query results for gigs:", results);
    res.json(results);
  } catch (error) {
    console.error("Error executing raw query for gigs:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Public Routes
app.use("/api/auth", authRoutes);
app.use("/api/public-posts", publicPostRoutes); // Mount the publicPosts route
app.use("/api/public-gigs", publicGigRoutes); // Mount the publicGigs route

// Protected Routes (Requires Authentication)
app.use("/api/posts", authenticateToken, postRoutes);
app.use("/api/gigs", authenticateToken, gigRoutes);
app.use("/api/images", authenticateToken, imageRoutes);
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
