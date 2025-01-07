import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Public-Facing Components
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import NewsPage from "./pages/NewsPage";
import Videos from "./components/Videos";
import Images from "./components/Images";
import ContactPage from "./pages/ContactPage";

// CMS Components
import Login from "./cms/Login";
import Dashboard from "./cms/pages/Dashboard";
import Posts from "./cms/Posts";
import Gigs from "./cms/Gigs";
import ImagesCMS from "./cms/Images";
import VideosCMS from "./cms/Videos";
import Contact from "./cms/Contact";
import Navbar from "./cms/components/Navbar";

function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Router>
      <div>
        {isLoggedIn && <Navbar />}
        <Routes>
          {/* Public-Facing Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/NewsPage" element={<NewsPage />} />
          <Route path="/Videos" element={<Videos />} />
          <Route path="/Images" element={<Images />} />
          <Route path="/ContactPage" element={<ContactPage />} />

          {/* CMS Routes */}
          <Route path="/cms/login" element={<Login />} />
          {isLoggedIn && (
            <>
              <Route path="/cms/pages/dashboard" element={<Dashboard />} />
              <Route path="/cms/posts" element={<Posts />} />
              <Route path="/cms/gigs" element={<Gigs />} />
              <Route path="/cms/images" element={<ImagesCMS />} />
              <Route path="/cms/videos" element={<VideosCMS />} />
              <Route path="/cms/contact" element={<Contact />} />
            </>
          )}
        </Routes>
        {!isLoggedIn && <Footer />}
      </div>
    </Router>
  );
}

export default App;
