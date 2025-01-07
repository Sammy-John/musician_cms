const express = require("express");
const router = express.Router();

// Mock Data for Videos
const mockVideos = [
    {
        id: 1,
        url: "https://www.facebook.com/facebook/videos/10153231379946729/",
        title: "Sample Video 1",
    },
    {
        id: 2,
        url: "https://www.facebook.com/facebook/videos/10153231379946729/",
        title: "Sample Video 2",
    },
];

// Get All Videos
router.get("/", (req, res) => {
    res.json(mockVideos);
});

// Get a Single Video by ID
router.get("/:id", (req, res) => {
    const video = mockVideos.find((v) => v.id === parseInt(req.params.id));
    if (video) {
        res.json(video);
    } else {
        res.status(404).json({ message: "Video not found" });
    }
});

// Add a New Video
router.post("/", (req, res) => {
    const { url, title } = req.body;

    if (!url || !title) {
        return res.status(400).json({ message: "Both URL and title are required" });
    }

    const newVideo = {
        id: mockVideos.length + 1,
        url,
        title,
    };

    mockVideos.push(newVideo);
    res.status(201).json(newVideo);
});

// Update an Existing Video
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { url, title } = req.body;

    const video = mockVideos.find((v) => v.id === parseInt(id));
    if (!video) {
        return res.status(404).json({ message: "Video not found" });
    }

    video.url = url || video.url;
    video.title = title || video.title;

    res.json(video);
});

// Delete a Video
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    const videoIndex = mockVideos.findIndex((v) => v.id === parseInt(id));
    if (videoIndex === -1) {
        return res.status(404).json({ message: "Video not found" });
    }

    mockVideos.splice(videoIndex, 1);
    res.json({ message: "Video deleted successfully" });
});

module.exports = router;
