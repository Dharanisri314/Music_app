

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AdminUpload from "./pages/AdminUpload";
import Homepage from "./pages/Homepage";
import SongDetails from "./pages/SongDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} /> {/* Show Homepage on first load */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminUpload />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/song/:songId" element={<SongDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
