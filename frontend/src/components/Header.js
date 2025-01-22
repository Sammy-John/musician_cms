import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import "../styles/public/components/header.css"; // Import the dedicated header stylesheet

const Header = () => {
  return (
    <header className="header">
      <div className="header-title-wrapper">
        <h1>
          <Link to="/" className="header-title">
            Daniel Browne
          </Link>
        </h1>
      </div>
      <div className="header-content">
        {/* Social Media Icons */}
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
        </div>

        {/* Navigation Links */}
        <nav className="nav-links">
          <Link to="/news">News</Link>
          <Link to="/videos">Videos</Link>
          <Link to="/images">Images</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        {/* Empty Column for Layout */}
        <div className="spacer"></div>
      </div>
    </header>
  );
};

export default Header;


