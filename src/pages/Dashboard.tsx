import { Link } from "react-router-dom";
import { DashboardStats } from "../components/dashboard/DashboardStats";
import { QuickActions } from "../components/dashboard/QuickActions";
import { RecentVideos } from "../components/dashboard/RecentVideos";
import { TrendingProjects } from "../components/dashboard/TrendingProjects";
import { WelcomeSection } from "../components/dashboard/WelcomeSection";
import { useCurrentUser } from "../hooks/use-auth";
import { useAllProjects, useProjectsByUserId } from "../hooks/use-project";

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
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Accès non autorisé
          </h2>
          <p className="mb-6 text-gray-600">
            Vous devez être connecté pour accéder au tableau de bord.
          </p>
          <Link
            to="/authentification"
            className="rounded-lg bg-[#444ea5] px-6 py-3 text-white transition-colors hover:bg-[#3a4193]"
          >
            Se connecter
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container min-h-screen bg-gray-50">
      <div className="dashboard-content mx-auto max-w-[85vw] px-4 py-8 sm:px-6 lg:px-8">
        {/* Section de bienvenue */}
        <WelcomeSection user={currentUser} />

        {/* Actions rapides */}
        <QuickActions />

        {/* Statistiques */}
        <DashboardStats userProjects={userProjects || []} />

        {/* Grille principale */}
        <div className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-3">
          {/* Colonne principale - Vidéos récentes */}
          <div className="xl:col-span-2">
            <RecentVideos projects={recentProjects} />
          </div>

          {/* Sidebar - Projets tendances et guide */}
          <div className="space-y-6 xl:col-span-1">
            <TrendingProjects projects={trendingProjects} />
          </div>
        </div>
      </div>
    </div>
  );
};
