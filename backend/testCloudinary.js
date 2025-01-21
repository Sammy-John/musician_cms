require("dotenv").config();
const cloudinary = require("cloudinary").v2;

// Cloudinary automatically parses `CLOUDINARY_URL` from the environment
cloudinary.config();

(async () => {
  try {
    // Test fetching resources from Cloudinary
    const response = await cloudinary.api.resources({
      type: "upload",
      prefix: "website", // Adjust prefix as needed
      max_results: 5, // Limit for testing
    });

    console.log("Cloudinary Test: Successfully fetched resources:");
    response.resources.forEach((resource) => {
      console.log(`- Public ID: ${resource.public_id}, URL: ${resource.secure_url}`);
    });
  } catch (error) {
    console.error("Cloudinary Test: Error fetching resources:", error.message);
  }
})();
