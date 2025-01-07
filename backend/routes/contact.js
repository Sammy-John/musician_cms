const express = require('express');
const { ContactSubmission } = require('../models');
const router = express.Router();

// Submit a Contact Form
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newSubmission = await ContactSubmission.create({ name, email, message });
    res.status(201).json(newSubmission);
  } catch (error) {
    console.error('Error submitting contact form:', error.message);
    res.status(500).json({ message: 'Internal server error', error });
  }
});

// Get All Submissions
router.get('/', async (req, res) => {
  try {
    const submissions = await ContactSubmission.findAll();
    res.json(submissions);
  } catch (error) {
    console.error('Error fetching contact submissions:', error.message);
    res.status(500).json({ message: 'Internal server error', error });
  }
});

// Delete a Submission
router.delete('/:id', async (req, res) => {
  try {
    const submission = await ContactSubmission.findByPk(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    await submission.destroy();
    res.json({ message: 'Submission deleted successfully' });
  } catch (error) {
    console.error('Error deleting submission:', error.message);
    res.status(500).json({ message: 'Internal server error', error });
  }
});

module.exports = router;
