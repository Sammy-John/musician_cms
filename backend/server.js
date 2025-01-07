require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authenticateToken = require("./middleware/authMiddleware");


// Import Routes
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const gigRoutes = require("./routes/gigs");
const imageRoutes = require("./routes/images");
const videoRoutes = require("./routes/videos");
const contactRoutes = require("./routes/contact");

// Initialize Express
const app = express(); // Initialize the app before anything else

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Allow cross-origin requests

// Public Routes
app.use("/api/auth", authRoutes); // Mount the auth route

// Protected Routes
app.use("/api/posts", authenticateToken, postRoutes);
app.use("/api/gigs", authenticateToken, gigRoutes);
app.use("/api/images", authenticateToken, imageRoutes);
app.use("/api/videos", authenticateToken, videoRoutes);
app.use("/api/contact", authenticateToken, contactRoutes);

// Base Route
app.get("/", (req, res) => {
  res.send("API is running....");
});

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
