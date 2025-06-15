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
    <div className="video-container h-[15rem] w-full lg:h-[35rem]">
      <video
        ref={videoRef}
        controls
        className="video h-[15rem] w-full rounded bg-black object-contain lg:h-[35rem]"
        autoPlay
      >
        <source src={projet?.demoUrl} type="video/mp4" />
        Votre navigateur ne prend pas en charge la lecture de vidéos.
      </video>
    </div>
  );
};
