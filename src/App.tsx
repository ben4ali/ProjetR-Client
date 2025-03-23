import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import { Authentification } from "./pages/Authentification";
import { Home } from "./pages/Home";
import { Explore } from "./pages/Explore";
import rosemontLogo from "./assets/logos/RosemontLogoBrute.png";
import { Profil } from "./pages/Profil";
import { Watch } from "./pages/Watch";
import { Publish } from "./pages/Publish";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
        <img src={rosemontLogo} alt="logo" />
        <p>Rosemont DevHub</p>
        </Link>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profil/2">Profil</Link>
        </li>
        <li>
          <Link to="/explore">Explore</Link>
        </li>
        <div className="search-holder">
          <i className="bi bi-search"></i>
          <input type="text" placeholder="Rechercher..." />
        </div>

        <li>
          <Link className="userLink" to="/authentification">
            <i className="bi bi-person-fill"></i>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/authentification" element={<Authentification />} />
        <Route path="/profil/:id" element={<Profil/>} />
        <Route path="/watch/:id" element={<Watch />} />
        <Route path="/publish" element={<Publish />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
