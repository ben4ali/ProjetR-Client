export const FavoritesError = () => {
  return (
    <div className="text-center py-12">
      <i className="bi bi-exclamation-triangle text-6xl text-red-400 mb-4"></i>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Erreur de chargement
      </h3>
      <p className="text-gray-600 mb-6">
        Impossible de charger vos favoris. Veuillez réessayer.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="inline-flex items-center px-4 py-2 bg-[#444ea5] text-white rounded-lg hover:bg-[#3a4193] transition-colors"
      >
        <i className="bi bi-arrow-clockwise mr-2"></i>
        Réessayer
      </button>
    </div>
  );
};
