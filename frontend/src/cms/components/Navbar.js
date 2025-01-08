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
    <nav className="bg-primary text-white border-b shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center py-3">
        {/* Logo */}
        <h1 className="text-lg font-bold text-secondary-light tracking-wide">
          CMS
        </h1>

        {/* Hamburger Menu for Mobile */}
        <button
          className="text-neutral-light focus:outline-none md:hidden flex flex-col gap-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">Toggle Menu</span>
          {/* Burger Menu */}
          <div
            className={`h-1 w-6 bg-white transition-transform ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></div>
          <div
            className={`h-1 w-6 bg-white transition-opacity ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          ></div>
          <div
            className={`h-1 w-6 bg-white transition-transform ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></div>
        </button>

        {/* Navbar Links */}
        <ul
          className={`${
            isOpen
              ? "flex flex-col items-center justify-center h-screen bg-primary w-full absolute top-0 left-0 z-50"
              : "hidden"
          } md:flex md:items-center md:gap-6 md:space-y-0 space-y-4`}
          onClick={() => setIsOpen(false)} // Close menu when a link is clicked
        >
          {/* Links */}
          <li>
            <NavLink
              to="/cms/pages/dashboard"
              className="block py-2 px-4 text-white hover:bg-secondary-light rounded transition-colors text-center"
              activeClassName="bg-secondary text-white"
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cms/posts"
              className="block py-2 px-4 text-white hover:bg-secondary-light rounded transition-colors text-center"
              activeClassName="bg-secondary text-white"
            >
              Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cms/gigs"
              className="block py-2 px-4 text-white hover:bg-secondary-light rounded transition-colors text-center"
              activeClassName="bg-secondary text-white"
            >
              Gigs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cms/images"
              className="block py-2 px-4 text-white hover:bg-secondary-light rounded transition-colors text-center"
              activeClassName="bg-secondary text-white"
            >
              Images
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cms/videos"
              className="block py-2 px-4 text-white hover:bg-secondary-light rounded transition-colors text-center"
              activeClassName="bg-secondary text-white"
            >
              Videos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cms/contact"
              className="block py-2 px-4 text-white hover:bg-secondary-light rounded transition-colors text-center"
              activeClassName="bg-secondary text-white"
            >
              Contact Submissions
            </NavLink>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="block py-2 px-4 bg-accent-red text-white hover:bg-accent-cyan rounded transition-colors text-center"
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
