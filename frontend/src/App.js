import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import NewsPage from "./pages/NewsPage";
import Videos from "./components/Videos";
import Images from "./components/Images";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/NewsPage" element={<NewsPage />} />
          <Route path="/Videos" element={<Videos />} />
          <Route path="/Images" element={<Images />} />
          <Route path="/ContactPage" element={<ContactPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
