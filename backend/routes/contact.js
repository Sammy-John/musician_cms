const express = require("express");
const router = express.Router();

// Mock Data for Contact Submissions
const mockSubmissions = [];

// Submit a Contact Form
router.post("/", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newSubmission = {
    id: mockSubmissions.length + 1,
    name,
    email,
    message,
    date: new Date(),
  };

  mockSubmissions.push(newSubmission);
  res.status(201).json(newSubmission);
});

// Get All Sumbmissions
router.get("/", (req,res) => {
    res.json(mockSubmissions);
});

module.exports = router;