import React, { useState, useEffect } from "react";
import axios from "axios";

const Images = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [editingImage, setEditingImage] = useState(null);

  // Fetch images on component mount
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/images", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setImages(response.data);
    } catch (err) {
      console.error("Error fetching images:", err);
      setError("Failed to fetch images");
    }
  };

  const createImage = async (newImage) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/images",
        newImage,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setImages([...images, response.data]);
    } catch (err) {
      console.error("Error creating image:", err);
      setError("Failed to create image");
    }
  };

  const deleteImage = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/images/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setImages(images.filter((image) => image.id !== id));
    } catch (err) {
      console.error("Error deleting image:", err);
      setError("Failed to delete image");
    }
  };

  const updateImage = async (id, updatedImage) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/api/images/${id}`,
        updatedImage,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setImages(
        images.map((image) => (image.id === id ? response.data : image))
      );
      setEditingImage(null);
    } catch (err) {
      console.error("Error updating image:", err);
      setError("Failed to update image");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Image Management</h1>
        {error && (
          <p className="text-red-500 bg-red-100 p-3 rounded-lg">{error}</p>
        )}

        {/* List Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <div
              key={image.id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
            >
              {editingImage === image.id ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const url = e.target.url.value;
                    const type = e.target.type.value;
                    if (url && type) {
                      updateImage(image.id, { url, type });
                    }
                  }}
                  className="w-full"
                >
                  <input
                    type="url"
                    name="url"
                    defaultValue={image.url}
                    placeholder="Image URL"
                    className="w-full border border-gray-300 p-2 rounded-md mb-2"
                    required
                  />
                  <select
                    name="type"
                    defaultValue={image.type}
                    className="w-full border border-gray-300 p-2 rounded-md mb-2"
                    required
                  >
                    <option value="image">Image</option>
                    <option value="feature-image">Feature Image</option>
                  </select>
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingImage(null)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <img
                    src={image.url}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-md mb-2"
                  />
                  <p className="text-gray-600 mb-2">Type: {image.type}</p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setEditingImage(image.id)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteImage(image.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Add New Image */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Image</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const url = e.target.url.value;
              const type = e.target.type.value;
              if (url && type) {
                createImage({ url, type });
                e.target.reset();
              }
            }}
            className="space-y-4"
          >
            <input
              type="url"
              name="url"
              placeholder="Image URL"
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
            <select
              name="type"
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            >
              <option value="">Select Type</option>
              <option value="image">Image</option>
              <option value="feature-image">Feature Image</option>
            </select>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add Image
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Images;
