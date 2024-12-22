require ("dotenv").config();
const express = require("express")
const cors = require ("cors");

// Import Routes
const postRoutes = require ("./routes/posts");
const gigRoutes = require ("./routes/gigs");
const imageRoutes = require ("./routes/images");
const videoRoutes = require ("./routes/videos");
const contactRoutes = require ("./routes/contact");

// Intialize Express
const app = express();

// Middleware

app.use(express.json()); // Parse JSON
app.use(cors()); // Enables Cross-Origin sharing

// Routes
app.use ("/api/posts", postRoutes); 
app.use ("/api/gigs", gigRoutes);
app.use ("/api/images", imageRoutes);
app.use ("/api/videos", videoRoutes);
app.use ("/api/contact", contactRoutes)

// Base Route
app.get("/", (req, res) => {
  res.send("API is running....");
});

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
});

