import React from "react";

interface SignupProps {
  toggleForm: () => void;
}

export const Signup: React.FC<SignupProps> = ({ toggleForm }) => {
  return (
    <div className="form-container signup">
      <div className="form-header">
        <h3>INSCRIPTION</h3>
      </div>
      <div className="form-content">
        <form>
          <div className="input-group duo">
            <div className="input-group">
              <label>Prénom</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Prénom"
              />
            </div>
            <div className="input-group">
              <label>Nom</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Nom"
              />
            </div>
          </div>
          <div className="input-group">
            <label>Courriel</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="johndoe@gmail.com"
            />
          </div>

          <div className="input-group">
            <label>Mot de passe</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Mot de passe"
            />
          </div>

          <div className="input-group">
            <label>Confirmer mot de passe</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirmer votre mot de passe"
            />
          </div>

          <button type="submit">S&apos;inscrire</button>
        </form>
      </div>
      <div className="form-footer">
        <div className="external-login-title">
          <h5>Services externes</h5>
        </div>
        <div className="link-holders">
          <a href="#">
            <i className="bi bi-google"></i>
          </a>
          <a href="#">
            <i className="bi bi-github"></i>
          </a>
          <a href="#">
            <i className="bi bi-microsoft"></i>
          </a>
        </div>
        <div className="register-link">
          <h5>
            Vous avez déjà un compte ?{" "}
            <a href="#" onClick={toggleForm}>
              Connectez-vous
            </a>
          </h5>
        </div>
      </div>
    </div>
  );
};
