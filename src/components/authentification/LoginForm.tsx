import React from "react";
import { Link } from "react-router-dom";

interface LoginFormProps {
  toggleForm: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ toggleForm }) => {
  return (
    <div className="form-container">
      <div className="form-header">
        <h3>CONNEXION</h3>
      </div>
      <div className="form-content">
        <form>
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

          <Link className="invite" to="/">Mot de passe oublié ?</Link>

          <button type="submit">Connexion</button>
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
