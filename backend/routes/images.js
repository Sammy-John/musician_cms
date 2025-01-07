const express = require("express");
const router = express.Router();

// Mock Data for Images
const mockImages = [
    { id: 1, url: "https://via.placeholder.com/150", type: "image"},
    { id: 2, url: "https://via.placeholder.com/300", type: "feature-image"},
];

// Get all Images
router.get("/", (req, res) => {
    res.json(mockImages);
});

// Get a Single Image by ID
router.get("/:id", (req, res) => {
    const image = mockImages.find((i) => i.id === parseInt(req.params.id));
    if (image) {
        res.json(image);
    } else {
        res.status(404).json({ message: "Image not found" });
    }
});

// Add a New Image
router.post("/", (req, res) => {
    const { url, type } = req.body;

    if (!url || !type) {
        return res.status(400).json({ message: "Both URL and type are required" });
    }

    const newImage = {
        id: mockImages.length + 1,
        url,
        type,
    };

    mockImages.push(newImage);
    res.status(201).json(newImage);
});

// Update an Existing Image
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { url, type } = req.body;

    const image = mockImages.find((i) => i.id === parseInt(id));
    if (!image) {
        return res.status(404).json({ message: "Image not found" });
    }

    image.url = url || image.url;
    image.type = type || image.type;

    res.json(image);
});

// Delete an Image
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    const imageIndex = mockImages.findIndex((i) => i.id === parseInt(id));
    if (imageIndex === -1) {
        return res.status(404).json({ message: "Image not found" });
    }

    mockImages.splice(imageIndex, 1);
    res.json({ message: "Image deleted successfully" });
});

module.exports = router;
