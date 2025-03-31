import React, { useState } from "react";

export const VideoOptions = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [isLiked, setIsLiked] = useState(false); // State for "J'aime"
  const [isSaved, setIsSaved] = useState(false); // State for "Enregistrer"

  const handleShare = () => {
    const videoLink = window.location.href;
    navigator.clipboard.writeText(videoLink).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    // TODO: logique pour like
  };

  const toggleSave = () => {
    setIsSaved(!isSaved);
    // TODO: logique pour save
  };

  return (
    <div className="video-options">
      <div className="author-holder">
        <img src="https://wallpapercave.com/wp/wp4877950.jpg" alt="author" />
        <div className="author-info">
          <h3>Ali Benkarrouch</h3>
          <p>Publié le 15 septembre 2025</p>
        </div>
      </div>
      <div className="video-interaction">
        <button
          className={`like ${isLiked ? "interaction-active" : ""}`}
          onClick={toggleLike}
        >
          <i className="bi bi-hand-thumbs-up"></i>
          <p>J&apos;aime</p>
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