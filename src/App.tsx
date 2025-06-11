import { useRef, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
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
import { AuthProvider } from "./contexts/AuthContext";

function Navbar() {
  const loggedIn = isLoggedIn();
  const { data: user, isSuccess } = useCurrentUser();
  const [avatarTimestamp, setAvatarTimestamp] = useState(new Date().getTime());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const prevAvatarRef = useRef<string | null>(null);

  useEffect(() => {
    if (isSuccess && user && user.avatar !== prevAvatarRef.current) {
      prevAvatarRef.current = user.avatar;
      setAvatarTimestamp(new Date().getTime());
      console.log("Avatar changed, updating timestamp:", new Date().getTime());
    }
  }, [user?.avatar, isSuccess]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node) &&
        isDialogOpen
      ) {
        closeDialog();
      }
    };

    if (isDialogOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDialogOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isDialogOpen) {
        closeDialog();
      }
    };

    if (isDialogOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isDialogOpen]);

  const openDialog = () => {
    setIsDialogOpen(true);
    gsap.set(dialogRef.current, { display: "block" });
    gsap.fromTo(
      dialogRef.current,
      {
        opacity: 0,
        y: -10,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: "power2.out",
      },
    );
  };

  const closeDialog = () => {
    gsap.to(dialogRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.15,
      ease: "power2.in",
      onComplete: () => {
        gsap.set(dialogRef.current, { display: "none" });
        setIsDialogOpen(false);
      },
    });
  };

  const toggleDialog = () => {
    if (isDialogOpen) {
      closeDialog();
    } else {
      openDialog();
    }
  };

  return (
    <nav className="absolute z-50 w-full flex justify-between items-center px-[5%] text-gray-600/80 h-20">
      <div className="flex items-center gap-4">
        <Link to="/explore" className="flex items-center gap-4">
          <img src={rosemontLogo} alt="logo" className="h-10 opacity-80" />
          <p className="hidden lg:block text-gray-700 whitespace-nowrap">
            Rosemont DevHub
          </p>
        </Link>
      </div>

      <ul className="flex gap-12 w-3/4 items-center justify-end lg:gap-5 lg:w-[90%]">
        <li>
          <Link
            to="/explore"
            className="text-gray-600/70 no-underline transition-all duration-200 hover:text-black/90 lg:text-xl"
          >
            Explore
          </Link>
        </li>
        <div className="flex items-center gap-4 w-[30%] relative lg:hidden">
          <i className="bi bi-search absolute left-5 text-black/50"></i>
          <input
            type="text"
            placeholder="Rechercher..."
            className="rounded-full py-2 px-4 pl-12 w-full border border-black/20 outline-none text-black/75 bg-transparent transition-all duration-200 focus:border-black/50 focus:bg-black/5"
          />
        </div>

        {loggedIn ? (
          <>
            <li>
              <div
                className="relative h-10 w-10 text-2xl rounded-full transition-all duration-300 hover:h-[2.6rem] hover:w-[2.6rem] hover:bg-white/30 hover:shadow-lg hover:shadow-blue-200 cursor-pointer lg:text-base"
                onClick={toggleDialog}
                ref={userMenuRef}
              >
                <img
                  src={`${
                    user?.avatar || "https://robohash.org/default.png"
                  }?t=${avatarTimestamp}`}
                  alt="Avatar"
                  className={`h-10 w-10 rounded-full bg-white/15 border border-gray-600 object-cover cursor-pointer transition-all duration-200 ${
                    isDialogOpen
                      ? "ring-2 ring-blue-500 ring-offset-2 shadow-lg scale-105"
                      : "ring-2 ring-transparent hover:ring-gray-300"
                  }`}
                  crossOrigin="anonymous"
                  referrerPolicy="no-referrer"
                />
                <div ref={dialogRef} style={{ display: "none", opacity: 0 }}>
                  <div className="absolute top-full right-0 mt-2 w-56 bg-gradient-to-br from-white via-gray-50 to-blue-50 border border-gray-200/60 rounded-xl shadow-2xl backdrop-blur-sm z-50 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-3 text-white">
                      <p className="font-semibold text-sm leading-tight">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-blue-100 text-xs opacity-90 mt-1">
                        @{user?.username?.toLowerCase()}
                      </p>
                    </div>

                    <div className="p-1.5">
                      <Link
                        to={`/profil/${user?.id}`}
                        className="flex items-center px-3 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 rounded-lg transition-all duration-200 group"
                        onClick={closeDialog}
                      >
                        <i className="bi bi-person-circle text-sm mr-2.5 group-hover:scale-110 transition-transform"></i>
                        <span className="font-medium text-sm">Mon Profil</span>
                      </Link>

                      <Link
                        to="/publish"
                        className="flex items-center px-3 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:text-green-700 rounded-lg transition-all duration-200 group"
                        onClick={closeDialog}
                      >
                        <i className="bi bi-plus-circle-fill text-sm mr-2.5 group-hover:scale-110 transition-transform"></i>
                        <span className="font-medium text-sm">Publier</span>
                      </Link>

                      {/* Divider */}
                      <div className="my-1.5 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

                      <Link
                        to="/authentification"
                        onClick={() => {
                          logout();
                          closeDialog();
                        }}
                        className="flex items-center px-3 py-2 text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-700 rounded-lg transition-all duration-200 group"
                      >
                        <i className="bi bi-box-arrow-right text-sm mr-2.5 group-hover:scale-110 transition-transform"></i>
                        <span className="font-medium text-sm">Déconnexion</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </>
        ) : (
          <li>
            <Link
              className="h-10 w-10 text-2xl rounded-full relative hover:bg-white/30 transition-all duration-200 flex items-center justify-center lg:text-base"
              to="/authentification"
            >
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
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
