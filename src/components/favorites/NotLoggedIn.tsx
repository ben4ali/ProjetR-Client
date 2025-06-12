import { Link } from 'react-router-dom';

export const NotLoggedIn = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <i className="bi bi-person-x text-6xl text-gray-300 mb-4"></i>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Connexion requise
        </h2>
        <p className="text-gray-600 mb-6">
          Vous devez être connecté pour voir vos favoris.
        </p>
        <Link
          to="/authentification"
          className="inline-flex items-center px-6 py-3 bg-[#444ea5] text-white font-medium rounded-lg hover:bg-[#3a4193] transition-colors"
        >
          Se connecter
        </Link>
      </div>
    </div>
  );
};
