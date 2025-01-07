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
    <div>
      <h1>Images Management</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* List Images */}
      <ul>
        {images.map((image) => (
          <li key={image.id}>
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
              >
                <input
                  type="url"
                  name="url"
                  defaultValue={image.url}
                  placeholder="Image URL"
                  required
                />
                <select name="type" defaultValue={image.type} required>
                  <option value="image">Image</option>
                  <option value="feature-image">Feature Image</option>
                </select>
                <button type="submit">Save</button>
                <button
                  type="button"
                  onClick={() => setEditingImage(null)}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <img
                  src={image.url}
                  alt="Preview"
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
                <p>Type: {image.type}</p>
                <button onClick={() => setEditingImage(image.id)}>Edit</button>
                <button onClick={() => deleteImage(image.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Add New Image */}
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
      >
        <h2>Add New Image</h2>
        <input type="url" name="url" placeholder="Image URL" required />
        <select name="type" required>
          <option value="">Select Type</option>
          <option value="image">Image</option>
          <option value="feature-image">Feature Image</option>
        </select>
        <button type="submit">Add Image</button>
      </form>
    </div>
  );
};

export default Images;
