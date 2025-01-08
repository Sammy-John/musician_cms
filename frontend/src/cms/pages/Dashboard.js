import React from "react";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Welcome, Dan!
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Manage your website's content efficiently.
        </p>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Posts */}
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 text-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-2">Posts</h2>
            <p className="text-sm text-indigo-100 mb-4 text-center">
              Manage your blog posts and articles.
            </p>
            <NavLink
              to="/cms/posts"
              className="bg-white text-indigo-700 px-4 py-2 rounded-md font-semibold hover:bg-indigo-100 transition"
            >
              View Posts
            </NavLink>
          </div>

          {/* Gigs */}
          <div className="bg-gradient-to-br from-green-500 to-green-700 text-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-2">Gigs</h2>
            <p className="text-sm text-green-100 mb-4 text-center">
              Manage your event gigs and schedule.
            </p>
            <NavLink
              to="/cms/gigs"
              className="bg-white text-green-700 px-4 py-2 rounded-md font-semibold hover:bg-green-100 transition"
            >
              View Gigs
            </NavLink>
          </div>

          {/* Images */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-2">Images</h2>
            <p className="text-sm text-purple-100 mb-4 text-center">
              Upload and manage your images.
            </p>
            <NavLink
              to="/cms/images"
              className="bg-white text-purple-700 px-4 py-2 rounded-md font-semibold hover:bg-purple-100 transition"
            >
              Manage Images
            </NavLink>
          </div>

          {/* Videos */}
          <div className="bg-gradient-to-br from-red-500 to-red-700 text-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-2">Videos</h2>
            <p className="text-sm text-red-100 mb-4 text-center">
              Upload and manage your video content.
            </p>
            <NavLink
              to="/cms/videos"
              className="bg-white text-red-700 px-4 py-2 rounded-md font-semibold hover:bg-red-100 transition"
            >
              Manage Videos
            </NavLink>
          </div>

          {/* Contact Submissions */}
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-700 text-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-2">Contact Submissions</h2>
            <p className="text-sm text-yellow-100 mb-4 text-center">
              Review and manage contact form submissions.
            </p>
            <NavLink
              to="/cms/contact"
              className="bg-white text-yellow-700 px-4 py-2 rounded-md font-semibold hover:bg-yellow-100 transition"
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
