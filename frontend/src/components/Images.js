import React, { useState } from "react";

const Images = () => {
  // Placeholder image data
  const imageData = [
    { id: 1, src: "https://via.placeholder.com/150", alt: "Image 1" },
    { id: 2, src: "https://via.placeholder.com/150", alt: "Image 2" },
    { id: 3, src: "https://via.placeholder.com/300x300", alt: "Featured Image 1" },
    { id: 4, src: "https://via.placeholder.com/300x300", alt: "Featured Image 2" },
    { id: 5, src: "https://via.placeholder.com/150", alt: "Image 3" },
    { id: 6, src: "https://via.placeholder.com/150", alt: "Image 4" },
  ];

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

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
        {/* First Column */}
        <div style={{ gridColumn: "1 / 2", gridRow: "1 / 3" }}>
          <div
            style={{ marginBottom: "5px", position: "relative" }}
            onClick={() => handleImageClick(imageData[0])}
          >
            <img
              src={imageData[0].src}
              alt={imageData[0].alt}
              style={{ width: "100%", cursor: "pointer" }}
            />
          </div>
          <div style={{ position: "relative" }} onClick={() => handleImageClick(imageData[1])}>
            <img
              src={imageData[1].src}
              alt={imageData[1].alt}
              style={{ width: "100%", cursor: "pointer" }}
            />
          </div>
        </div>

        {/* Featured Image 1 */}
        <div
          style={{
            gridColumn: "2 / 4",
            gridRow: "1 / 3",
            position: "relative",
          }}
          onClick={() => handleImageClick(imageData[2])}
        >
          <img
            src={imageData[2].src}
            alt={imageData[2].alt}
            style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "pointer" }}
          />
        </div>

        {/* Featured Image 2 */}
        <div
          style={{
            gridColumn: "4 / 6",
            gridRow: "1 / 3",
            position: "relative",
          }}
          onClick={() => handleImageClick(imageData[3])}
        >
          <img
            src={imageData[3].src}
            alt={imageData[3].alt}
            style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "pointer" }}
          />
        </div>

        {/* Last Column */}
        <div style={{ gridColumn: "6 / 7", gridRow: "1 / 3" }}>
          <div
            style={{ marginBottom: "5px", position: "relative" }}
            onClick={() => handleImageClick(imageData[4])}
          >
            <img
              src={imageData[4].src}
              alt={imageData[4].alt}
              style={{ width: "100%", cursor: "pointer" }}
            />
          </div>
          <div style={{ position: "relative" }} onClick={() => handleImageClick(imageData[5])}>
            <img
              src={imageData[5].src}
              alt={imageData[5].alt}
              style={{ width: "100%", cursor: "pointer" }}
            />
          </div>
        </div>
      </div>

      {/* Pop-Out View */}
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
              src={selectedImage.src}
              alt={selectedImage.alt}
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

export default Images;
