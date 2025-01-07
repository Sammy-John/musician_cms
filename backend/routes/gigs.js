const express = require("express");
const { Gig } = require("../models"); // Import the Gig model
const router = express.Router();

// Get all gigs
router.get("/", async (req, res) => {
  try {
    const gigs = await Gig.findAll(); // Fetch all gigs from the database
    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

// Get gig by ID
router.get("/:id", async (req, res) => {
  try {
    const gig = await Gig.findByPk(req.params.id); // Find a gig by primary key
    if (gig) {
      res.json(gig);
    } else {
      res.status(404).json({ message: "Gig not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

// Add a new gig
router.post("/", async (req, res) => {
  try {
    const gig = await Gig.create(req.body); // Create a new gig in the database
    res.status(201).json(gig);
  } catch (error) {
    res.status(400).json({ message: "Bad request", error });
  }
});

// Update an existing gig
router.put("/:id", async (req, res) => {
  try {
    const gig = await Gig.findByPk(req.params.id);
    if (gig) {
      await gig.update(req.body); // Update gig details
      res.json(gig);
    } else {
      res.status(404).json({ message: "Gig not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

// Delete a gig
router.delete("/:id", async (req, res) => {
  try {
    const gig = await Gig.findByPk(req.params.id);
    if (gig) {
      await gig.destroy(); // Delete gig from the database
      res.json({ message: "Gig deleted successfully" });
    } else {
      res.status(404).json({ message: "Gig not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

module.exports = router;
