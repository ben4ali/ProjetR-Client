import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import { Navbar } from "./components/common/Header";
import { AuthProvider } from "./contexts/AuthContext";
import { isLoggedIn } from "./hooks/use-auth";
import { Authentification } from "./pages/Authentification";
import { CreatePortfolio } from "./pages/CreatePortfolio";
import { Explore } from "./pages/Explore";
import { Home } from "./pages/Home";
import { PortfolioEdit } from "./pages/PortfolioEdit";
import { PortfolioView } from "./pages/PortfolioView";
import { Profil } from "./pages/Profil";
import { Publish } from "./pages/Publish";
import { Watch } from "./pages/Watch";
import "./styles/portfolio-templates.css";

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
