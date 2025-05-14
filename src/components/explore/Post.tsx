import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Projet } from "../../types/Projet";

export const Post = ({
  project,
  fullPost = false,
}: {
  project: Projet;
  fullPost?: boolean;
}) => {
  const formattedDate = new Date(project.createdAt).toLocaleDateString(
    "fr-CA",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const [duration, setDuration] = useState<number | null>(null);

  const handleLoadedMetadata = (event: Event) => {
    const video = event.currentTarget as HTMLVideoElement;
    setDuration(video.duration);
  };

  const formatDuration = (seconds: number | null) => {
    if (seconds === null) return "--:--";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
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

  if (!project) {
    return <div className="post loading">Chargement...</div>;
  }

  const authorAvatar = project.author?.avatar || "/default-avatar.png";
  const authorUsername = project.author?.username || "Utilisateur inconnu";

  return (
    <Link
      to={"/watch/" + project.id}
      className={fullPost ? "post-full gap-6 max-h-30 " : "post"}
    >
      {!fullPost && (
        <>
          <div className="image-holder">
            <div className="post-overlay"></div>
            <video
              className="size-full"
              src={project.demoUrl}
              />
            <p className="temps">{formatDuration(duration)}</p>
          </div>
          <div className="post-footer">
            <div className="post-author">
              <img src={authorAvatar} alt="Photo de profil" />
            </div>
            <div className="post-info">
              <h2>{project.title || "Sans titre"}</h2>
              <p>{authorUsername}</p>
              <p>
                {project.views || 0} Visionnements - {formattedDate}
              </p>
            </div>
          </div>
        </>
      )}
      {fullPost && (
        <>
          <div className="flex flex-col w-[25%] ">
            <div className="image-holder !h-full ">
              <div className="post-overlay"></div>
              <video
              className="size-full"
              src={project.demoUrl}
              />
              <p className="temps">{formatDuration(duration)}</p>
            </div>
          </div>
          <div className="post-description">
            <div className="post-info">
              <h2>{project.title || "Sans titre"}</h2>
              <p>
                {project.views || 0} Visionnements • {formattedDate}
              </p>
              <div className="flex items-center gap-2 mt-3">
                <div className="size-8 rounded-full overflow-hidden">
                  <img
                    className="object-cover"
                    src={authorAvatar}
                    alt="Photo de profil"
                  />
                </div>
                <p>{authorUsername}</p>
              </div>
            </div>
            <p className="mt-3">
              {project.description || "Aucune description fournie."}
            </p>
          </div>
        </>
      )}
    </Link>
  );
};
