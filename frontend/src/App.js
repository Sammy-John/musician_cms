import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import NewsPage from "./pages/NewsPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/NewsPage" element={<NewsPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
