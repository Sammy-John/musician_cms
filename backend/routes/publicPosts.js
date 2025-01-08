const express = require("express");
const router = express.Router();
const { Post } = require("../models");

// Public Route for Published Posts
router.get("/", async (req, res) => {
  try {
    // Optional: Add query parameters for pagination (default: all)
    const limit = parseInt(req.query.limit, 10) || null; // Number of posts to return
    const offset = parseInt(req.query.offset, 10) || null; // Starting index

    const posts = await Post.findAll({
      where: {
        status: "published", // Only return published posts
      },
      order: [["createdAt", "DESC"]], // Latest posts first
      limit: limit, // Apply limit if specified
      offset: offset, // Apply offset if specified
    });

    // Map to return only dataValues
    const cleanPosts = posts.map((post) => post.dataValues);

    console.log("Fetched posts from database:", cleanPosts); // Debugging
    res.json(cleanPosts); // Respond with cleaned posts
  } catch (error) {
    console.error("Error fetching public posts:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
