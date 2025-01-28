import React from "react";
import "../styles/public/components/footer.css"; // Import the footer CSS

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Links */}
        <div className="footer-links">
          <a href="/contact" className="footer-link">Contact</a>
          <a href="/terms" className="footer-link">Terms of Use</a>
          <a href="/privacy" className="footer-link">Privacy Policy</a>
        </div>

        {/* Copyright */}
        <div className="footer-copyright">
          <span>&copy; 2024 Daniel Browne. Built by Teknabu.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
