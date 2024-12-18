import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

// Import Pages
import Home from "./pages/Home";
import NewsList from "./pages/NewsList";
import NewsItemPage from "./pages/NewsItemPage";
import Music from "./pages/Music";
import Videos from "./pages/Videos";
import Images from "./pages/Images";
import Contact from "./pages/Contact";


// Import Layout Components
import Header from "./components/Header"
import Footer from "./components/Footer"

function App() {
  return (
    <Router>
    <div className="App">
        {/* Header */}
      <Header />

      {/* Page Routes */}
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<NewsList />} />
          <Route path="/news/:id" element={<NewsItemPage />} />
          <Route path="/music" element={<Music />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/images" element={<Images />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        {/* Footer */}
        <Footer />
    </div>
    </Router>
  );
}

export default App;
