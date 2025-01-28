import React from "react";
import News from "../components/News";
import Gigs from "../components/Gigs";

const Home = () => {
  return (
    <main className="main">
      <News />
      <Gigs />
    </main>
  );
};

export default Home;
