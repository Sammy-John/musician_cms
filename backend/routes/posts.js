const express = require("express");
const router = express.Router();

// Mock Data for Posts
const mockPosts = [
    {
        id: 1,
        title: "Post 1",
        content: "This is content for post 1",
        type: "regular",
        createdAt: "2024-12-15",
    },
    {
        id: 2,
        title: "Post 2",
        content: "This is content for post 2",
        type: "video",
        createdAt: "2024-12-12",
    },
];

// Get All Posts
router.get ("/", (req, res) => {
    res.json(mockPosts)
});

// Get a single post by ID
router.get ("/:id", (req, res) => {
    const post = mockPosts.find((p) => p.id === parseInt(req.params.id));
    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ message: "Post not Found" });
    }
});

module.exports = router;
