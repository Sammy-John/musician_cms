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
      const response = await axios.post(
        "http://localhost:5000/api/videos",
        newVideo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setVideos([...videos, response.data]);
    } catch (err) {
      console.error("Error creating video:", err.message);
      setError("Failed to create video");
    }
  };

  const updateVideo = async (id, updatedVideo) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/api/videos/${id}`,
        updatedVideo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setVideos(
        videos.map((video) => (video.id === id ? response.data : video))
      );
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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Videos Management
        </h1>
        {error && (
          <p className="text-red-500 bg-red-100 p-3 rounded-lg">{error}</p>
        )}

        {/* Video List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
            >
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
                  className="w-full"
                >
                  <input
                    type="text"
                    name="url"
                    defaultValue={video.url}
                    placeholder="Video URL"
                    className="w-full border border-gray-300 p-2 rounded-md mb-2"
                    required
                  />
                  <input
                    type="text"
                    name="title"
                    defaultValue={video.title}
                    placeholder="Video Title"
                    className="w-full border border-gray-300 p-2 rounded-md mb-2"
                    required
                  />
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingVideo(null)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-gray-700 mb-2">
                    {video.title}
                  </h3>
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline mb-2"
                  >
                    {video.url}
                  </a>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setEditingVideo(video.id)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteVideo(video.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Add New Video */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Video</h2>
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
            className="space-y-4"
          >
            <input
              type="text"
              name="url"
              placeholder="Video URL"
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
            <input
              type="text"
              name="title"
              placeholder="Video Title"
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add Video
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Videos;
