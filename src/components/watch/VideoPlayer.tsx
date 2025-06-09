import { useEffect, useRef } from "react";
import { Projet } from "../../types/Projet";

interface VideoPlayerProps {
  projet: Projet | null;
}

export const VideoPlayer = ({ projet }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.load();
  }, [projet?.demoUrl]);

  return (
    <div className="video-container w-full h-[15rem] lg:h-[35rem]">
      <video
        ref={videoRef}
        controls
        className="video w-full h-[15rem] lg:h-[35rem] object-contain rounded bg-black"
      >
        <source src={projet?.demoUrl} type="video/mp4" />
        Votre navigateur ne prend pas en charge la lecture de vidéos.
      </video>
    </div>
  );
};
