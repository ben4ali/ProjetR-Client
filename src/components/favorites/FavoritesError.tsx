export const FavoritesError = () => {
  return (
    <div className="py-12 text-center">
      <i className="bi bi-exclamation-triangle mb-4 text-6xl text-red-400"></i>
      <h3 className="mb-2 text-xl font-semibold text-gray-900">
        Erreur de chargement
      </h3>
      <p className="mb-6 text-gray-600">
        Impossible de charger vos favoris. Veuillez réessayer.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="inline-flex items-center rounded-lg bg-[#444ea5] px-4 py-2 text-white transition-colors hover:bg-[#3a4193]"
      >
        <i className="bi bi-arrow-clockwise mr-2"></i>
        Réessayer
      </button>
    </div>
  );
};
