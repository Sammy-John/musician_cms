import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa"; // Calendar Icon
import "../styles/public/components/newslist.css"; // Import the dedicated stylesheet

const NewsList = () => {
  const [newsPosts, setNewsPosts] = useState([]); // Store fetched posts
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [postsPerPage] = useState(5); // Posts per page
  const [error, setError] = useState(null); // Error handling

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

  const formatDate = (dateString) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options).replace(",", " •");
  };

  if (error) {
    return <p className="newslist-error">{error}</p>;
  }

  return (
    <div className="newslist-container">
      <h1 className="newslist-title">News</h1>
      {currentPosts.map((post) => (
        <div key={post.id} className="newslist-post">
          <div className="newslist-image">
            <img
              src={post.image || "https://picsum.photos/300"}
              alt={post.title || "No Title"}
            />
          </div>
          <div className="newslist-content">
            <span className="newslist-date">
              <FaCalendarAlt className="calendar-icon" /> {formatDate(post.createdAt)}
            </span>
            <h2 className="newslist-post-title">{post.title || "No Title"}</h2>
            <p className="newslist-description">
              {post.description || "No description available."}
            </p>
            <Link to={`/news/${post.id}`} className="newslist-read-more">
              Read More
            </Link>
          </div>
        </div>
      ))}

      <div className="newslist-pagination">
        {/* Page Numbers - Centered */}
        <div className="newslist-pages">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageClick(i + 1)}
              className={`newslist-page-button ${
                currentPage === i + 1 ? "active" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Next Button - Aligned Right */}
        <button
          onClick={handleNextPage}
          className={`newslist-next-button ${
            currentPage >= totalPages ? "disabled" : ""
          }`}
          disabled={currentPage >= totalPages}
        >
          Next Page
          <span className="newslist-next-arrow">&rarr;</span>
        </button>
      </div>


    </div>
  );
};

export default NewsList;
