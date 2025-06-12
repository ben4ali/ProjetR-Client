import { useState, useEffect } from "react";
import { Projet } from "../../types/Projet";
import { isLoggedIn } from "../../hooks/use-auth";
import default_avatar from "../../assets/images/default_profil.png";
import { useUserById } from "../../hooks/use-users";
import { useLikeProject, useDislikeProject } from "../../hooks/use-project";
import { Link } from "react-router-dom";

interface VideoOptionsProps {
  projet: Projet | null;
}

export const VideoOptions = ({ projet }: VideoOptionsProps) => {
  const loggedIn = isLoggedIn();
  const [isCopied, setIsCopied] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const {
    data: author,
    isLoading: authorLoading,
    error: authorError,
  } = useUserById(projet?.author?.id);

  const likeProjectMutation = useLikeProject();
  const dislikeProjectMutation = useDislikeProject();

  const date = projet?.createdAt
    ? new Intl.DateTimeFormat("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(projet.createdAt))
    : "";

  // Like / dislike
  const toggleLike = () => {
    if (!projet?.id || !loggedIn) return;

    const likedProjects = JSON.parse(
      localStorage.getItem("liked_projects") || "[]",
    );
    const already = likedProjects.includes(projet.id);

    if (already) {
      dislikeProjectMutation.mutate(projet.id, {
        onSuccess: () => {
          localStorage.setItem(
            "liked_projects",
            JSON.stringify(
              likedProjects.filter((id: number) => id !== projet.id),
            ),
          );
          setIsLiked(false);
          if (projet.likes !== undefined) projet.likes -= 1;
        },
      });
    } else {
      likeProjectMutation.mutate(projet.id, {
        onSuccess: () => {
          likedProjects.push(projet.id);
          localStorage.setItem("liked_projects", JSON.stringify(likedProjects));
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

  useEffect(() => {
    if (projet?.id) {
      const likedProjects = JSON.parse(
        localStorage.getItem("liked_projects") || "[]",
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
            <Link to={`/profil/${author?.id}`} >
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
                      ${loggedIn && isLiked ? "interaction-active text-pink-600 bg-red-200/50 border-red-600/50 hover:text-pink-800" : ""}`}
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
          onClick={() => setIsSaved(!isSaved)}
          className={`enregistrer flex items-center gap-2 h-10 px-5 py-1 rounded-lg border border-black/5
                      bg-black/5 hover:bg-black/10 transition
                      ${isSaved ? "interaction-active text-pink-600 bg-red-200/50 border-red-600/50 hover:text-pink-800" : ""}`}
        >
          <i className="bi bi-bookmark" />
          <p className="hidden lg:block">Enregistrer</p>
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
