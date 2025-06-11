import { useRef, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import "./App.css";
import "./styles/portfolio-templates.css";
import { Authentification } from "./pages/Authentification";
import { Home } from "./pages/Home";
import { Explore } from "./pages/Explore";
import rosemontLogo from "./assets/logos/RosemontLogoBrute.png";
import { Profil } from "./pages/Profil";
import { Watch } from "./pages/Watch";
import { Publish } from "./pages/Publish";
import { isLoggedIn, useCurrentUser, logout } from "./hooks/use-auth";
import gsap from "gsap";
import { CreatePortfolio } from "./pages/CreatePortfolio";
import { PortfolioView } from "./pages/PortfolioView";
import { PortfolioEdit } from "./pages/PortfolioEdit";

function Navbar() {
  const loggedIn = isLoggedIn();
  const { data: user, isSuccess } = useCurrentUser();
  const [avatarTimestamp, setAvatarTimestamp] = useState(new Date().getTime());
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setIsDialogOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const prevAvatarRef = useRef<string | null>(null);

  useEffect(() => {
    if (isSuccess && user && user.avatar !== prevAvatarRef.current) {
      prevAvatarRef.current = user.avatar;
      setAvatarTimestamp(new Date().getTime());
      console.log("Avatar changed, updating timestamp:", new Date().getTime());
    }
  }, [user?.avatar, isSuccess]);

  const toggleDialog = () => {
    setIsDialogOpen((prev: unknown) => {
      if (!prev) {
        gsap.to(dialogRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          display: "flex",
        });
      } else {
        gsap.to(dialogRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          display: "none",
        });
      }
      return !prev;
    });
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/explore">
          <img src={rosemontLogo} alt="logo" />
          <p>Rosemont DevHub</p>
        </Link>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/explore">Explore</Link>
        </li>
        <div className="search-holder">
          <i className="bi bi-search"></i>
          <input type="text" placeholder="Rechercher..." />
        </div>

        {loggedIn ? (
          <>
            <li>
              <div className="userLink loggedUser" onClick={toggleDialog}>
                <img
                  src={`${
                    user?.avatar || "https://robohash.org/default.png"
                  }?t=${avatarTimestamp}`}
                  alt="Avatar"
                  className="user-avatar"
                  crossOrigin="anonymous"
                />
                <div
                  className="user-dialog"
                  ref={dialogRef}
                  style={{ display: "none", opacity: 0 }}
                >
                  <p>
                    {user?.firstName} {user?.lastName}
                  </p>
                  <div className="user-dialog-links">
                    <Link to={`/profil/${user?.id}`}>Profil</Link>
                    <Link to="/publish">Publier</Link>
                    <Link to="/authentification" onClick={logout}>
                      Déconnexion
                    </Link>
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

function AppContent() {
  const loggedIn = isLoggedIn();
  const location = useLocation();

  const shouldHideNavbar =
    location.pathname.startsWith("/portfolio/") &&
    !location.pathname.includes("/edit");

  return (
    <>
      {loggedIn && !shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/authentification" element={<Authentification />} />{" "}
        <Route path="/profil/:id" element={<Profil />} />
        <Route path="/watch/:id" element={<Watch />} />
        <Route path="/publish" element={<Publish />} />
        <Route path="/create-portfolio" element={<CreatePortfolio />} />
        <Route path="/portfolio/:id" element={<PortfolioView />} />
        <Route path="/portfolio/:id/edit" element={<PortfolioEdit />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
