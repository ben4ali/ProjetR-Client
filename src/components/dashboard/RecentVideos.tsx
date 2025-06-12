import { Eye, Film, Heart, Play, Video } from 'lucide-react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Projet } from '../../types/Projet';

interface RecentVideosProps {
  projects: Projet[];
}

export const RecentVideos: FC<RecentVideosProps> = ({ projects }) => {
  const recentProjects = projects
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 6);

  return (
    <div className="bg-white rounded p-6 border border-[#e4003928]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Vidéos récentes</h2>
        <Link
          to="/explore"
          className="text-[#e4003a] hover:text-[#eeafc0] text-sm font-medium transition-colors"
        >
          Voir tout →
        </Link>
      </div>{' '}
      {recentProjects.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">
            <Film className="w-16 h-16 text-gray-400 mx-auto" />
          </div>
          <p className="text-gray-500 text-lg mb-4">Aucun projet récent</p>
          <Link
            to="/explore"
            className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Explorer les projets
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentProjects.map(project => (
            <Link
              key={project.id}
              to={`/watch/${project.id}`}
              className="group relative overflow-hidden bg-gray-100 rounded-lg aspect-video hover:shadow-lg transition-all duration-300"
            >
              {' '}
              {project.demoUrl ? (
                <video
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  poster={project.previewImageUrl}
                  preload="metadata"
                >
                  <source src={project.demoUrl} type="video/mp4" />
                </video>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <Video className="w-12 h-12 text-gray-400" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="text-white font-medium text-sm line-clamp-2 mb-1">
                  {project.title}
                </h3>{' '}
                <div className="flex items-center space-x-3 text-white/80 text-xs">
                  <span className="flex items-center">
                    <Eye className="w-3 h-3 mr-1" /> {project.views || 0}
                  </span>
                  <span className="flex items-center">
                    <Heart className="w-3 h-3 mr-1" /> {project.likes || 0}
                  </span>
                </div>
              </div>
              {/* Play button overlay */}{' '}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <Play className="w-8 h-8 text-white" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
