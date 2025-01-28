import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/public/components/newsitempage.css"; // Import CSS

const NewsItemPage = () => {
  const { id } = useParams(); // Get the post ID from the route parameters
  const [newsItem, setNewsItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsItem = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/public-posts/${id}`);
        setNewsItem(response.data);
      } catch (err) {
        console.error("Error fetching news item:", err);
        setError("Failed to fetch the news item.");
      }
    };

    fetchNewsItem();
  }, [id]);

  if (error) {
    return (
      <div>
        <p className="news-error">{error}</p>
      </div>
    );
  }

  if (!newsItem) {
    return (
      <div>
        <p className="news-loading">Loading news item...</p>
      </div>
    );
  }

  return (
    <div className="news-item-container">
      <div className="news-item-page">
        {/* Image Section */}
        <div className="news-item-image-container">
          <img
            src={newsItem.image || "https://picsum.photos/400"}
            alt={newsItem.title || "News Item"}
            className="news-item-image"
          />
        </div>

        {/* Article Section */}
        <article className="news-item-article">
          <div className="news-item-date">
            <i className="calendar-icon" /> {new Date(newsItem.createdAt).toLocaleString('default', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>
          <h2 className="news-item-title">{newsItem.title}</h2>
          <p className="news-item-content">{newsItem.content}</p>
        </article>
      </div>
    </div>
  );
};

export default NewsItemPage;
