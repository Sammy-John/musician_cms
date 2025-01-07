const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Mock user for testing
const mockUser = {
  username: "admin",
  password: "$2b$10$/e0UpZwEABedjm0ObrXLn.8ZyfcCjK1bPXso6kqUw7x7VlYJ2JEPK", // bcrypt hash for "password123"
};

// Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  console.log("Request username:", username);
  console.log("Request password:", password);

  // Validate username
  if (username !== mockUser.username) {
    console.log("Username does not match mock user.");
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Validate password
  const isPasswordValid = await bcrypt.compare(password, mockUser.password);
  console.log("Is password valid:", isPasswordValid);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Generate a JWT token
  try {
    const token = jwt.sign(
      { username: mockUser.username },
      process.env.JWT_SECRET, // Ensure this is set in your .env file
      { expiresIn: "1h" }
    );
    res.json({ token }); // Send the token back to the client
  } catch (error) {
    console.error("Error generating token:", error.message);
    res.status(500).json({ message: "Internal server error" }); // Graceful error response
  }
});

module.exports = router;
