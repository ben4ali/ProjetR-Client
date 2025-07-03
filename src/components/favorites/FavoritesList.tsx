import { Favorite } from "../../types/Favorite";
import { FavoriteProjectCard } from "./FavoriteProjectCard";

interface FavoritesListProps {
  favorites: Favorite[];
}

export const FavoritesList = ({ favorites }: FavoritesListProps) => {
  return (
    <div className="flex flex-col gap-10">
      {favorites.map((favorite) => (
        <FavoriteProjectCard key={favorite.id} projectId={favorite.projectId} />
      ))}
    </div>
  );
};
