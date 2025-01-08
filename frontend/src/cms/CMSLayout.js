import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const CMSLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <main className="flex-grow p-4 md:p-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-4">
        &copy; {new Date().getFullYear()} CMS by [Your Name]
      </footer>
    </div>
  );
};

export default CMSLayout;
