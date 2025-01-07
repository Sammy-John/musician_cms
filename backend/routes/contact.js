const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

const mockSubmissions = [];

// Submit a Contact Form
router.post("/", async (req, res) => {
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

  // Send email notification (optional)
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "admin@example.com",
      subject: "New Contact Submission",
      text: `You have a new contact submission:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });
  } catch (error) {
    console.error("Error sending email:", error.message);
  }

  res.status(201).json(newSubmission);
});

// Get All Submissions
router.get("/", (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);

  const paginatedSubmissions = mockSubmissions.slice(startIndex, endIndex);

  res.json({
    page: parseInt(page),
    limit: parseInt(limit),
    total: mockSubmissions.length,
    data: paginatedSubmissions,
  });
});

// Get a Specific Submission
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const submission = mockSubmissions.find((submission) => submission.id === parseInt(id));
  if (!submission) {
    return res.status(404).json({ message: "Submission not found" });
  }

  res.json(submission);
});

// Delete a Submission
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const submissionIndex = mockSubmissions.findIndex((submission) => submission.id === parseInt(id));
  if (submissionIndex === -1) {
    return res.status(404).json({ message: "Submission not found" });
  }

  mockSubmissions.splice(submissionIndex, 1);
  res.json({ message: "Submission deleted successfully" });
});

// Mark a Submission as Handled
router.put("/:id", (req, res) => {
  const { id } = req.params;

  const submission = mockSubmissions.find((submission) => submission.id === parseInt(id));
  if (!submission) {
    return res.status(404).json({ message: "Submission not found" });
  }

  submission.handled = true;
  res.json(submission);
});

module.exports = router;
