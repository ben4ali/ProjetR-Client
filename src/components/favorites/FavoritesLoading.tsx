export const FavoritesLoading = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-[#444ea5]"></div>
        <p className="text-gray-600">Chargement de vos favoris...</p>
      </div>
    </div>
  );
};
