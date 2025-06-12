export const FavoritesLoading = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#444ea5] mx-auto mb-4"></div>
        <p className="text-gray-600">Chargement de vos favoris...</p>
      </div>
    </div>
  );
};
