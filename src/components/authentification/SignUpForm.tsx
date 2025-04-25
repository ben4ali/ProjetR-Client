import React, { useState } from "react";
import { useSignup } from "../../hooks/use-auth";
import { User } from "../../types/User";

interface SignupProps {
  toggleForm: () => void;
}

export const Signup: React.FC<SignupProps> = ({ toggleForm }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const signupMutation = useSignup();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error("Les mots de passe ne correspondent pas.");
      return;
    }
    signupMutation.mutate(
      { firstName, lastName, username, email, password },
      {
        onSuccess: (response) => {
          window.location.href = "/explore";
        },
        onError: (err: any) => {
          console.error("Erreur lors de l'inscription :", err);
        },
      }
    );
  };
  return (
    <div className="form-container signup">
      <div className="form-header">
        <h3>INSCRIPTION</h3>
      </div>
      <div className="form-content">
        <form method="POST" onSubmit={handleSignUp}>
          <div className="input-group duo">
            <div className="input-group">
              <label>Prénom</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Prénom"
              />
            </div>
            <div className="input-group">
              <label>Nom</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Nom"
              />
            </div>
          </div>
          <div className="input-group">
            <label>Pseudo</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Pseudo"
            />
          </div>
          <div className="input-group">
            <label>Courriel</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="johndoe@gmail.com"
            />
          </div>
          <div className="input-group">
            <label>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
            />
          </div>
          <div className="input-group">
            <label>Confirmer mot de passe</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmer votre mot de passe"
            />
          </div>
          {signupMutation.error && (
            <p className="error-message-valdiation">
              {(signupMutation.error as any)?.response?.data?.message ||
                "Erreur d'inscription"}
            </p>
          )}
          <div className="register-link">
            <h5>
              Vous avez déjà un compte ?{" "}
              <a className="invite" href="#" onClick={toggleForm}>
                Connectez-vous
              </a>
            </h5>
          </div>
          <button type="submit">S'inscrire</button>
        </form>
      </div>
    </div>
  );
};
