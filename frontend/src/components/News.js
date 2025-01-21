import React, { useState, useEffect } from "react";
import axios from "axios";

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
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }

  return (
    <div className="relative flex h-72 border border-gray-300 overflow-hidden">
      {/* Debugging */}
      {slides.length === 0 && (
        <p className="text-gray-500 text-center mt-4">No slides to display.</p>
      )}

      {/* Slider Content */}
      <div className="relative flex-1 overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            transform: `translateY(-${currentSlide * 100}%)`,
            transition: isTransitioning ? "transform 0.5s ease-in-out" : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="h-72 flex flex-col justify-center items-center text-center p-4"
              style={{
                flex: "0 0 100%", // Ensure each slide takes up 100% of the container height
              }}
            >
              <h2 className="text-xl font-bold mb-2">{slide.title || "No Title"}</h2>
              <p className="text-gray-700 mb-4">{slide.description || "No description available."}</p>
              {slide.link && (
                <a
                  href={slide.link}
                  className="text-blue-500 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read More
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col justify-center items-center border-l border-gray-300 w-16">
        {/* Slide Indicator */}
        <div className="mb-4 text-sm">
          <span>
            {slides.length > 0 ? currentSlide + 1 : 0} / {slides.length}
          </span>
        </div>

        {/* Buttons */}
        <button
          onClick={handlePrev}
          className="mb-2 p-2 bg-gray-200 hover:bg-gray-300 rounded-full"
          disabled={slides.length <= 1}
        >
          &uarr;
        </button>
        <button
          onClick={handleNext}
          className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full"
          disabled={slides.length <= 1}
        >
          &darr;
        </button>
      </div>
    </div>
  );
};

export default News;
