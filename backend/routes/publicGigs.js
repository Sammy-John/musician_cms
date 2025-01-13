const express = require("express");
const router = express.Router();
const { Gig } = require("../models");

console.log("Public Gigs route file loaded");

// Public Route: Get Published Gigs
router.get('/', async (req, res) => {
  console.log("Fetching public gigs...");
  try {
    console.log("Executing query for public gigs...");
const gigs = await Gig.findAll({
  where: { status: 'published' },
  order: [['createdAt', 'DESC']],
});
console.log("Query result:", gigs);

    res.json(gigs);
  } catch (error) {
    console.error('Error fetching public gigs:', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});



module.exports = router;
