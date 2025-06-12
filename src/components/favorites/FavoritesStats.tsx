import { Favorite } from '../../types/Favorite';

interface FavoritesStatsProps {
  favorites: Favorite[];
}

export const FavoritesStats = ({ favorites }: FavoritesStatsProps) => {
  if (!favorites || favorites.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded shadow p-6 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#444ea5]">
              {favorites.length}
            </div>
            <div className="text-sm text-gray-600">
              Projet{favorites.length > 1 ? 's' : ''} favori
              {favorites.length > 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
