import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/public/components/news.css"; // Import the dedicated stylesheet

const News = () => {
  const [slides, setSlides] = useState([]); // Store fetched news data
  const [currentSlide, setCurrentSlide] = useState(0); // Start at the first slide
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [error, setError] = useState(null);

  // Fetch news on component mount
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/public-posts");
        console.log("Fetched news:", response.data); // Debugging log
        setSlides(response.data.slice(0, 4)); // Limit to 4 latest news items
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to fetch news");
      }
    };

    fetchNews();
  }, []);

  const handleNext = () => {
    if (isTransitioning || slides.length <= 1) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    if (isTransitioning || slides.length <= 1) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  if (error) {
    return <p className="news-error">{error}</p>;
  }

  return (
    <div className="news-container">
      {slides.length === 0 && <p className="news-empty">No slides to display.</p>}

      <div className="news-slider">
        <div
          className="news-slides"
          style={{
            transform: `translateY(-${currentSlide * 100}%)`,
            transition: isTransitioning ? "transform 0.5s ease-in-out" : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((slide, index) => (
            <div key={index} className="news-slide">
              <h2 className="news-title">{slide.title || "No Title"}</h2>
              <p className="news-description">{slide.summary || "No description available."}</p>
              <Link to={`/news/${slide.id}`} className="news-link">
                Read More
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="news-controls">
        <div className="news-indicator">
          <span>
            {slides.length > 0 ? currentSlide + 1 : 0} / {slides.length}
          </span>
        </div>
        <button
          onClick={handlePrev}
          className="news-button news-button-up"
          disabled={slides.length <= 1}
        >
          &uarr;
        </button>
        <button
          onClick={handleNext}
          className="news-button news-button-down"
          disabled={slides.length <= 1}
        >
          &darr;
        </button>
      </div>
    </div>
  );
};

export default News;
