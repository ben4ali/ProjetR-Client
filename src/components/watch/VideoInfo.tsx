import React from "react";
import { Projet } from "../../types/Projet";
interface VideoInfoProps {
  projet : Projet | null;
}

export const VideoInfo = (
  { projet }: VideoInfoProps
) => {
  const tags = projet?.tags || [];
  return (
    <div className="video-info">
      <h2>{projet?.title}</h2>
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