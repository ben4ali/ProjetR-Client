import { Link } from 'react-router-dom';
import { DashboardStats } from '../components/dashboard/DashboardStats';
import { QuickActions } from '../components/dashboard/QuickActions';
import { RecentVideos } from '../components/dashboard/RecentVideos';
import { TrendingProjects } from '../components/dashboard/TrendingProjects';
import { WelcomeSection } from '../components/dashboard/WelcomeSection';
import { useCurrentUser } from '../hooks/use-auth';
import { useAllProjects, useProjectsByUserId } from '../hooks/use-project';

export const Dashboard = () => {
  const { data: currentUser } = useCurrentUser();
  const { data: allProjects } = useAllProjects();
  const { data: userProjects } = useProjectsByUserId(currentUser?.id);

  // Obtenir les projets récents (derniers 6)
  const recentProjects = allProjects?.slice(0, 6) || [];
  // Obtenir les projets tendances (ceux avec le plus de vues)
  const trendingProjects =
    allProjects?.sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 4) ||
    [];

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Accès non autorisé
          </h2>
          <p className="text-gray-600 mb-6">
            Vous devez être connecté pour accéder au tableau de bord.
          </p>
          <Link
            to="/authentification"
            className="bg-[#444ea5] text-white px-6 py-3 rounded-lg hover:bg-[#3a4193] transition-colors"
          >
            Se connecter
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container min-h-screen bg-gray-50">
      <div className="dashboard-content max-w-[85vw] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Section de bienvenue */}
        <WelcomeSection user={currentUser} />

        {/* Actions rapides */}
        <QuickActions />

        {/* Statistiques */}
        <DashboardStats userProjects={userProjects || []} />

        {/* Grille principale */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-8">
          {/* Colonne principale - Vidéos récentes */}
          <div className="xl:col-span-2">
            <RecentVideos projects={recentProjects} />
          </div>

          {/* Sidebar - Projets tendances et guide */}
          <div className="xl:col-span-1 space-y-6">
            <TrendingProjects projects={trendingProjects} />
          </div>
        </div>
      </div>
    </div>
  );
};
