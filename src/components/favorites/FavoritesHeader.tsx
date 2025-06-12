import { Link } from 'react-router-dom';

export const FavoritesHeader = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#444ea5] flex items-center">
            Mes Favoris
          </h1>
          <p className="text-gray-600 mt-2">
            Retrouvez tous vos projets favoris en un clin d'œil
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            to="/explore"
            className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <i className="bi bi-search mr-2"></i>
            Explorer
          </Link>
        </div>
      </div>
    </div>
  );
};
