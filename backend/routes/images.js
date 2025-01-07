const express = require("express");
const { Image } = require("../models");
const router = express.Router();

// Get all Images
router.get("/", async (req, res) => {
  try {
    const images = await Image.findAll();
    res.json(images);
  } catch (error) {
    console.error("Error fetching images:", error.message);
    res.status(500).json({ message: "Internal server error", error });
  }
});

// Get a Single Image by ID
router.get("/:id", async (req, res) => {
  try {
    const image = await Image.findByPk(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.json(image);
  } catch (error) {
    console.error("Error fetching image:", error.message);
    res.status(500).json({ message: "Internal server error", error });
  }
});

// Create a New Image
router.post("/", async (req, res) => {
  const { url, type } = req.body;

  if (!url || !type) {
    return res.status(400).json({ message: "URL and type are required" });
  }

  try {
    const newImage = await Image.create({ url, type });
    res.status(201).json(newImage);
  } catch (error) {
    console.error("Error creating image:", error.message);
    res.status(500).json({ message: "Internal server error", error });
  }
});

// Update an Image
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { url, type } = req.body;

    if (!url || !type) {
      return res.status(400).json({ message: "URL and type are required" });
    }

    const image = await Image.findByPk(id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    image.url = url;
    image.type = type;
    await image.save();

    res.json(image); // Return the updated image
  } catch (error) {
    console.error("Error updating image:", error.message);
    res.status(500).json({ message: "Internal server error", error });
  }
});


// Delete an Image
router.delete("/:id", async (req, res) => {
  try {
    const image = await Image.findByPk(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    await image.destroy();
    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error.message);
    res.status(500).json({ message: "Internal server error", error });
  }
});

module.exports = router;
