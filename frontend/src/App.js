import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Login from "./cms/Login";
import Dashboard from "./cms/pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect default route to /cms/login */}
        <Route path="/" element={<Navigate to="/cms/login" />} />
        <Route path="/cms/login" element={<Login />} />
        <Route path="/cms/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
