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
        updatedPost,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPosts(posts.map((post) => (post.id === updatedPost.id ? response.data : post))); // Update the post in the list
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
    <div>
      <h1>Posts Management</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {editingPost && editingPost.id === post.id ? (
              // Edit Form
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const title = e.target.title.value;
                  const description = e.target.description.value;
                  const type = e.target.type.value;
                  const status = e.target.status.value;

                  updatePost({ ...editingPost, title, description, type, status });
                }}
              >
                <input type="text" name="title" defaultValue={post.title} required />
                <textarea name="description" defaultValue={post.description} required></textarea>
                <select name="type" defaultValue={post.type} required>
                  <option value="regular">Regular</option>
                  <option value="video">Video</option>
                  <option value="image">Image</option>
                  <option value="gig">Gig</option>
                </select>
                <select name="status" defaultValue={post.status} required>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingPost(null)}>
                  Cancel
                </button>
              </form>
            ) : (
              // Post Details
              <div>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <p>Type: {post.type}</p>
                <p>Status: {post.status}</p>
                <button onClick={() => setEditingPost(post)}>Edit</button>
                <button onClick={() => deletePost(post.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>

      <h2>Create a New Post</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const title = e.target.title.value;
          const description = e.target.description.value;
          const type = e.target.type.value;
          const status = e.target.status.value;

          if (title && description && type && status) {
            createPost({ title, description, type, status });
            e.target.reset();
          }
        }}
      >
        <input type="text" name="title" placeholder="Post Title" required />
        <textarea name="description" placeholder="Post Description" required></textarea>
        <select name="type" required>
          <option value="regular">Regular</option>
          <option value="video">Video</option>
          <option value="image">Image</option>
          <option value="gig">Gig</option>
        </select>
        <select name="status" required>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default Posts;
