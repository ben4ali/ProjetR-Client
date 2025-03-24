import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
}

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token récupéré :", token);
    
    if (token && token.split(".").length === 3) {
      try {
        setIsLoggedIn(true);
        const decodedUser = jwtDecode<User>(token);
        setUser(decodedUser);
      } catch (error) {
        console.error("Erreur lors du décodage du token :", error);
        setIsLoggedIn(false);
        setUser(null);
      }
    } else {
      console.warn("Token invalide ou manquant.");
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/authentification";
    setIsLoggedIn(false);
    setUser(null);
  };

  return { isLoggedIn, user, logout };
};