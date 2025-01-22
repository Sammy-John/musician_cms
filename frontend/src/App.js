import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import NewsPage from "./pages/NewsPage";
import Login from "./cms/Login";
import CMSLayout from "./cms/CMSLayout";
import Dashboard from "./cms/pages/Dashboard";
import Posts from "./cms/Posts";
import Gigs from "./cms/Gigs";
import Images from "./cms/Images"; // CMS image management
import Videos from "./cms/Videos";
import Contact from "./cms/Contact";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ImagesPage from "./pages/Images"; // Public image display
import NewsItemPage from "./pages/NewsItemPage";

// Import styles
import "./styles/cms/index.css"; // CMS-specific styles
import "./styles/public/index.css"; // Public site styles


function PublicLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

function useDynamicStylesheet() {
  const location = useLocation();

  useEffect(() => {
    let stylesheet;

    if (location.pathname.startsWith("/cms")) {
      // Load CMS styles
      stylesheet = document.createElement("link");
      stylesheet.rel = "stylesheet";
      stylesheet.href = "/styles/cms/index.css";
    } else {
      // Load Public styles
      stylesheet = document.createElement("link");
      stylesheet.rel = "stylesheet";
      stylesheet.href = "/styles/public/index.css";
    }

    document.head.appendChild(stylesheet);

    return () => {
      // Cleanup stylesheet when component unmounts or route changes
      if (stylesheet) {
        document.head.removeChild(stylesheet);
      }
    };
  }, [location.pathname]);
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isTokenValid = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const { exp } = JSON.parse(atob(token.split(".")[1]));
      return Date.now() < exp * 1000;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    setIsLoggedIn(isTokenValid());
  }, []);

  return (
    <Router>
      {/* Call useDynamicStylesheet inside Router */}
      <DynamicStylesheetProvider />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />
        <Route
          path="/news"
          element={
            <PublicLayout>
              <NewsPage />
            </PublicLayout>
          }
        />
        <Route path="/news/:id" element={<NewsItemPage />} />
      
        <Route
          path="/images"
          element={
            <PublicLayout>
              <ImagesPage />
            </PublicLayout>
          }
        />

        {/* Login Route */}
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
          <Route path="cms/*" element={<Navigate to="/cms/login" replace />} />
        )}
      </Routes>
    </Router>
  );
}

function DynamicStylesheetProvider() {
  useDynamicStylesheet();
  return null;
}

export default App;
