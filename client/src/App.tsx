import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Gallery from "./Pages/Gallery";
import Contact from "./Pages/Contact";
import Interior from "./Pages/Services/Interior";
import Exterior from "./Pages/Services/Exterior";
import FullServices from "./Pages/Services/FullServices";
import Login from "./Pages/Login";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-300">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services/interior/*" element={<Interior />} />
            <Route path="/services/exterior/*" element={<Exterior />} />
            <Route path="/services/full/*" element={<FullServices />} />
            <Route path="/login*" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
