import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Homepage from "./assets/Pages/Homepage";
import Profilepage from "./assets/Pages/Profilepage";
import Questionpage from "./assets/Pages/Questionpage";
import Signuppage from "./assets/Pages/Signuppage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Profile" element={<Profilepage />} />
        <Route path="/questions" element={<Questionpage />} />
        <Route path="/signup" element={<Signuppage />} />
      </Routes>
    </>
  );
}

export default App;
