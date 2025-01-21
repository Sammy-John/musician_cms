const express = require("express");
const { Image } = require("../models"); // Sequelize Image model
const cloudinary = require("../config/cloudinary");
const router = express.Router();

// Fetch all images from Cloudinary (Public Route)
router.get("/cloudinary", async (req, res) => {
  try {
    const resources = await cloudinary.api.resources({
      type: "upload",
      prefix: "website", // Optional folder prefix for organization
      max_results: 100,
    });
    res.json(resources.resources);
  } catch (error) {
    console.error("Error fetching Cloudinary images:", error.message);
    res.status(500).json({ message: "Error fetching Cloudinary images." });
  }
});

// Get all published images (Protected Route)
router.get("/", async (req, res) => {
  try {
    const images = await Image.findAll({ where: { status: "published" } });
    res.json(images);
  } catch (error) {
    console.error("Error fetching published images:", error.message);
    res.status(500).json({ message: "Error fetching published images." });
  }
});

// Publish an image (Add to database with published status) (Protected Route)
router.post("/publish", async (req, res) => {
  const { url, publicId, type, description } = req.body;

  if (!url || !publicId || !type) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newImage = await Image.create({
      url,
      publicId,
      type,
      description, // Save description
      status: "published",
    });
    res.status(201).json(newImage);
  } catch (error) {
    console.error("Error publishing image:", error.message);
    res.status(500).json({ message: "Error publishing image." });
  }
});


// Unpublish or Delete an image (Protected Route)
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const image = await Image.findByPk(id);
    if (!image) {
      return res.status(404).json({ message: "Image not found." });
    }

    await image.destroy();
    res.json({ message: "Image unpublished successfully." });
  } catch (error) {
    console.error("Error unpublishing image:", error.message);
    res.status(500).json({ message: "Error unpublishing image." });
  }
});

module.exports = router;
