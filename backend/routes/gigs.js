const express = require("express");
const { Gig } = require("../models");
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

// Protected Route: Get All Gigs
router.get("/", authenticateToken, async (req, res) => {
  try {
    const gigs = await Gig.findAll();
    res.json(gigs.map((gig) => gig.toJSON()));
  } catch (error) {
    console.error("Error fetching gigs:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Protected Route: Get Single Gig by ID
router.get("/", authenticateToken, async (req, res) => {
  try {
    const gigs = await Gig.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(gigs.map((gig) => gig.toJSON()));
  } catch (error) {
    console.error("Error fetching gigs:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Protected Route: Add a New Gig
router.post("/", authenticateToken, async (req, res) => {
  const { venue, location, date, time, ticketInfo, status } = req.body;

  if (!venue || !date || !time || !status) {
    return res.status(400).json({ message: "Venue, date, time, and status are required." });
  }

  if (ticketInfo !== "Free" && (!ticketInfo.link || !ticketInfo.price)) {
    return res.status(400).json({ message: "Valid ticketInfo (link and price) is required for paid gigs." });
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
    res.status(201).json(newGig);
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
