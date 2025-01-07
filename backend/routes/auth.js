const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();


// Login Route
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
  
    try {
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
  
      const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      res.json({ token });
    } catch (error) {
      console.error("Error logging in:", error.message);
      res.status(500).json({ message: "Internal server error", error });
    }
  });
  

// Change Username
router.put("/change-username", authenticateToken, async (req, res) => {
  const { newUsername, password } = req.body;

  if (!newUsername || !password) {
    return res.status(400).json({ message: "New username and password are required" });
  }

  try {
    const user = await User.findOne({ where: { username: req.user.username } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    user.username = newUsername;
    await user.save();

    res.json({ message: "Username updated successfully" });
  } catch (error) {
    console.error("Error updating username:", error.message);
    res.status(500).json({ message: "Internal server error", error });
  }
});

// Change Email
router.put("/change-email", authenticateToken, async (req, res) => {
  const { newEmail, password } = req.body;

  if (!newEmail || !password) {
    return res.status(400).json({ message: "New email and password are required" });
  }

  try {
    const user = await User.findOne({ where: { username: req.user.username } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    user.email = newEmail;
    await user.save();

    res.json({ message: "Email updated successfully" });
  } catch (error) {
    console.error("Error updating email:", error.message);
    res.status(500).json({ message: "Internal server error", error });
  }
});

// Change Password
router.put("/change-password", authenticateToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: "Current password and new password are required" });
  }

  try {
    const user = await User.findOne({ where: { username: req.user.username } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid current password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error.message);
    res.status(500).json({ message: "Internal server error", error });
  }
});

module.exports = router;
