import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header"; // Adjust the import path based on your folder structure

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
        <Header />
        <p className="news-error">{error}</p>
      </div>
    );
  }

  if (!newsItem) {
    return (
      <div>
        <Header />
        <p className="news-loading">Loading news item...</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="news-item-page">
        <h1 className="news-item-title">{newsItem.title}</h1>
        {newsItem.content && <div className="news-item-content">{newsItem.content}</div>}
        {newsItem.image && <img src={newsItem.image} alt={newsItem.title} className="news-item-image" />}
        <button
          className="news-back-button"
          onClick={() => window.history.back()}
        >
          Back to News
        </button>
      </div>
    </div>
  );
};

export default NewsItemPage;
