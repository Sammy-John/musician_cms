import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/cms/login");
  };

  return (
    <nav>
      <ul style={{ display: "flex", gap: "10px", listStyle: "none" }}>
        <li>
          <NavLink to="/cms/pages/dashboard" activeClassName="active">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/cms/posts" activeClassName="active">
            Posts
          </NavLink>
        </li>
        <li>
          <NavLink to="/cms/gigs" activeClassName="active">
            Gigs
          </NavLink>
        </li>
        <li>
          <NavLink to="/cms/images" activeClassName="active">
            Images
          </NavLink>
        </li>
        <li>
          <NavLink to="/cms/videos" activeClassName="active">
            Videos
          </NavLink>
        </li>
        <li>
          <NavLink to="/cms/contact" activeClassName="active">
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
