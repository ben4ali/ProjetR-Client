import { Link } from "react-router-dom";

export const FavoritesHeader = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center text-3xl font-bold text-[#444ea5]">
            Mes Favoris
          </h1>
          <p className="mt-2 text-gray-600">
            Retrouvez tous vos projets favoris en un clin d'œil
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            to="/explore"
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
          >
            <i className="bi bi-search mr-2"></i>
            Explorer
          </Link>
        </div>
      </div>
    </div>
  );
};
