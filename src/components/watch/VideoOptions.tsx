import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import default_avatar from '../../assets/images/default_profil.png';
import { isLoggedIn, useCurrentUser } from '../../hooks/use-auth';
import {
  useAddFavorite,
  useIsProjectFavoritedByUser,
  useRemoveFavorite,
} from '../../hooks/use-favorites';
import { useDislikeProject, useLikeProject } from '../../hooks/use-project';
import { useUserById } from '../../hooks/use-users';
import { Projet } from '../../types/Projet';

interface VideoOptionsProps {
  projet: Projet | null;
}

export const VideoOptions = ({ projet }: VideoOptionsProps) => {
  const loggedIn = isLoggedIn();
  const { data: currentUser } = useCurrentUser();
  const [isCopied, setIsCopied] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const {
    data: author,
    isLoading: authorLoading,
    error: authorError,
  } = useUserById(projet?.author?.id);

  const likeProjectMutation = useLikeProject();
  const dislikeProjectMutation = useDislikeProject();

  // Hooks pour les favoris
  const addFavoriteMutation = useAddFavorite();
  const removeFavoriteMutation = useRemoveFavorite();
  const { data: isFavorited, isLoading: isFavoritedLoading } =
    useIsProjectFavoritedByUser(projet?.id);

  const date = projet?.createdAt
    ? new Intl.DateTimeFormat('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(new Date(projet.createdAt))
    : '';

  // Like / dislike
  const toggleLike = () => {
    if (!projet?.id || !loggedIn) return;

    const likedProjects = JSON.parse(
      localStorage.getItem('liked_projects') || '[]'
    );
    const already = likedProjects.includes(projet.id);

    if (already) {
      dislikeProjectMutation.mutate(projet.id, {
        onSuccess: () => {
          localStorage.setItem(
            'liked_projects',
            JSON.stringify(
              likedProjects.filter((id: number) => id !== projet.id)
            )
          );
          setIsLiked(false);
          if (projet.likes !== undefined) projet.likes -= 1;
        },
      });
    } else {
      likeProjectMutation.mutate(projet.id, {
        onSuccess: () => {
          likedProjects.push(projet.id);
          localStorage.setItem('liked_projects', JSON.stringify(likedProjects));
          setIsLiked(true);
          if (projet.likes !== undefined) projet.likes += 1;
        },
      });
    }
  };

  // Share
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  // Gestion des favoris
  const handleToggleFavorite = () => {
    if (!projet?.id || !loggedIn || !currentUser) return;

    if (isFavorited) {
      removeFavoriteMutation.mutate(projet.id);
    } else {
      addFavoriteMutation.mutate(projet.id);
    }
  };

  useEffect(() => {
    if (projet?.id) {
      const likedProjects = JSON.parse(
        localStorage.getItem('liked_projects') || '[]'
      );
      setIsLiked(likedProjects.includes(projet.id));
    }
  }, [projet?.id]);

  return (
    <div
      className="video-options flex flex-col gap-4 w-full pb-8 border-b border-black/10
                     lg:flex-row lg:justify-between mt-4"
    >
      {/* Auteur */}
      <div className="author-holder flex items-center gap-4">
        {authorLoading ? (
          <span>Chargement…</span>
        ) : authorError ? (
          <span>Erreur auteur</span>
        ) : (
          <>
            <Link to={`/profil/${author?.id}`}>
              <img
                src={author?.avatar || default_avatar}
                alt="author"
                crossOrigin="anonymous"
                className="h-12 w-12 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
            </Link>
            <div className="author-info leading-tight">
              <h3 className="text-[1.3rem] font-medium text-neutral-900">
                {author?.firstName} {author?.lastName}
              </h3>
              <p className="text-sm text-gray-600">Publié le {date}</p>
            </div>
          </>
        )}
      </div>

      {/* Boutons */}
      <div className="video-interaction flex flex-wrap gap-4">
        <button
          onClick={toggleLike}
          disabled={
            likeProjectMutation.isPending || dislikeProjectMutation.isPending
          }
          className={`like flex items-center gap-2 h-10 px-5 py-1 rounded-lg border border-black/5
                      bg-black/5 hover:bg-black/10 transition
                      ${
                        loggedIn && isLiked
                          ? 'interaction-active text-pink-600 bg-red-200/50 border-red-600/50 hover:text-pink-800'
                          : ''
                      }`}
        >
          <i className="bi bi-hand-thumbs-up" />
          <p className="hidden lg:block">{projet?.likes} J&apos;aime</p>
        </button>

        <button
          onClick={handleShare}
          className="share flex items-center gap-2 h-10 px-5 py-1 rounded-lg border border-black/5
                     bg-black/5 hover:bg-black/10 transition"
        >
          <i className="bi bi-reply" />
          <p className="hidden lg:block">Partager</p>
        </button>

        <button
          onClick={handleToggleFavorite}
          disabled={
            addFavoriteMutation.isPending ||
            removeFavoriteMutation.isPending ||
            isFavoritedLoading
          }
          className={`enregistrer flex items-center gap-2 h-10 px-5 py-1 rounded-lg border border-black/5
                      bg-black/5 hover:bg-black/10 transition
                      ${
                        isFavorited
                          ? 'interaction-active text-pink-600 bg-red-200/50 border-red-600/50 hover:text-pink-800'
                          : ''
                      }`}
        >
          <i
            className={`bi ${isFavorited ? 'bi-bookmark-fill' : 'bi-bookmark'}`}
          />
          <p className="hidden lg:block">
            {addFavoriteMutation.isPending || removeFavoriteMutation.isPending
              ? '...'
              : isFavorited
              ? 'Enregistré'
              : 'Enregistrer'}
          </p>
        </button>
      </div>

      {isCopied && (
        <div
          className="popup fixed left-1/2 bottom-[10%] -translate-x-1/2 flex items-center gap-4
                        bg-black/80 text-white px-4 py-2 rounded z-50 animate-fade-in-out"
        >
          <i className="bi bi-check-circle" />
          <p>Copié dans la presse-papier !</p>
        </div>
      )}
    </div>
  );
};
