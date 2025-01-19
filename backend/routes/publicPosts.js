const express = require("express");
const router = express.Router();
const { Post } = require("../models");

// Public Route for Published Posts
router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10; // Default limit to 10
    const offset = parseInt(req.query.offset, 10) || 0;

    const posts = await Post.findAll({
      where: { status: "published" },
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });

    res.json(posts.map((post) => post.dataValues));
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});


module.exports = router;
