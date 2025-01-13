const express = require("express");
const { Gig } = require("../models");
const authenticateToken = require("../middleware/authMiddleware"); // For protected routes
const router = express.Router();

// Public Route: Get Published Gigs
router.get("/public", async (req, res) => {
  try {
    const gigs = await Gig.findAll({
      where: { status: "published" },
      order: [["createdAt", "DESC"]],
    });
    const cleanGigs = gigs.map((gig) => gig.dataValues); // Clean response
    res.json(cleanGigs);
  } catch (error) {
    console.error("Error fetching public gigs:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Protected Route: Get All Gigs
router.get("/", authenticateToken, async (req, res) => {
  try {
    const gigs = await Gig.findAll();
    const cleanGigs = gigs.map((gig) => gig.dataValues); // Clean response
    res.json(cleanGigs);
  } catch (error) {
    console.error("Error fetching gigs:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Protected Route: Get Single Gig by ID
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const gig = await Gig.findByPk(req.params.id);
    if (gig) {
      res.json(gig.dataValues); // Return clean data
    } else {
      res.status(404).json({ message: "Gig not found" });
    }
  } catch (error) {
    console.error("Error fetching gig:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Protected Route: Add a New Gig
router.post("/", authenticateToken, async (req, res) => {
  const { venue, location, date, time, ticketInfo, status } = req.body;

  if (!venue || !date || !time || !status) {
    return res.status(400).json({ message: "Venue, date, time, and status are required" });
  }

  try {
    const newGig = await Gig.create({
      venue,
      location,
      date,
      time,
      ticketInfo,
      status,
    });
    res.status(201).json(newGig.dataValues);
  } catch (error) {
    console.error("Error creating gig:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Protected Route: Update an Existing Gig
router.put("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { venue, location, date, time, ticketInfo, status } = req.body;

  try {
    const gig = await Gig.findByPk(id);
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    // Update fields only if provided
    gig.venue = venue || gig.venue;
    gig.location = location || gig.location;
    gig.date = date || gig.date;
    gig.time = time || gig.time;
    gig.ticketInfo = ticketInfo || gig.ticketInfo;
    gig.status = status || gig.status;

    await gig.save();
    res.json(gig.dataValues);
  } catch (error) {
    console.error("Error updating gig:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Protected Route: Delete a Gig
router.delete("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const gig = await Gig.findByPk(id);
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    await gig.destroy();
    res.json({ message: "Gig deleted successfully" });
  } catch (error) {
    console.error("Error deleting gig:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
