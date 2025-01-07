import React, { useEffect, useState } from "react";
import axios from "axios";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [editingVideo, setEditingVideo] = useState(null);
  const [error, setError] = useState(null);

  // Fetch videos on component mount
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/videos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVideos(response.data);
    } catch (err) {
      console.error("Error fetching videos:", err.message);
      setError("Failed to fetch videos");
    }
  };

  const createVideo = async (newVideo) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:5000/api/videos", newVideo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVideos([...videos, response.data]);
    } catch (err) {
      console.error("Error creating video:", err.message);
      setError("Failed to create video");
    }
  };

  const updateVideo = async (id, updatedVideo) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`http://localhost:5000/api/videos/${id}`, updatedVideo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVideos(videos.map((video) => (video.id === id ? response.data : video)));
      setEditingVideo(null);
    } catch (err) {
      console.error("Error updating video:", err.message);
      setError("Failed to update video");
    }
  };

  const deleteVideo = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/videos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVideos(videos.filter((video) => video.id !== id));
    } catch (err) {
      console.error("Error deleting video:", err.message);
      setError("Failed to delete video");
    }
  };

  return (
    <div>
      <h1>Videos Management</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {videos.map((video) => (
          <li key={video.id}>
            {editingVideo === video.id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const url = e.target.url.value;
                  const title = e.target.title.value;
                  if (url && title) {
                    updateVideo(video.id, { url, title });
                  }
                }}
              >
                <input type="text" name="url" defaultValue={video.url} required />
                <input type="text" name="title" defaultValue={video.title} required />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingVideo(null)}>Cancel</button>
              </form>
            ) : (
              <div>
                <h3>{video.title}</h3>
                <p>{video.url}</p>
                <button onClick={() => setEditingVideo(video.id)}>Edit</button>
                <button onClick={() => deleteVideo(video.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const url = e.target.url.value;
          const title = e.target.title.value;
          if (url && title) {
            createVideo({ url, title });
            e.target.reset();
          }
        }}
      >
        <input type="text" name="url" placeholder="Video URL" required />
        <input type="text" name="title" placeholder="Video Title" required />
        <button type="submit">Add Video</button>
      </form>
    </div>
  );
};

export default Videos;
