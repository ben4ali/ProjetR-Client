import { Link } from 'react-router-dom';

export const FavoritesEmpty = () => {
  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        <i className="bi bi-heart text-8xl text-gray-300 mb-6"></i>
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          Aucun favori pour le moment
        </h3>
        <p className="text-gray-600 mb-8">
          Découvrez des projets inspirants et ajoutez-les à vos favoris pour les
          retrouver facilement !
        </p>

        <div className="space-y-4">
          <Link
            to="/explore"
            className="inline-flex items-center px-6 py-3 bg-[#444ea5] text-white font-medium rounded-lg hover:bg-[#3a4193] transition-colors"
          >
            <i className="bi bi-search mr-2"></i>
            Explorer les projets
          </Link>

          <div className="text-sm text-gray-500">
            <i className="bi bi-lightbulb mr-1"></i>
            Astuce : Cliquez sur le cœur des projets qui vous plaisent
          </div>
        </div>
      </div>
    </div>
  );
};
