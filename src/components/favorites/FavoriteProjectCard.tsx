import { Link } from "react-router-dom";
import { useProjectById } from "../../hooks/use-project";

interface FavoriteProjectCardProps {
  projectId: string;
}

export const FavoriteProjectCard = ({
  projectId,
}: FavoriteProjectCardProps) => {
  const { data: project, isLoading, error } = useProjectById(projectId);
  if (isLoading) {
    return (
      <div className="animate-pulse rounded border border-gray-200 p-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="h-48 w-full rounded-lg bg-gray-200 md:h-24 md:w-40"></div>
          <div className="flex-1">
            <div className="mb-2 h-4 w-3/4 rounded bg-gray-200"></div>
            <div className="mb-2 h-3 w-1/2 rounded bg-gray-200"></div>
            <div className="h-3 w-1/4 rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return null;
  }
  return (
    <Link to={`/watch/${project.id}`} className="group">
      <div className="flex flex-col gap-4 md:flex-row">
        {/* Thumbnail */}
        <div className="relative h-48 w-full flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 md:h-44 md:w-80">
          {project.demoUrl ? (
            <video
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              poster={project.previewImageUrl}
              muted
            >
              <source src={project.demoUrl} type="video/mp4" />
            </video>
          ) : project.previewImageUrl ? (
            <img
              src={project.previewImageUrl}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
              <i className="bi bi-play-circle text-2xl text-gray-400"></i>
            </div>
          )}
          <div className="absolute top-2 right-2">
            <div className="flex items-center rounded bg-red-500 px-2 py-1 text-xs font-medium text-white">
              <i className="bi bi-heart-fill text-xs"></i>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
            {project.title}
          </h3>
          <p className="mb-3 line-clamp-2 text-sm text-gray-600 md:line-clamp-1">
            {project.description}
          </p>

          <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex items-center text-sm text-gray-500">
              <i className="bi bi-eye mr-1"></i>
              <span>{project.views || 0} vues</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <i className="bi bi-heart mr-1"></i>
              <span>{project.likes || 0} likes</span>
            </div>
            {project.author && (
              <div className="flex items-center text-sm text-gray-500">
                <i className="bi bi-person mr-1"></i>
                <span>
                  {project.author.firstName} {project.author.lastName}
                </span>
              </div>
            )}
          </div>

          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {project.tags.slice(0, 4).map((tag, index) => (
                <span
                  key={index}
                  className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 4 && (
                <span className="self-center text-xs text-gray-500">
                  +{project.tags.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
