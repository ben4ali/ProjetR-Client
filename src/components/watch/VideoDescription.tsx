import React, { useState } from "react";
import { Projet } from "../../types/Projet";

interface VideoDescriptionProps {
  projet: Projet | null;
}

export const VideoDescription = ({ projet }: VideoDescriptionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const description = projet?.description || "Aucune description disponible.";
  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className={`video-description ${isExpanded ? "expanded-desc" : ""}`}>
      <div className="video-description-header">
        <p>{projet?.views} Visionnements</p>
        <button className="see-more" onClick={toggleDescription}>
          {isExpanded ? "Voir moins" : "Voir plus"}
        </button>
      </div>
      {description && (
        <div className="description">
          <div className="desc-fade-in"></div>
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};
