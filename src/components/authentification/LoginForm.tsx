import React, { useState, useEffect } from "react";
import { useApi } from "../../hooks/useApi";

interface LoginFormProps {
  toggleForm: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ toggleForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data, error, isLoading, request } = useApi<{ message: string; user: any }>();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await request("post", "http://localhost:5000/api/v1/auth/login", { email, password });
      console.log("Utilisateur connecté :", data);
      window.location.href = "/explore";
    } catch (err) {
      console.error("Erreur lors de la connexion :", error);
    }
  };

  useEffect(() => {
    if (!(window as any).google || !(window as any).google.accounts) {
      console.error("Le script Google Sign-In n'est pas chargé.");
      return;
    }

    (window as any).google.accounts.id.initialize({
      client_id: "1004569696196-9bi6e054cctl0mk8orut7c89aqr8rqjn.apps.googleusercontent.com",
      callback: async (response: any) => {
        try {
          await request("post", "http://localhost:5000/api/v1/auth/google-login", { idToken: response.credential });
          console.log("Utilisateur connecté :", data);
        } catch (err) {
          console.error("Erreur lors de la connexion avec Google :", error);
        }
      },
    });

    (window as any).google.accounts.id.renderButton(
      document.getElementById("google-signin-button"),
      { theme: "outline", size: "large" }
    );
  }, []);

  return (
    <div className="form-container">
      <div className="form-header">
        <h3>CONNEXION</h3>
      </div>
      <div className="form-content">
        <form method="POST" onSubmit={handleLogin}>
          <div className="input-group">
            <label>Courriel</label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="johndoe@gmail.com"
            />
          </div>

          <div className="input-group">
            <label>Mot de passe</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
            />
          </div>

          {error && <p className="error-message-valdiation">{error}</p>}

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Connexion..." : "Connexion"}
          </button>
        </form>
      </div>
      <div className="form-footer">
        <div className="external-login-title">
          <h5>Services externes</h5>
        </div>
        <div className="link-holders">
          <div id="google-signin-button"></div> {/* Google Sign-In button */}
        </div>
        <div className="register-link">
          <h5>
            Vous n&apos;avez pas de compte ?{" "}
            <a className="invite" href="#" onClick={toggleForm}>
              Inscrivez-vous
            </a>
          </h5>
        </div>
      </div>
    </div>
  );
};