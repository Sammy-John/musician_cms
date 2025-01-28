import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/public/components/images.css"; // Import the dedicated CSS file

const SiteImages = () => {
  const [featuredImages, setFeaturedImages] = useState([]);
  const [regularImages, setRegularImages] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  const imagesPerPage = 12; // Number of images per page for all-images

  useEffect(() => {
    fetchPublishedImages();
    fetchAllImages();
  }, []);

  const fetchPublishedImages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/images");
      const publishedImages = response.data;

      const featured = publishedImages.filter((image) => image.type === "feature-image");
      const regular = publishedImages.filter((image) => image.type === "image");

      setFeaturedImages(featured);
      setRegularImages(regular);
    } catch (err) {
      console.error("Error fetching published images:", err);
      setError("Failed to load images.");
    }
  };

  const fetchAllImages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/images/cloudinary");
      setAllImages(response.data); // Use the Cloudinary data directly
    } catch (err) {
      console.error("Error fetching all images from Cloudinary:", err);
      setError("Failed to load all images.");
    }
  };
  

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  // Placeholder for `images-grid`
  const gridPlaceholders = [
    { id: "placeholder1", url: "https://picsum.photos/150", description: "Placeholder 1" },
    { id: "placeholder2", url: "https://picsum.photos/300", description: "Placeholder 2" },
  ];

  const displayedFeaturedImages = [...featuredImages];
  while (displayedFeaturedImages.length < 2) {
    displayedFeaturedImages.push({
      ...gridPlaceholders[displayedFeaturedImages.length % gridPlaceholders.length],
      id: `placeholder-featured-${displayedFeaturedImages.length}`,
    });
  }

  const displayedRegularImages = [...regularImages];
  while (displayedRegularImages.length < 4) {
    displayedRegularImages.push({
      ...gridPlaceholders[displayedRegularImages.length % gridPlaceholders.length],
      id: `placeholder-regular-${displayedRegularImages.length}`,
    });
  }

  // Placeholder logic for `all-images-grid`
  const paginatedImages = allImages.slice(
    (currentPage - 1) * imagesPerPage,
    currentPage * imagesPerPage
  );

  const displayedPaginatedImages = [...paginatedImages];
  while (displayedPaginatedImages.length < imagesPerPage) {
    displayedPaginatedImages.push({ id: `placeholder-${displayedPaginatedImages.length}`, url: null });
  }

  return (
    <div className="images-container">
      <h2 className="images-title">Photos</h2>
      <div className="images-grid">
        {/* Original images-grid */}
        <div className="images-regular images-left">
          {displayedRegularImages.slice(0, 2).map((image) => (
            <div
              key={image.id}
              className="image-wrapper"
              onClick={() => handleImageClick(image)}
            >
              <img src={image.url} alt={image.description} className="image" />
            </div>
          ))}
        </div>

        <div
          className="images-featured images-featured-left"
          onClick={() => handleImageClick(displayedFeaturedImages[0])}
        >
          <img
            src={displayedFeaturedImages[0]?.url || ""}
            alt={displayedFeaturedImages[0]?.description || "Placeholder"}
            className="image featured"
          />
        </div>

        <div
          className="images-featured images-featured-right"
          onClick={() => handleImageClick(displayedFeaturedImages[1])}
        >
          <img
            src={displayedFeaturedImages[1]?.url || ""}
            alt={displayedFeaturedImages[1]?.description || "Placeholder"}
            className="image featured"
          />
        </div>

        <div className="images-regular images-right">
          {displayedRegularImages.slice(2, 4).map((image) => (
            <div
              key={image.id}
              className="image-wrapper"
              onClick={() => handleImageClick(image)}
            >
              <img src={image.url} alt={image.description} className="image" />
            </div>
          ))}
        </div>
      </div>

      {/* New all-images section */}
      <div className="all-images-container">
        <h3 className="all-images-title">All Photos</h3>
        <div className="all-images-grid">
          {displayedPaginatedImages.map((image, index) => (
            <div
              key={index}
              className="all-images-wrapper"
              onClick={image.url ? () => handleImageClick(image) : null}
            >
              {image.url ? (
                <img src={image.url} alt="Image" className="all-images-image" />
              ) : (
                <div className="all-images-placeholder"></div>
              )}
            </div>
          ))}
        </div>

        {allImages.length > imagesPerPage && (
          <div className="all-images-pagination">
            {Array.from({ length: Math.ceil(allImages.length / imagesPerPage) }).map((_, index) => (
              <button
                key={index}
                className={`pagination-button ${currentPage === index + 1 ? "active" : ""}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedImage && (
        <div className="modal">
          <div className="modal-content">
            <img
              src={selectedImage.url}
              alt={selectedImage.description}
              className="modal-image"
            />
            <button onClick={handleClose} className="modal-close-button">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SiteImages;
