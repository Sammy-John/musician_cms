import React, { useState, useEffect } from "react";
import axios from "axios";

const SiteImages = () => {
  const [featuredImages, setFeaturedImages] = useState([]);
  const [regularImages, setRegularImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPublishedImages();
  }, []);

  const fetchPublishedImages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/images");
      const publishedImages = response.data;

      console.log("Fetched Published Images:", publishedImages);

      const featured = publishedImages.filter((image) => image.type === "feature-image");
      const regular = publishedImages.filter((image) => image.type === "image");

      setFeaturedImages(featured);
      setRegularImages(regular);
    } catch (err) {
      console.error("Error fetching published images:", err);
      setError("Failed to load images.");
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const placeholders = [
    { id: "placeholder1", url: "https://via.placeholder.com/150", description: "Placeholder 1" },
    { id: "placeholder2", url: "https://via.placeholder.com/300x300", description: "Placeholder 2" },
  ];

  const displayedFeaturedImages = [...featuredImages];
  while (displayedFeaturedImages.length < 2) {
    displayedFeaturedImages.push({
      ...placeholders[1],
      id: `placeholder-featured-${displayedFeaturedImages.length}`,
    });
  }

  const displayedRegularImages = [...regularImages];
  while (displayedRegularImages.length < 4) {
    displayedRegularImages.push({
      ...placeholders[0],
      id: `placeholder-regular-${displayedRegularImages.length}`,
    });
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Photos</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(8, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gap: "5px",
          marginTop: "20px",
        }}
      >
        <div style={{ gridColumn: "1 / 2", gridRow: "1 / 3" }}>
          {displayedRegularImages.slice(0, 2).map((image) => (
            <div
              key={image.id}
              style={{ marginBottom: "5px", position: "relative" }}
              onClick={() => handleImageClick(image)}
            >
              <img
                src={image.url}
                alt={image.description}
                style={{ width: "100%", cursor: "pointer" }}
              />
            </div>
          ))}
        </div>

        <div
          style={{
            gridColumn: "2 / 4",
            gridRow: "1 / 3",
            position: "relative",
          }}
          onClick={() => handleImageClick(displayedFeaturedImages[0])}
        >
          <img
            src={displayedFeaturedImages[0].url}
            alt={displayedFeaturedImages[0].description}
            style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "pointer" }}
          />
        </div>

        <div
          style={{
            gridColumn: "4 / 6",
            gridRow: "1 / 3",
            position: "relative",
          }}
          onClick={() => handleImageClick(displayedFeaturedImages[1])}
        >
          <img
            src={displayedFeaturedImages[1].url}
            alt={displayedFeaturedImages[1].description}
            style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "pointer" }}
          />
        </div>

        <div style={{ gridColumn: "6 / 7", gridRow: "1 / 3" }}>
          {displayedRegularImages.slice(2, 4).map((image) => (
            <div
              key={image.id}
              style={{ marginBottom: "5px", position: "relative" }}
              onClick={() => handleImageClick(image)}
            >
              <img
                src={image.url}
                alt={image.description}
                style={{ width: "100%", cursor: "pointer" }}
              />
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div style={{ position: "relative", maxWidth: "90%", maxHeight: "90%" }}>
            <img
              src={selectedImage.url}
              alt={selectedImage.description}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
            <button
              onClick={handleClose}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "red",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SiteImages;
