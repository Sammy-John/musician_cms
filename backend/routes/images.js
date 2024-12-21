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
})

// Get a Single Image by ID
router.get("/:id", (req, res) => {
    const image = mockImages.find((i) => i.id === parseInt(req.params.id));
    if (image) {
      res.json(image);
    } else {
      res.status(404).json({ message: "Image not found" });
    }
  });

  module.exports = router;
  