import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./cms/Login";
import Dashboard from "./cms/pages/Dashboard";
import Posts from "./cms/Posts";
import Gigs from "./cms/Gigs";
import Images from "./cms/Images";
import Videos from "./cms/Videos";
import Contact from "./cms/Contact";
import Navbar from "./cms/components/Navbar";

function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Router>
      <div>
        {isLoggedIn && <Navbar />}
        <Routes>
          <Route path="/cms/login" element={<Login />} />
          <Route path="/cms/pages/dashboard" element={<Dashboard />} />
          <Route path="/cms/posts" element={<Posts />} />
          <Route path="/cms/gigs" element={<Gigs />} />
          <Route path="/cms/images" element={<Images />} />
          <Route path="/cms/videos" element={<Videos />} />
          <Route path="/cms/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
