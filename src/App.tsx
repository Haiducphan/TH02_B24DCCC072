import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Bai1 from "./pages/Bai1";
import Bai2 from "./pages/Bai2";
import Bai3 from "./pages/Bai3";
import CountryDetail from "./pages/Bai1/CountryDetail";
import MovieDetail from "./pages/Bai3/MovieDetail";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="container" style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/bai1" replace />} />
          <Route path="/bai1" element={<Bai1 />} />
          <Route path="/bai1/:code" element={<CountryDetail />} />
          <Route path="/bai2" element={<Bai2 />} />
          <Route path="/bai3" element={<Bai3 />} />
          <Route path="/movie/:imdbID" element={<MovieDetail />} />
        </Routes>
      </div>
    </Router>
  );
}
