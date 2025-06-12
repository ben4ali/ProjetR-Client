import { BarChart3, Eye, Folder, Heart } from 'lucide-react';
import { FC } from 'react';
import { Projet } from '../../types/Projet';

interface DashboardStatsProps {
  userProjects: Projet[];
}

export const DashboardStats: FC<DashboardStatsProps> = ({ userProjects }) => {
  const totalProjects = userProjects.length;
  const totalViews = userProjects.reduce(
    (acc, project) => acc + (project.views || 0),
    0
  );
  const totalLikes = userProjects.reduce(
    (acc, project) => acc + (project.likes || 0),
    0
  );
  const averageViews =
    totalProjects > 0 ? Math.round(totalViews / totalProjects) : 0;
  const stats = [
    {
      title: 'Projets publiés',
      value: totalProjects,
      icon: Folder,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Vues totales',
      value: totalViews,
      icon: Eye,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Likes reçus',
      value: totalLikes,
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      title: 'Moyenne de vues',
      value: averageViews,
      icon: BarChart3,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className={`bg-[#eff0fa] rounded p-6`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">
                {stat.title}
              </p>
              <p className={`text-2xl font-bold text-[#444ea5]`}>
                {stat.value.toLocaleString()}
              </p>
            </div>
            <div className="text-3xl opacity-80">
              <stat.icon className={`w-8 h-8 text-[#444ea5]`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
