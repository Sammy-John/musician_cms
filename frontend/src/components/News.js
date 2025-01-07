import React, { useState, useEffect } from "react";

const News = () => {
  const slides = [
    { heading: "News 1", text: "This is the first news item.", link: "#" },
    { heading: "News 2", text: "This is the second news item.", link: "#" },
    { heading: "News 3", text: "This is the third news item.", link: "#" },
    { heading: "News 4", text: "This is the fourth news item.", link: "#" },
  ];

  // Add cloned slides
  const extendedSlides = [
    slides[slides.length - 1], // Clone of the last slide
    ...slides,
    slides[0], // Clone of the first slide
  ];

  const [currentSlide, setCurrentSlide] = useState(1); // Start at the first real slide
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-scroll timer
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [currentSlide]);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev - 1);
  };

  // Handle transition end for seamless looping
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentSlide === 0) {
      setCurrentSlide(slides.length); // Jump to the last real slide
    } else if (currentSlide === slides.length + 1) {
      setCurrentSlide(1); // Jump to the first real slide
    }
  };

  return (
    <div style={{ display: "flex", height: "300px", border: "1px solid #ccc", overflow: "hidden" }}>
      {/* Slider Content */}
      <div
        style={{
          flex: 3,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: `-${currentSlide * 100}%`,
            transition: isTransitioning ? "top 0.5s ease-in-out" : "none",
            width: "100%",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedSlides.map((slide, index) => (
            <div
              key={index}
              style={{
                height: "300px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
                boxSizing: "border-box",
              }}
            >
              <h2 style={{ margin: "10px 0" }}>{slide.heading}</h2>
              <p style={{ margin: "10px 0" }}>{slide.text}</p>
              <a href={slide.link} style={{ textDecoration: "none", color: "blue" }}>
                Read More
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderLeft: "1px solid #ccc",
        }}
      >
        {/* Slide Identifier */}
        <div style={{ marginBottom: "20px" }}>
          <span>
            {currentSlide === 0
              ? slides.length
              : currentSlide === slides.length + 1
              ? 1
              : currentSlide}{" "}
            / {slides.length}
          </span>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <button onClick={handlePrev}>&uarr;</button>
          <button onClick={handleNext}>&darr;</button>
        </div>
      </div>
    </div>
  );
};

export default News;
