import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Header = () => {
  return (
    <header style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <h1>Daniel Browne</h1>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Social Media Icons */}
        <div style={{ flex: 1, display: "flex", gap: "10px" }}>
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
        <nav style={{ flex: 2, textAlign: "center" }}>
          <Link to="/" style={{ margin: "0 10px" }}>Home</Link>
          <Link to="/news" style={{ margin: "0 10px" }}>News</Link>
          <Link to="/videos" style={{ margin: "0 10px" }}>Videos</Link>
          <Link to="/images" style={{ margin: "0 10px" }}>Images</Link>
          <Link to="/contact" style={{ margin: "0 10px" }}>Contact</Link>
        </nav>

        {/* Empty Column for Layout */}
        <div style={{ flex: 1 }}></div>
      </div>
    </header>
  );
};

export default Header;

