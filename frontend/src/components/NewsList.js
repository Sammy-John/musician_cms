import React, { useState, useEffect } from "react";
import axios from "axios";

const NewsList = () => {
  const [newsPosts, setNewsPosts] = useState([]); // Store fetched posts
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [postsPerPage] = useState(5); // Posts per page
  const [error, setError] = useState(null); // Error handling

  // Fetch news posts from the API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/public-posts");
        console.log("Fetched news posts:", response.data); // Debugging
        setNewsPosts(response.data);
      } catch (err) {
        console.error("Error fetching news posts:", err.message);
        setError("Failed to fetch news posts. Please try again later.");
      }
    };

    fetchNews();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(newsPosts.length / postsPerPage);
  const currentPosts = newsPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>; // Display error message
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>News</h1>
      {/* Render Current Posts */}
      {currentPosts.map((post) => (
        <div
          key={post.id}
          style={{
            display: "flex",
            marginBottom: "20px",
            borderBottom: "1px solid #ccc",
            paddingBottom: "10px",
          }}
        >
          <div style={{ flex: 1, marginRight: "20px" }}>
            <img
              src={post.image || "https://via.placeholder.com/150"}
              alt={post.title || "No Title"}
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ flex: 2 }}>
            <span style={{ display: "block", color: "gray", marginBottom: "10px" }}>
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
            <h2 style={{ margin: "10px 0" }}>{post.title || "No Title"}</h2>
            <p style={{ margin: "10px 0" }}>
              {post.description || "No description available."}
            </p>
            {post.link && (
              <a
                href={post.link}
                style={{ textDecoration: "none", color: "blue" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read More
              </a>
            )}
          </div>
        </div>
      ))}

      {/* Pagination Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        {/* Page Numbers */}
        <div>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageClick(i + 1)}
              style={{
                padding: "5px 10px",
                marginRight: "5px",
                backgroundColor: currentPage === i + 1 ? "#ccc" : "#fff",
                border: "1px solid #ccc",
                cursor: "pointer",
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNextPage}
          style={{
            padding: "5px 10px",
            backgroundColor: currentPage < totalPages ? "#fff" : "#eee",
            color: currentPage < totalPages ? "#000" : "#888",
            border: "1px solid #ccc",
            cursor: currentPage < totalPages ? "pointer" : "not-allowed",
          }}
          disabled={currentPage >= totalPages}
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default NewsList;

