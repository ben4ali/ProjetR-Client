import React from "react";
import { Link } from "react-router-dom";

export const VideoSuggestion = () => {
  return (
    <div className="video-suggestion-holder">
      <Link to="/watch/1" className="video-suggestion">
        <img src="https://wallpapercave.com/wp/wp4877950.jpg" alt="video" />
        <div className="video-suggestion-info">
          <h4>Titre de la vidéo</h4>
          <p>Ali Benkarrouch</p>
          <div className="video-suggestion-data">
            <p>256k Visionnements</p>
            <p>2025-03-22</p>
          </div>
        </div>
      </Link>
    </div>
  );
};