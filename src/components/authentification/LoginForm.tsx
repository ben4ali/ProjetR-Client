/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useLogin, useGoogleLogin } from "../../hooks/use-auth";

interface LoginFormProps {
  toggleForm: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ toggleForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLogin();
  const googleLoginMutation = useGoogleLogin();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (response) => {
          localStorage.setItem("token", response.token);
          window.location.href = "/explore";
        },
      }
    );
  };

  useEffect(() => {
    if (!(window as any).google || !(window as any).google.accounts) {
      console.error("Le script Google Sign-In n'est pas chargé.");
      return;
    }

    (window as any).google.accounts.id.initialize({
      client_id : import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: (response: any) => {
        googleLoginMutation.mutate(
          { idToken: response.credential },
          {
            onSuccess: (apiResponse) => {
              localStorage.setItem("token", apiResponse.token);
              window.location.href = "/explore";
            },
            onError: (err: any) => {
              console.error("Erreur lors de la connexion avec Google :", err);
            },
          }
        );
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

          {loginMutation.error && (
            <p className="error-message-valdiation">
              {(loginMutation.error as any)?.response?.data?.message ||
                "Erreur de connexion"}
            </p>
          )}

          <button type="submit">Connexion</button>
        </form>
      </div>
      <div className="form-footer">
        <div className="external-login-title">
          <h5>Services externes</h5>
        </div>
        <div className="link-holders">
          <div id="google-signin-button"></div>
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
