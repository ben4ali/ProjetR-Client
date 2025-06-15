import { Link } from "react-router-dom";

export const FavoritesEmpty = () => {
  return (
    <div className="py-16 text-center">
      <div className="mx-auto max-w-md">
        <i className="bi bi-heart mb-6 text-8xl text-gray-300"></i>
        <h3 className="mb-4 text-2xl font-semibold text-gray-900">
          Aucun favori pour le moment
        </h3>
        <p className="mb-8 text-gray-600">
          Découvrez des projets inspirants et ajoutez-les à vos favoris pour les
          retrouver facilement !
        </p>

        <div className="space-y-4">
          <Link
            to="/explore"
            className="inline-flex items-center rounded-lg bg-[#444ea5] px-6 py-3 font-medium text-white transition-colors hover:bg-[#3a4193]"
          >
            <i className="bi bi-search mr-2"></i>
            Explorer les projets
          </Link>

          <div className="text-sm text-gray-500">
            <i className="bi bi-lightbulb mr-1"></i>
            Astuce : Enregistrez les projets qui vous plaisent
          </div>
        </div>
      </div>
    </div>
  );
};
