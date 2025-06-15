import { Eye, Film, Heart, Video } from "lucide-react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Projet } from "../../types/Projet";

interface RecentVideosProps {
  projects: Projet[];
}

export const RecentVideos: FC<RecentVideosProps> = ({ projects }) => {
  const recentProjects = projects
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 6);

  return (
    <div className="rounded border border-[#e4003928] bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Vidéos récentes</h2>
        <Link
          to="/explore"
          className="text-sm font-medium text-[#e4003a] transition-colors hover:text-[#eeafc0]"
        >
          Voir tout →
        </Link>
      </div>{" "}
      {recentProjects.length === 0 ? (
        <div className="py-8 text-center">
          <div className="mb-4 text-6xl">
            <Film className="mx-auto h-16 w-16 text-gray-400" />
          </div>
          <p className="mb-4 text-lg text-gray-500">Aucun projet récent</p>
          <Link
            to="/explore"
            className="inline-block rounded-lg bg-purple-600 px-6 py-2 text-white transition-colors hover:bg-purple-700"
          >
            Explorer les projets
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recentProjects.map((project) => (
            <Link
              key={project.id}
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
              <div className="absolute right-0 bottom-0 left-0 p-3">
                <h3 className="mb-1 line-clamp-2 text-sm font-medium text-white">
                  {project.title}
                </h3>{" "}
                <div className="flex items-center space-x-3 text-xs text-white/80">
                  <span className="flex items-center">
                    <Eye className="mr-1 h-3 w-3" /> {project.views || 0}
                  </span>
                  <span className="flex items-center">
                    <Heart className="mr-1 h-3 w-3" /> {project.likes || 0}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
