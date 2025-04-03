import React from "react";
import { Projet } from "../../types/Projet";

interface VideoPlayerProps {
  projet: Projet | null;
}

export const VideoPlayer = (
  { projet }: VideoPlayerProps
) => {
  return (
    <div className="video-container">
      <video className="video" controls>
        <source src={projet?.demoUrl} type="video/mp4" />
      </video>
    </div>
  );
};