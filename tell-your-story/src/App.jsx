import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import "./App.css";
import Homepage from "./assets/Pages/Homepage";
import Profilepage from "./assets/Pages/Profilepage";
import Questionpage from "./assets/Pages/Questionpage";
import Signuppage from "./assets/Pages/Signuppage";
import LogInPage from "./assets/Pages/Loginpage";
import AboutUsPage from "./assets/Pages/AboutUs";
import Footer from "./assets/Components/Footer";
import Navbar from "./assets/Components/Navbar";
import DetailDairypage from "./assets/Pages/DetailDairypage";

function App() {
  return (
    <div className="web-site">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/profile/:userID" element={<Profilepage />} />
        <Route path="/questions/:userID" element={<Questionpage />} />
        <Route path="/signup" element={<Signuppage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/profile/:userID/:dairyID" element={<DetailDairypage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
