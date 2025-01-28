const express = require("express");
const router = express.Router();
const { Post } = require("../models");
const authenticateToken = require("../middleware/authMiddleware"); // For protected routes


// Protected Route: Get All Posts (CMS Access)
router.get("/", authenticateToken, async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Protected Route: Get Single Post by ID
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    console.error("Error fetching post:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Protected Route: Add a New Post
router.post("/", authenticateToken, async (req, res) => {
  const { title, description, type, status } = req.body;

  if (!title || !type || !status) {
    return res.status(400).json({ message: "Title, type, and status are required" });
  }

  try {
    const newPost = await Post.create({
      title,
      description,
      type,
      status,
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Protected Route: Update an Existing Post
  router.put("/:id", authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { title, summary, description, content, type, status } = req.body;
  
    try {
      const post = await Post.findByPk(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      post.title = title || post.title;
      post.summary = summary || post.summary; // Ensure summary is updated
      post.description = description || post.description;
      post.content = content || post.content; // Ensure content is updated
      post.type = type || post.type;
      post.status = status || post.status;
  
      await post.save();
      res.json(post);
    } catch (error) {
      console.error("Error updating post:", error.message);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  });
  

// Protected Route: Delete a Post
router.delete("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await post.destroy();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
