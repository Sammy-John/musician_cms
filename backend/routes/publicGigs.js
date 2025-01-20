const express = require("express");
const router = express.Router();
const { Gig } = require("../models"); // Import your Gig model

console.log("Public Gigs route file loaded");

// Public Route: Get Published Gigs
router.get("/", async (req, res) => {
  try {
    const gigs = await Gig.findAll({
      where: { status: "published" },
      order: [["createdAt", "DESC"]],
    });

    // Process and format gigs
    const formattedGigs = gigs.map((gig) => ({
      ...gig.dataValues,
      ticketInfo:
        gig.ticketInfo === "Free"
          ? "Free" // Explicitly handle 'Free'
          : typeof gig.ticketInfo === "string"
          ? JSON.parse(gig.ticketInfo) // Parse if it's a string
          : gig.ticketInfo, // Otherwise, use as is (JSON object)
    }));

    res.json(formattedGigs);
  } catch (error) {
    console.error("Error fetching public gigs:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
