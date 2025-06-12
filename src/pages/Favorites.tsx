import {
  FavoritesEmpty,
  FavoritesError,
  FavoritesHeader,
  FavoritesList,
  FavoritesLoading,
  FavoritesStats,
  NotLoggedIn,
} from '../components/favorites';
import { useCurrentUser } from '../hooks/use-auth';
import { useFavoritesByUser } from '../hooks/use-favorites';

export const Favorites = () => {
  const { data: currentUser } = useCurrentUser();
  const {
    data: favorites,
    isLoading,
    error,
  } = useFavoritesByUser(currentUser?.id);

  if (!currentUser) {
    return <NotLoggedIn />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-[85vw] mx-auto px-4 sm:px-6 lg:px-8">
        <FavoritesHeader />

        {favorites && favorites.length > 0 && (
          <FavoritesStats favorites={favorites} />
        )}

        {isLoading ? (
          <FavoritesLoading />
        ) : error ? (
          <FavoritesError />
        ) : !favorites || favorites.length === 0 ? (
          <FavoritesEmpty />
        ) : (
          <FavoritesList favorites={favorites} />
        )}
      </div>
    </div>
  );
};
