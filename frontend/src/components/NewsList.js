import React, { useState } from "react";

const NewsList = () => {
  const newsPosts = [
    {
      id: 1,
      image: "https://via.placeholder.com/150",
      date: "12/15/2024",
      title: "Breaking News 1",
      description: "This is a brief description of news 1.",
      link: "#",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/150",
      date: "12/12/2024",
      title: "Breaking News 2",
      description: "This is a brief description of news 2.",
      link: "#",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/150",
      date: "12/10/2024",
      title: "Breaking News 3",
      description: "This is a brief description of news 3.",
      link: "#",
    },
    {
      id: 4,
      image: "https://via.placeholder.com/150",
      date: "12/05/2024",
      title: "Breaking News 4",
      description: "This is a brief description of news 4.",
      link: "#",
    },
    {
      id: 5,
      image: "https://via.placeholder.com/150",
      date: "12/01/2024",
      title: "Breaking News 5",
      description: "This is a brief description of news 5.",
      link: "#",
    },
    {
      id: 6,
      image: "https://via.placeholder.com/150",
      date: "11/25/2024",
      title: "Breaking News 6",
      description: "This is a brief description of news 6.",
      link: "#",
    },
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

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

  return (
    <div style={{ padding: "20px" }}>
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
            <img src={post.image} alt={post.title} style={{ width: "100%" }} />
          </div>
          <div style={{ flex: 2 }}>
            <span style={{ display: "block", color: "gray", marginBottom: "10px" }}>{post.date}</span>
            <h2 style={{ margin: "10px 0" }}>{post.title}</h2>
            <p style={{ margin: "10px 0" }}>{post.description}</p>
            <a href={post.link} style={{ textDecoration: "none", color: "blue" }}>
              Read More
            </a>
          </div>
        </div>
      ))}

      {/* Pagination Section */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>
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
