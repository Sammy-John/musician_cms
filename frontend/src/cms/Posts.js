import React, { useEffect, useState } from "react";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [editingPost, setEditingPost] = useState(null); // State for the post being edited

  // Fetch all posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      const response = await axios.get("http://localhost:5000/api/posts", {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token for authentication
        },
      });
      setPosts(response.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to fetch posts");
    }
  };

  const createPost = async (newPost) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:5000/api/posts", newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts([...posts, response.data]); // Add the new post to the list
    } catch (err) {
      console.error("Error creating post:", err);
      setError("Failed to create post");
    }
  };

  const updatePost = async (updatedPost) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/api/posts/${updatedPost.id}`,
        updatedPost, // Make sure this contains `summary` and `content`
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPosts(posts.map((post) => (post.id === updatedPost.id ? response.data : post)));
      setEditingPost(null); // Reset editing state
    } catch (err) {
      console.error("Error updating post:", err);
      setError("Failed to update post");
    }
  };
  

  const deletePost = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(posts.filter((post) => post.id !== id)); // Update UI after deletion
    } catch (err) {
      console.error("Error deleting post:", err);
      setError("Failed to delete post");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Posts Management</h1>
        {error && (
          <p className="text-red-500 bg-red-100 p-3 rounded-lg">{error}</p>
        )}

        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post.id} className="bg-white p-4 rounded-lg shadow-md">
              {editingPost && editingPost.id === post.id ? (
                // Edit Form
                <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const title = e.target.title.value;
                  const summary = e.target.summary.value;
                  const description = e.target.description.value;
                  const content = e.target.content.value;
                  const type = e.target.type.value;
                  const status = e.target.status.value;
              
                  updatePost({
                    ...editingPost,
                    title,
                    summary,
                    description,
                    content,
                    type,
                    status,
                  });
                }}
                  className="space-y-4"
                >
                  <input
                    type="text"
                    name="title"
                    defaultValue={post.title}
                    required
                    className="w-full border border-gray-300 p-2 rounded-md"
                  />
                  <input
                    type="text"
                    name="summary"
                    defaultValue={post.summary}
                    required
                    className="w-full border border-gray-300 p-2 rounded-md"
                  />
                  <textarea
                    name="description"
                    defaultValue={post.description}
                    required
                    className="w-full border border-gray-300 p-2 rounded-md"
                  ></textarea>
                  <textarea
                    name="content"
                    defaultValue={post.content}
                    required
                    className="w-full border border-gray-300 p-2 rounded-md"
                  ></textarea>
                  <div className="flex space-x-4">
                    <select
                      name="type"
                      defaultValue={post.type}
                      required
                      className="w-full border border-gray-300 p-2 rounded-md"
                    >
                      <option value="regular">Regular</option>
                      <option value="video">Video</option>
                      <option value="image">Image</option>
                      <option value="gig">Gig</option>
                    </select>
                    <select
                      name="status"
                      defaultValue={post.status}
                      required
                      className="w-full border border-gray-300 p-2 rounded-md"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingPost(null)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                // Post Details
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{post.title}</h3>
                  <p className="text-gray-500">{post.summary}</p>
                  <p className="text-gray-600">{post.description}</p>
                  <p className="text-sm text-gray-500">
                    <span className="font-bold">Type:</span> {post.type} |{" "}
                    <span className="font-bold">Status:</span> {post.status}
                  </p>
                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={() => setEditingPost(post)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deletePost(post.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Posts;
