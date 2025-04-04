import React, { useState, useEffect } from "react";
import { Projet } from "../../types/Projet";
import { useApi } from "../../hooks/useApi";
import { useAuth } from "../../hooks/useAuth";
import { User } from "../../types/User";
import default_avatar from "../../assets/images/default_profil.png";

interface VideoOptionsProps {
  projet: Projet | null;
}

export const VideoOptions = (
  { projet }: VideoOptionsProps
) => {
  const { isLoggedIn } = useAuth();
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


  const toggleLike = async () => {
    if (!projet?.id || !isLoggedIn) return;
  
    const likedProjects = JSON.parse(localStorage.getItem("liked_projects") || "[]");
  
    const isAlreadyLiked = likedProjects.includes(projet.id);
  
    try {
      if (isAlreadyLiked) {
        await request("put", `http://localhost:5000/api/v1/projects/dislike/${projet.id}`);
        localStorage.setItem(
          "liked_projects",
          JSON.stringify(likedProjects.filter((id: number) => id !== projet.id))
        );
        setIsLiked(false);
        if (projet.likes !== undefined) {
          projet.likes -= 1;
        }
      } else {
        await request("put", `http://localhost:5000/api/v1/projects/like/${projet.id}`);
        likedProjects.push(projet.id);
        localStorage.setItem("liked_projects", JSON.stringify(likedProjects));
        setIsLiked(true);
        if (projet.likes !== undefined) {
          projet.likes += 1;
        }
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
      const likedProjects = JSON.parse(localStorage.getItem("liked_projects") || "[]");
      setIsLiked(likedProjects.includes(projet.id));
    }
  }, [projet?.id]);

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
          className={`like ${isLoggedIn && isLiked ? "interaction-active" : ""}`}
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