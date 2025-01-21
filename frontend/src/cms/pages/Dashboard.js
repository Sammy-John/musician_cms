import React from "react";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        {/* Heading */}
        <h1 className="dashboard-heading">Welcome, Dan!</h1>
        <p className="dashboard-subheading">
          Manage your website's content efficiently.
        </p>

        {/* Dashboard Cards */}
        <div className="dashboard-grid">
          {/* Posts */}
          <div className="dashboard-card card-indigo">
            <h2 className="dashboard-card-heading">Posts</h2>
            <p className="dashboard-card-description">
              Manage your blog posts and articles.
            </p>
            <NavLink
              to="/cms/posts"
              className={({ isActive }) =>
                `dashboard-button ${isActive ? "active-dashboard-button" : ""}`
              }
            >
              View Posts
            </NavLink>
          </div>

          {/* Gigs */}
          <div className="dashboard-card card-green">
            <h2 className="dashboard-card-heading">Gigs</h2>
            <p className="dashboard-card-description">
              Manage your event gigs and schedule.
            </p>
            <NavLink
              to="/cms/gigs"
              className={({ isActive }) =>
                `dashboard-button ${isActive ? "active-dashboard-button" : ""}`
              }
            >
              View Gigs
            </NavLink>
          </div>

          {/* Images */}
          <div className="dashboard-card card-purple">
            <h2 className="dashboard-card-heading">Images</h2>
            <p className="dashboard-card-description">
              Upload and manage your images.
            </p>
            <NavLink
              to="/cms/images"
              className={({ isActive }) =>
                `dashboard-button ${isActive ? "active-dashboard-button" : ""}`
              }
            >
              Manage Images
            </NavLink>
          </div>

          {/* Videos */}
          <div className="dashboard-card card-red">
            <h2 className="dashboard-card-heading">Videos</h2>
            <p className="dashboard-card-description">
              Upload and manage your video content.
            </p>
            <NavLink
              to="/cms/videos"
              className={({ isActive }) =>
                `dashboard-button ${isActive ? "active-dashboard-button" : ""}`
              }
            >
              Manage Videos
            </NavLink>
          </div>

          {/* Contact Submissions */}
          <div className="dashboard-card card-yellow">
            <h2 className="dashboard-card-heading">Contact Submissions</h2>
            <p className="dashboard-card-description">
              Review and manage contact form submissions.
            </p>
            <NavLink
              to="/cms/contact"
              className={({ isActive }) =>
                `dashboard-button ${isActive ? "active-dashboard-button" : ""}`
              }
            >
              View Submissions
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
