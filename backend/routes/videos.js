const exprees = require ("express");
const router = express.Router();

// Mock Data for Videos
const mockVideos = [
    {
        id: 1,
        url: "https://www.facebook.com/facebook/videos10153231379946729/",
        title: "Sample Video 1",
    },
    {
        id: 2,
        url: "https://www.facebook.com/facebook/videos/10153231379946729/",
        title: "Sample Video 2",
    },
];

// Get All Videos
router.get ("/", (req, res) => {
    res.json(mockVideos);
});

// Get a Single Video by ID
router.get("/:id", (req, res) => {
    const video = mockVideos.find((v) => v.id === parseInt(req.params.id));
    if (video) {
      res.json(video);
    } else {
      res.status(404).json({ message: "Video not found" });
    }
  });

  module.exports = router;
  