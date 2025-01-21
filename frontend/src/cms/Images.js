import React, { useState, useEffect } from "react";
import axios from "axios";

const Images = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [publishedImages, setPublishedImages] = useState([]);
  const [descriptions, setDescriptions] = useState({}); // Track descriptions by public_id

  // Fetch images from Cloudinary and database on component mount
  useEffect(() => {
    fetchCloudinaryImages();
    fetchPublishedImages();
  }, []);

  const fetchCloudinaryImages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/images/cloudinary");
      setImages(response.data);
    } catch (err) {
      console.error("Error fetching Cloudinary images:", err);
      setError("Failed to fetch Cloudinary images");
    }
  };

  const fetchPublishedImages = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/images", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPublishedImages(response.data);
    } catch (err) {
      console.error("Error fetching published images:", err);
      setError("Failed to fetch published images");
    }
  };

  const handleDescriptionChange = (publicId, value) => {
    setDescriptions((prev) => ({
      ...prev,
      [publicId]: value,
    }));
  };

  const handlePublishImage = async (image, type) => {
    const description = descriptions[image.public_id] || "";
    if (!description.trim()) {
      setError(`Description is required to publish the image: ${image.public_id}`);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const payload = {
        url: image.secure_url,
        publicId: image.public_id,
        type,
        description,
      };
      const response = await axios.post("http://localhost:5000/api/images/publish", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPublishedImages([...publishedImages, response.data]);
      setDescriptions((prev) => ({ ...prev, [image.public_id]: "" })); // Clear description
    } catch (err) {
      console.error("Error publishing image:", err);
      setError("Failed to publish image");
    }
  };

  const handleUnpublishImage = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/images/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPublishedImages(publishedImages.filter((img) => img.id !== id));
    } catch (err) {
      console.error("Error unpublishing image:", err);
      setError("Failed to unpublish image");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Image Management</h1>
        {error && (
          <p className="text-red-500 bg-red-100 p-3 rounded-lg">{error}</p>
        )}

        {/* Cloudinary Images */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cloudinary Images</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <div key={image.public_id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
              <img
                src={image.secure_url}
                alt="Preview"
                className="w-full h-48 object-cover rounded-md mb-2"
              />
              <p className="text-gray-600 mb-2 text-center">Name: {image.public_id}</p>
              <input
                type="text"
                placeholder="Enter description"
                value={descriptions[image.public_id] || ""}
                onChange={(e) => handleDescriptionChange(image.public_id, e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md mb-2"
              />
              <button
                onClick={() => handlePublishImage(image, "image")}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mb-2"
              >
                Publish as Regular
              </button>
              <button
                onClick={() => handlePublishImage(image, "feature-image")}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Publish as Featured
              </button>
            </div>
          ))}
        </div>

        {/* Published Images */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Published Images</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedImages.map((image) => (
            <div key={image.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
              <img
                src={image.url}
                alt="Preview"
                className="w-full h-48 object-cover rounded-md mb-2"
              />
              <p className="text-gray-600 mb-2 text-center">Description: {image.description}</p>
              <p className="text-gray-600 mb-2">Type: {image.type}</p>
              <button
                onClick={() => handleUnpublishImage(image.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Unpublish
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Images;
