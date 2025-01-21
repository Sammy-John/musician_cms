require("dotenv").config();
const cloudinary = require("cloudinary").v2;

// Cloudinary automatically parses `CLOUDINARY_URL` from the environment
cloudinary.config();

module.exports = cloudinary;
