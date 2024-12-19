import React from "react";

const Footer = () => {
  return (
    <footer style={{ padding: "10px 20px", borderTop: "1px solid #ccc", textAlign: "center", fontSize: "14px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Links */}
        <div style={{ display: "flex", gap: "15px" }}>
          <a href="/contact" style={{ textDecoration: "none", color: "inherit" }}>Contact</a>
          <a href="/terms" style={{ textDecoration: "none", color: "inherit" }}>Terms of Use</a>
          <a href="/privacy" style={{ textDecoration: "none", color: "inherit" }}>Privacy Policy</a>
        </div>

        {/* Copyright */}
        <div>
          <span>&copy; 2024 Daniel Browne. Built by Teknabu.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
