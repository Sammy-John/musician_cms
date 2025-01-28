import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    navigate("/cms/login"); // Redirect to login page
    setIsOpen(false); // Close the menu
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <h1 className="navbar-logo">CMS</h1>

        {/* Hamburger Menu for Mobile */}
        <button
          className="navbar-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">Toggle Menu</span>
          {/* Burger Menu */}
          <div
            className={`navbar-toggle-bar ${
              isOpen ? "navbar-toggle-bar-open" : ""
            }`}
          ></div>
          <div
            className={`navbar-toggle-bar ${
              isOpen ? "navbar-toggle-bar-hidden" : ""
            }`}
          ></div>
          <div
            className={`navbar-toggle-bar ${
              isOpen ? "navbar-toggle-bar-close" : ""
            }`}
          ></div>
        </button>

        {/* Navbar Links */}
        <ul
          className={`${
            isOpen ? "navbar-links-mobile" : "navbar-links"
          }`}
          onClick={() => setIsOpen(false)} // Close menu when a link is clicked
        >
          {/* Links */}
          <li>
            <NavLink
              to="/cms/pages/dashboard"
              className={({ isActive }) =>
                `navbar-link ${isActive ? "navbar-link-active" : ""}`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cms/posts"
              className={({ isActive }) =>
                `navbar-link ${isActive ? "navbar-link-active" : ""}`
              }
            >
              Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cms/gigs"
              className={({ isActive }) =>
                `navbar-link ${isActive ? "navbar-link-active" : ""}`
              }
            >
              Gigs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cms/images"
              className={({ isActive }) =>
                `navbar-link ${isActive ? "navbar-link-active" : ""}`
              }
            >
              Images
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cms/videos"
              className={({ isActive }) =>
                `navbar-link ${isActive ? "navbar-link-active" : ""}`
              }
            >
              Videos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cms/contact"
              className={({ isActive }) =>
                `navbar-link ${isActive ? "navbar-link-active" : ""}`
              }
            >
              Contact Submissions
            </NavLink>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="navbar-logout"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
