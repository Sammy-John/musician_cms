import React, { useState } from "react";

const Videos = () => {
  // Placeholder video data
  const videoData = [
    {
      id: 1,
      title: "Video 1",
      src: "https://www.facebook.com/facebook/videos/10153231379946729/",
    },
    {
      id: 2,
      title: "Video 2",
      src: "https://www.facebook.com/facebook/videos/10153231379946729/",
    },
    {
      id: 3,
      title: "Video 3",
      src: "https://www.facebook.com/facebook/videos/10153231379946729/",
    },
    {
      id: 4,
      title: "Video 4",
      src: "https://www.facebook.com/facebook/videos/10153231379946729/",
    },
    {
      id: 5,
      title: "Video 5",
      src: "https://www.facebook.com/facebook/videos/10153231379946729/",
    },
    {
      id: 6,
      title: "Video 6",
      src: "https://www.facebook.com/facebook/videos/10153231379946729/",
    },
  ];

  // State for pop-out video
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const handleClose = () => {
    setSelectedVideo(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Videos</h1>
      {/* Video Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {videoData.map((video) => (
          <div
            key={video.id}
            style={{
              position: "relative",
              cursor: "pointer",
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "5px",
            }}
            onClick={() => handleVideoClick(video)}
          >
            {/* Video Thumbnail */}
            <div
              style={{
                height: "150px",
                background: "#000",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#fff",
              }}
            >
              Video Placeholder
            </div>
            {/* Title and Play Button */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <span>{video.title}</span>
              <button
                style={{
                  background: "blue",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
              >
                Play
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pop-Out Video */}
      {selectedVideo && (
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
          <div style={{ position: "relative", width: "80%", height: "80%" }}>
            <iframe
              src={selectedVideo.src}
              title={selectedVideo.title}
              style={{ width: "100%", height: "100%" }}
              allowFullScreen
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

export default Videos;
