import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("token"); // Clear token from localStorage
  navigate("/cms/login", { replace: true }); // Redirect to login
  window.location.reload(); // Optional: To reset any lingering state
};

  
  
  return (
    <nav>
      <ul style={{ display: "flex", gap: "10px", listStyle: "none" }}>
        <li>
          <NavLink
            to="/cms/pages/dashboard"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cms/posts"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Posts
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cms/gigs"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Gigs
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cms/images"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Images
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cms/videos"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Videos
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cms/contact"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Contact Submissions
          </NavLink>
        </li>
        <li>
          <button onClick={handleLogout} style={{ cursor: "pointer" }}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
