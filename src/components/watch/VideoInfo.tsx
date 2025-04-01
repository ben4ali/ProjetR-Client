import React from "react";

export const VideoInfo = () => {
  const tags = [
    "Java",
    "Springboot",
    "Angular",
    "Thymeleaf",
  ];
  return (
    <div className="video-info">
      <h2>Titre de la vidéo</h2>
      {tags.length > 0 && (
        <div className="tag-list">
          {tags.map((tag, index) => (
        <span key={index} className="video-tag">
          {tag}
        </span>
          ))}
        </div>
      )}
    </div>
  );
};