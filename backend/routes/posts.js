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
router.get("/", (req, res) => {
    res.json(mockPosts);
});

// Get a Single Post by ID
router.get("/:id", (req, res) => {
    const post = mockPosts.find((p) => p.id === parseInt(req.params.id));
    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ message: "Post not Found" });
    }
});

// Add a New Post
router.post("/", (req, res) => {
    const { title, content, type } = req.body;

    if (!title || !content || !type) {
        return res.status(400).json({ message: "Title, content, and type are required" });
    }

    const newPost = {
        id: mockPosts.length + 1,
        title,
        content,
        type,
        createdAt: new Date().toISOString().split("T")[0],
    };

    mockPosts.push(newPost);
    res.status(201).json(newPost);
});

// Update an Existing Post
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { title, content, type } = req.body;

    const post = mockPosts.find((p) => p.id === parseInt(id));
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.type = type || post.type;

    res.json(post);
});

// Delete a Post
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    const postIndex = mockPosts.findIndex((p) => p.id === parseInt(id));
    if (postIndex === -1) {
        return res.status(404).json({ message: "Post not found" });
    }

    mockPosts.splice(postIndex, 1);
    res.json({ message: "Post deleted successfully" });
});

module.exports = router;
