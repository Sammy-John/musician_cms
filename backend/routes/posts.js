const express = require("express");
const router = express.Router();
const { Post } = require("../models");

// Get All Posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Get a Single Post by ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Add a New Post
router.post("/", async (req, res) => {
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
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Update an Existing Post
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, type, status } = req.body;

  try {
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.title = title || post.title;
    post.description = description || post.description;
    post.type = type || post.type;
    post.status = status || post.status;

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Delete a Post
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await post.destroy();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
