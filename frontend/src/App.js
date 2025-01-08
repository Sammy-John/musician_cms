import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./cms/Login";
import CMSLayout from "./cms/CMSLayout";
import Dashboard from "./cms/pages/Dashboard";
import Posts from "./cms/Posts";
import Gigs from "./cms/Gigs";
import Images from "./cms/Images";
import Videos from "./cms/Videos";
import Contact from "./cms/Contact";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to check token validity
  const isTokenValid = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const { exp } = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
      return Date.now() < exp * 1000; // Check if token is valid
    } catch (error) {
      return false; // Invalid token
    }
  };

  // Inactivity timeout
  useEffect(() => {
    let inactivityTimer;

    const handleActivity = () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);

      inactivityTimer = setTimeout(() => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        alert("You have been logged out due to inactivity.");
      }, 30 * 60 * 1000); // 30 minutes inactivity timeout
    };

    if (isLoggedIn) {
      window.addEventListener("mousemove", handleActivity);
      window.addEventListener("keydown", handleActivity);
      handleActivity(); // Start the timer
    }

    return () => {
      // Cleanup
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      if (inactivityTimer) clearTimeout(inactivityTimer);
    };
  }, [isLoggedIn]);

  // Validate token on app load
  useEffect(() => {
    setIsLoggedIn(isTokenValid());
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Login Route */}
        <Route path="/cms/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

        {/* Protected CMS Routes */}
        {isLoggedIn ? (
          <Route path="/cms" element={<CMSLayout />}>
            <Route path="pages/dashboard" element={<Dashboard />} />
            <Route path="posts" element={<Posts />} />
            <Route path="gigs" element={<Gigs />} />
            <Route path="images" element={<Images />} />
            <Route path="videos" element={<Videos />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/cms/pages/dashboard" replace />} />
          </Route>
        ) : (
          <>
            {/* Redirect unauthorized access to login */}
            <Route path="*" element={<Navigate to="/cms/login" replace />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
