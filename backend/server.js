require ("dotenv").config();
const express = require("express")
const cors = require ("cors");

// Import Routes
const postRoutes = require ("./routes/posts");
const gigRoutes = require ("./routes/gigs");


// Intialize Express
const app = express();

// Middleware

app.use(express.json()); // Parse JSON
app.use(cors()); // Enables Cross-Origin sharing

// Routes
app.use ("/api/posts", postRoutes); 
app.use ("/api/gigs", gigRoutes);


// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
});

