import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Population from "./components/population/Population";
import Activity from "./components/activity/Activity";
import Info from "./components/info/Info";
import Cryptocurrency from "./components/cryptocurrencies/Cryptocurrency";
import Navbar from "./components/navbar/Navbar"; // Assuming Navbar is your navigation component

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Population />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/info" element={<Info />} />
        <Route path="/cryptocurrency" element={<Cryptocurrency />} />
      </Routes>
    </Router>
  );
};

export default App;
