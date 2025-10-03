import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Homepage from "./assets/Pages/Homepage";
import Profilepage from "./assets/Pages/Profilepage";
import Questionpage from "./assets/Pages/Questionpage";
import Signuppage from "./assets/Pages/Signuppage";
import LogInPage from "./assets/Pages/Loginpage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Profile" element={<Profilepage />} />
        <Route path="/questions" element={<Questionpage />} />
        <Route path="/signup" element={<Signuppage />} />
        <Route path="/login" element={<LogInPage />} />
      </Routes>
    </>
  );
}

export default App;
