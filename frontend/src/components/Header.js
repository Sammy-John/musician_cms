import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <h1>Daniel Browne</h1>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Left Column: Social Media Icons */}
        <div style={{ flex: 1, display: "flex", gap: "10px" }}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={["fab", "facebook"]} size="2x" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={["fab", "twitter"]} size="2x" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={["fab", "instagram"]} size="2x" />
          </a>
        </div>

        {/* Center Column: Navigation Links */}
        <nav style={{ flex: 2, textAlign: "center" }}>
          <Link to="/" style={{ margin: "0 10px" }}>Home</Link>
        </nav>

        {/* Right Column: Empty */}
        <div style={{ flex: 1 }}></div>
      </div>
    </header>
  );
};
