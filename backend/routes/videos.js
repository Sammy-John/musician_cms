const express = require('express');
const { Video } = require('../models');
const router = express.Router();

// Get all Videos
router.get('/', async (req, res) => {
  try {
    const videos = await Video.findAll();
    res.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error.message);
    res.status(500).json({ message: 'Internal server error', error });
  }
});

// Get a Single Video by ID
router.get('/:id', async (req, res) => {
  try {
    const video = await Video.findByPk(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json(video);
  } catch (error) {
    console.error('Error fetching video:', error.message);
    res.status(500).json({ message: 'Internal server error', error });
  }
});

// Create a New Video
router.post('/', async (req, res) => {
  const { url, title } = req.body;

  if (!url || !title) {
    return res.status(400).json({ message: 'URL and title are required' });
  }

  try {
    const newVideo = await Video.create({ url, title });
    res.status(201).json(newVideo);
  } catch (error) {
    console.error('Error creating video:', error.message);
    res.status(500).json({ message: 'Internal server error', error });
  }
});

// Delete a Video
router.delete('/:id', async (req, res) => {
  try {
    const video = await Video.findByPk(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    await video.destroy();
    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    console.error('Error deleting video:', error.message);
    res.status(500).json({ message: 'Internal server error', error });
  }
});

module.exports = router;
