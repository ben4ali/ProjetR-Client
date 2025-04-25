import React, { useState, useEffect } from "react";
import { Projet } from "../../types/Projet";
import { isLoggedIn } from "../../hooks/use-auth";
import default_avatar from "../../assets/images/default_profil.png";
import { useUserById } from "../../hooks/use-users";
import { useLikeProject, useDislikeProject } from "../../hooks/use-project";

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

  const toggleLike = async () => {
    if (!projet?.id || !loggedIn) return;

    const likedProjects = JSON.parse(
      localStorage.getItem("liked_projects") || "[]"
    );
    const isAlreadyLiked = likedProjects.includes(projet.id);

    try {
      if (isAlreadyLiked) {
        dislikeProjectMutation.mutate(projet.id, {
          onSuccess: () => {
            localStorage.setItem(
              "liked_projects",
              JSON.stringify(
                likedProjects.filter((id: number) => id !== projet.id)
              )
            );
            setIsLiked(false);
            if (projet.likes !== undefined) {
              projet.likes -= 1;
            }
          },
        });
      } else {
        likeProjectMutation.mutate(projet.id, {
          onSuccess: () => {
            likedProjects.push(projet.id);
            localStorage.setItem(
              "liked_projects",
              JSON.stringify(likedProjects)
            );
            setIsLiked(true);
            if (projet.likes !== undefined) {
              projet.likes += 1;
            }
          },
        });
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleShare = () => {
    const videoLink = window.location.href;
    navigator.clipboard.writeText(videoLink).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const toggleSave = () => {
    setIsSaved(!isSaved);
    // TODO: logique pour save
  };

  useEffect(() => {
    if (projet?.id) {
      const likedProjects = JSON.parse(
        localStorage.getItem("liked_projects") || "[]"
      );
      setIsLiked(likedProjects.includes(projet.id));
    }
  }, [projet?.id]);

  return (
    <div className="video-options">
      <div className="author-holder">
        {authorLoading ? (
          <div>Chargement de l&apos;auteur...</div>
        ) : authorError ? (
          <div>Erreur lors du chargement de l&apos;auteur</div>
        ) : (
          <>
            <img
              src={author?.avatar || default_avatar}
              alt="author"
              crossOrigin="anonymous"
            />
            <div className="author-info">
              <h3>
                {author?.firstName} {author?.lastName}
              </h3>
              <p>Publié le {date}</p>
            </div>
          </>
        )}
      </div>
      <div className="video-interaction">
        <button
          className={`like ${loggedIn && isLiked ? "interaction-active" : ""}`}
          onClick={toggleLike}
          disabled={
            likeProjectMutation.isPending || dislikeProjectMutation.isPending
          }
        >
          <i className="bi bi-hand-thumbs-up"></i>
          <p>{projet?.likes} J&apos;aime</p>
        </button>
        <button className="share" onClick={handleShare}>
          <i className="bi bi-reply"></i>
          <p>Partager</p>
        </button>
        <button
          className={`enregistrer ${isSaved ? "interaction-active" : ""}`}
          onClick={toggleSave}
        >
          <i className="bi bi-bookmark"></i>
          <p>Enregistrer</p>
        </button>
      </div>
      {isCopied && (
        <div className="popup">
          <i className="bi bi-check-circle"></i>
          <p>Copié dans la presse-papier !</p>
        </div>
      )}
    </div>
  );
};
