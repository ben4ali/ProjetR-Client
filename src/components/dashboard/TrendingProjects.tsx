import {
  ChevronRight,
  Eye,
  Flame,
  Heart,
  TrendingUp,
  Video,
} from 'lucide-react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Projet } from '../../types/Projet';

interface TrendingProjectsProps {
  projects: Projet[];
}

export const TrendingProjects: FC<TrendingProjectsProps> = ({ projects }) => {
  const trendingProjects = projects
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5);

  return (
    <div className="bg-white rounded p-6 border border-[#e4003928]">
      {' '}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Projets tendance</h2>
        <div className="text-2xl">
          <Flame className="w-6 h-6 text-[#e4003a]" />
        </div>
      </div>{' '}
      {trendingProjects.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">
            <TrendingUp className="w-10 h-10 text-gray-400 mx-auto" />
          </div>
          <p className="text-gray-500">Aucun projet en tendance</p>
        </div>
      ) : (
        <div className="space-y-4">
          {trendingProjects.map((project, index) => (
            <Link
              key={project.id}
              to={`/watch/${project.id}`}
              className="group flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[#444ea5] text-xl font-bold">
                {index + 1}
              </div>{' '}
              <div className="flex-shrink-0 w-16 h-12 bg-gray-200 rounded-md overflow-hidden">
                {project.demoUrl ? (
                  <video
                    className="w-full h-full object-cover"
                    poster={project.previewImageUrl}
                    preload="metadata"
                  >
                    <source src={project.demoUrl} type="video/mp4" />
                  </video>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Video className="w-4 h-4 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-[#444ea5] line-clamp-1 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-1">
                  Par {project.author?.firstName} {project.author?.lastName}
                </p>{' '}
                <div className="flex items-center space-x-3 mt-1">
                  <span className="text-xs text-gray-400 flex items-center">
                    <Eye className="w-3 h-3 mr-1" /> {project.views || 0}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center">
                    <Heart className="w-3 h-3 mr-1" /> {project.likes || 0}
                  </span>
                </div>
              </div>{' '}
              <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
