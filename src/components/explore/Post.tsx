import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Projet } from "../../types/Projet";
import { Video } from "lucide-react";

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
    },
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
    return <div className="text-slate-500">Chargement...</div>;
  }

  const authorAvatar = project.author?.avatar || "/default-avatar.png";
  const authorUsername = project.author?.username || "Utilisateur inconnu";

  return (
    <Link
      to={"/watch/" + project.id}
      className={
        fullPost
          ? "flex min-h-[15em] w-full cursor-pointer gap-6 overflow-hidden rounded-xl p-[0.25rem] transition-colors duration-300 ease-in-out hover:bg-neutral-100"
          : "relative flex h-[20rem] w-[22.9rem] cursor-pointer flex-col overflow-hidden rounded-xl p-[0.25rem] transition-colors duration-200 ease-in-out hover:bg-neutral-200"
      }
    >
      {!fullPost && (
        <>
          <Link
            to={`/watch/${project.id}`}
            className="group relative aspect-video overflow-hidden rounded-lg bg-gray-100 transition-all duration-300 hover:shadow-lg"
          >
            {" "}
            {project.demoUrl ? (
              <video
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                poster={project.previewImageUrl}
                preload="metadata"
              >
                <source src={project.demoUrl} type="video/mp4" />
              </video>
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-200">
                <Video className="h-12 w-12 text-gray-400" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute right-2 bottom-2 z-20 rounded-bl-[8px] bg-black/50 px-2 py-1 text-xs text-white">
              {formatDuration(duration)}
            </div>
          </Link>
          <div className="mt-4 flex h-24 justify-items-start">
            <div className="flex aspect-square h-full">
              <img
                src={authorAvatar}
                alt="Photo de profil"
                className="h-12 w-12 rounded-full object-cover"
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex w-[85%] flex-col text-black">
              <h2 className="text-base font-semibold">
                {project.title || "Sans titre"}
              </h2>
              <p className="text-sm opacity-80">{authorUsername}</p>
              <p className="text-sm opacity-80">
                {project.views || 0} Visionnements - {formattedDate}
              </p>
            </div>
          </div>
        </>
      )}
      {fullPost && (
        <>
          <div className="flex w-1/4 flex-col">
            <div className="relative h-full w-full overflow-hidden rounded-[10px]">
              <div className="absolute z-10 h-full w-full bg-gradient-to-b from-transparent to-black/25 transition-all"></div>
              <video
                className="absolute z-0 h-full w-full scale-110 rounded-[8px] object-cover transition-all"
                src={project.demoUrl}
              />
              <p className="absolute right-[7.5%] bottom-[7.5%] z-20 rounded-bl-[8px] bg-black/50 px-2 py-1 text-xs text-white">
                {formatDuration(duration)}
              </p>
            </div>
          </div>
          <div className="flex flex-1 flex-col pl-6">
            <div className="flex flex-col text-black">
              <h2 className="text-base font-semibold">
                {project.title || "Sans titre"}
              </h2>
              <p className="text-sm opacity-80">
                {project.views || 0} Visionnements • {formattedDate}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <div className="h-8 w-8 overflow-hidden rounded-full">
                  <img
                    className="h-full w-full object-cover"
                    src={authorAvatar}
                    alt="Photo de profil"
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="text-sm">{authorUsername}</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-black/80">
              {project.description || "Aucune description fournie."}
            </p>
          </div>
        </>
      )}
    </Link>
  );
};
