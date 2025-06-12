import { Link } from 'react-router-dom';
import { useProjectById } from '../../hooks/use-project';

interface FavoriteProjectCardProps {
  projectId: string;
}

export const FavoriteProjectCard = ({
  projectId,
}: FavoriteProjectCardProps) => {
  const { data: project, isLoading, error } = useProjectById(projectId);
  if (isLoading) {
    return (
      <div className="animate-pulse rounded p-4 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-40 h-48 md:h-24 bg-gray-200 rounded-lg"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
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
      <div className="flex flex-col md:flex-row gap-4">
        {/* Thumbnail */}
        <div className="relative w-full md:w-80 h-48 md:h-44 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden flex-shrink-0">
          {project.demoUrl ? (
            <video
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              poster={project.previewImageUrl}
              muted
            >
              <source src={project.demoUrl} type="video/mp4" />
            </video>
          ) : project.previewImageUrl ? (
            <img
              src={project.previewImageUrl}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <i className="bi bi-play-circle text-2xl text-gray-400"></i>
            </div>
          )}
          <div className="absolute top-2 right-2">
            <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center">
              <i className="bi bi-heart-fill text-xs"></i>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2 md:line-clamp-1">
            {project.description}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
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
                  className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 4 && (
                <span className="text-xs text-gray-500 self-center">
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
