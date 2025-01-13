const express = require("express");
const router = express.Router();
const { Gig } = require("../models");

// Public Route for Published Gigs
router.get("/", async (req, res) => {
  try {
    // Optional: Add query parameters for pagination (default: all)
    const limit = parseInt(req.query.limit, 10) || null; // Number of gigs to return
    const offset = parseInt(req.query.offset, 10) || null; // Starting index

    const gigs = await Gig.findAll({
      where: {
        status: "published", // Only return published gigs
      },
      order: [["createdAt", "DESC"]], // Latest gigs first
      limit: limit, // Apply limit if specified
      offset: offset, // Apply offset if specified
    });

    // Map to return only dataValues
    const cleanGigs = gigs.map((gig) => gig.dataValues);

    console.log("Fetched gigs from database:", cleanGigs); // Debugging
    res.json(cleanGigs); // Respond with cleaned gigs
  } catch (error) {
    console.error("Error fetching public gigs:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
