import React, { useEffect, useRef } from "react";
import { Projet } from "../../types/Projet";

interface VideoPlayerProps {
  projet: Projet | null;
}

export const VideoPlayer = ({ projet }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [projet?.demoUrl]);

  return (
    <div className="video-container">
      <video className="video" controls ref={videoRef}>
        <source src={projet?.demoUrl} type="video/mp4" />
        Votre navigateur ne prend pas en charge la lecture de vidéos.
      </video>
    </div>
  );
};