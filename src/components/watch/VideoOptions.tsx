import React from "react";

export const VideoOptions = () => {
  return (
    <div className="video-options">
      <div className="author-holder">
        <img src="https://wallpapercave.com/wp/wp4877950.jpg" alt="author" />
        <div className="author-info">
          <h3>Ali Benkarrouch</h3>
          <p>@ben4ali</p>
        </div>
      </div>
      <div className="video-interaction">
        <div className="like">
          <i className="bi bi-hand-thumbs-up"></i>
          <p>J&apos;aime</p>
        </div>
        <div className="share">
          <i className="bi bi-reply"></i>
          <p>Partager</p>
        </div>
        <div className="enregistrer">
          <i className="bi bi-bookmark"></i>
          <p>Enregistrer</p>
        </div>
      </div>
    </div>
  );
};