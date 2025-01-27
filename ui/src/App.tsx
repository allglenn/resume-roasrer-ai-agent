import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/HomePage/LandingPage";
import UploadPage from "./pages/UploadPage/UploadPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/upload" element={<UploadPage />} />
      </Routes>
    </Router>
  );
}

export default App;
