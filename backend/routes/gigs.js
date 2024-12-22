const express = require("express");
const router = express.Router();

const mockGigs = [
    {
        id: 1,
        date: "2024-12-20",
        venue: "Madison Square Garden",
        location: "New York, NY",
        ticket: "Free",
    },
    {
        id: 2,
        date: "2024-12-25",
        venue: "Red Rocks Ampitheatre",
        location: "Denver, CO",
        ticket: "$50",
    },
];

// Get all gigs
router.get("/", (req, res) => {
    res.json(mockGigs);
});

// Get gig by ID
router.get("/:id", (req, res) => {
    const gig = mockGigs.find((g) => g.id === parseInt(req.params.id));
    if (gig) {
        res.json(gig);
    } else {
        res.status(404).json({ message: "Gig not found" });
    }
});

module.exports = router;
