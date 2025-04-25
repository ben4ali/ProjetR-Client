import {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { Projet } from "../../types/Projet";

export const Post = ({
  project
}: {
  project :Projet;
}) => {

  const formattedDate = new Date(project.createdAt).toLocaleDateString("fr-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });


  const [duration, setDuration] = useState<number | null>(null);

  const handleLoadedMetadata = (event: Event) => {
    const video = event.currentTarget as HTMLVideoElement;
    setDuration(video.duration);
  };

  const formatDuration = (seconds: number | null) => {
    if (seconds === null) return "--:--";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (project.demoUrl) {
      const video = document.createElement("video");
      video.src = project.demoUrl;
      video.addEventListener("loadedmetadata", handleLoadedMetadata);
      return () => {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
    }
  }, [project.demoUrl]);

  return (
    <Link to={"/watch/"+project.id} className="post">
      <div className="image-holder">
        <div className="post-overlay"></div>
        <video src={project.demoUrl} alt="post" width="100%" height="100%" />
        <p className="temps">{formatDuration(duration)}</p>
      </div>
      <div className="post-footer">
        <div className="post-author">
          <img src={project.author.avatar || ""} alt="Photo de profil" />
        </div>
        <div className="post-info">
          <h2>{project.title}</h2>
          <p>{project.author.username}</p>
          <p>
            {project.views} Visionnements - {formattedDate}
          </p>
        </div>
      </div>
    </Link>
  );
};
