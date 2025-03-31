import React, { useRef, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import { Authentification } from "./pages/Authentification";
import { Home } from "./pages/Home";
import { Explore } from "./pages/Explore";
import rosemontLogo from "./assets/logos/RosemontLogoBrute.png";
import { Profil } from "./pages/Profil";
import { Watch } from "./pages/Watch";
import { Publish } from "./pages/Publish";
import { useAuth } from "./hooks/useAuth";
import { useApi } from "./hooks/useApi";
import gsap from "gsap";

function Navbar() {

  const { isLoggedIn, user, logout } = useAuth();
  const { request } = useApi();
  const [userAvatar, setUserAvatar] = useState<string | null>(null); 
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUserAvatar = async () => {
      if (isLoggedIn && user?.id) {
        try {
          const response = await request("get", `http://localhost:5000/api/v1/users/${user.id}`);
          setUserAvatar(response.avatar || "https://robohash.org/default.png");
        } catch (error) {
          console.error("Failed to fetch user avatar:", error);
          setUserAvatar("https://robohash.org/default.png");
        }
      }
    };

    fetchUserAvatar();
  }, [isLoggedIn, user?.id]);

  const toggleDialog = () => {
    setIsDialogOpen((prev: unknown) => {
      if (!prev) {
        gsap.to(dialogRef.current, { opacity: 1, y: 0, duration: 0.3, display: "flex" });
      } else {
        gsap.to(dialogRef.current, { opacity: 0, y: -20, duration: 0.3, display: "none" });
      }
      return !prev;
    });
  };

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
          <Link to="/explore">Explore</Link>
        </li>
        <div className="search-holder">
          <i className="bi bi-search"></i>
          <input type="text" placeholder="Rechercher..." />
        </div>

        {isLoggedIn ? (
          <>
            <li>
              <div className="userLink loggedUser" onClick={toggleDialog}>
                <img
                  src={userAvatar || "https://robohash.org/default.png"}
                  alt="Avatar"
                  className="user-avatar"
                  crossOrigin="anonymous"
                />
                <div className="user-dialog" ref={dialogRef} style={{ display: "none", opacity: 0 }}>
                  <p>{user?.firstName} {user?.lastName}</p>
                  <div className="user-dialog-links">
                    <Link to={`/profil/${user?.id}`}>Profil</Link>
                    <Link to="/publish">Publier</Link>
                    <Link to="/authentification" onClick={logout}>Déconnexion</Link>
                  </div>
                </div>
              </div>
            </li>
          </>
        ) : (
          <li>
            <Link className="userLink" to="/authentification">
              <i className="bi bi-person-fill"></i>
            </Link>
          </li>
        )}
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
