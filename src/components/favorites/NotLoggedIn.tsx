import { Link } from "react-router-dom";

export const NotLoggedIn = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <i className="bi bi-person-x mb-4 text-6xl text-gray-300"></i>
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          Connexion requise
        </h2>
        <p className="mb-6 text-gray-600">
          Vous devez être connecté pour voir vos favoris.
        </p>
        <Link
          to="/authentification"
          className="inline-flex items-center rounded-lg bg-[#444ea5] px-6 py-3 font-medium text-white transition-colors hover:bg-[#3a4193]"
        >
          Se connecter
        </Link>
      </div>
    </div>
  );
};
