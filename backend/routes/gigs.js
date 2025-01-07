const express = require("express");
const router = express.Router();

let mockGigs = [
  {
    id: 1,
    date: "20/12/2024",
    venue: "Madison Square Garden",
    location: "New York, NY",
    ticket: "Free",
  },
  {
    id: 2,
    date: "25/12/2024",
    venue: "Red Rocks Amphitheatre",
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

// Create a new gig
router.post("/", (req, res) => {
  const { date, venue, location, ticket } = req.body;

  if (!date || !venue || !location || !ticket) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newGig = {
    id: mockGigs.length + 1,
    date,
    venue,
    location,
    ticket,
  };

  mockGigs.push(newGig);
  res.status(201).json(newGig);
});

// Update an existing gig
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { date, venue, location, ticket } = req.body;

  const gig = mockGigs.find((g) => g.id === parseInt(id));
  if (!gig) {
    return res.status(404).json({ message: "Gig not found" });
  }

  // Update the gig fields
  gig.date = date || gig.date;
  gig.venue = venue || gig.venue;
  gig.location = location || gig.location;
  gig.ticket = ticket || gig.ticket;

  res.json(gig);
});

// Delete a gig
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const gigIndex = mockGigs.findIndex((g) => g.id === parseInt(id));
  if (gigIndex === -1) {
    return res.status(404).json({ message: "Gig not found" });
  }

  const deletedGig = mockGigs.splice(gigIndex, 1);
  res.json(deletedGig[0]);
});

module.exports = router;
