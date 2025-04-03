import React, { useState, useEffect } from "react";
import { Projet } from "../../types/Projet";
import { useApi } from "../../hooks/useApi";
import { User } from "../../types/User";
import default_avatar from "../../assets/images/default_profil.png";

interface VideoOptionsProps {
  projet: Projet | null; // Remplacez 'any' par le type approprié pour votre projet
}

export const VideoOptions = (
  { projet }: VideoOptionsProps
) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [author, setAuthor] = useState< User | null>(null);

  const date = projet?.createdAt
    ? new Intl.DateTimeFormat("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(projet.createdAt))
    : "";

  const { request } = useApi<unknown[]>();

  const fetchAuthor = async () => {
    if (projet?.author.id) {
      console.log("authorId", projet?.author.id);
      try {
        const data = await request(
          "get",
          `http://localhost:5000/api/v1/users/${projet?.author?.id}`
        );
        return data;
      } catch (error) {
        console.error("Error fetching author data:", error);
      }
    }
    return null;
  };

  useEffect(() => {
    console.log("projet?.authorId", projet?.author.id);
    const fetchData = async () => {
      const authorData = await fetchAuthor();
      setAuthor(authorData);
    };
    fetchData();
  }
  , [projet?.author.id]);


  const toggleLike = () => {
    setIsLiked(!isLiked);
    // TODO: logique pour like
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

  return (
    <div className="video-options">
      <div className="author-holder">
        <img src={author?.avatar ?? default_avatar } alt="author" />
        <div className="author-info">
          <h3>{author?.firstName} {author?.lastName}</h3>
          <p>Publié le {date}</p>
        </div>
      </div>
      <div className="video-interaction">
        <button
          className={`like ${isLiked ? "interaction-active" : ""}`}
          onClick={toggleLike}
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