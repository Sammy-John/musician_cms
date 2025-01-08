import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const CMSLayout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet /> {/* All protected routes (e.g., Dashboard, Posts) will render here */}
      </main>
    </div>
  );
};

export default CMSLayout;
