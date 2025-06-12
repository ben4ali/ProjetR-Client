import { Briefcase, ChevronRight, Rocket, Search, User } from 'lucide-react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useCurrentUser } from '../../hooks/use-auth';
import { usePortfolioByUserId } from '../../hooks/use-portfolios';

export const QuickActions: FC = () => {
  const { data: currentUser } = useCurrentUser();
  const { data: userPortfolio } = usePortfolioByUserId(currentUser?.id);

  // Déterminer le lien portfolio selon si l'utilisateur a déjà un portfolio
  const portfolioLink = userPortfolio
    ? `/portfolio/${userPortfolio.id}/edit`
    : '/create-portfolio';

  const portfolioDescription = userPortfolio
    ? 'Modifier votre portfolio professionnel'
    : 'Créer votre portfolio professionnel';

  const actions = [
    {
      title: 'Publier un projet',
      description: 'Partager votre travail avec la communauté',
      icon: Rocket,
      link: '/publish',
      color: 'from-green-400 to-emerald-600',
    },
    {
      title: 'Mon Portfolio',
      description: portfolioDescription,
      icon: Briefcase,
      link: portfolioLink,
      color: 'from-blue-400 to-indigo-600',
    },
    {
      title: 'Explorer',
      description: 'Découvrir les projets de la communauté',
      icon: Search,
      link: '/explore',
      color: 'from-purple-400 to-pink-600',
    },
    {
      title: 'Mon Profil',
      description: 'Modifier vos informations personnelles',
      icon: User,
      link: `/profil/${currentUser?.id || ''}`,
      color: 'from-orange-400 to-red-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {actions.map((action, index) => (
        <Link
          key={index}
          to={action.link}
          className="group relative border border-[rgba(68,78,165,0.23)] overflow-hidden bg-white rounded p-6 transition-all duration-300 hover:-translate-y-0.5"
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
          ></div>{' '}
          <div className="text-4xl mb-4 transition-transform duration-300">
            <action.icon className="w-10 h-10 text-gray-700" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {action.title}
          </h3>
          <p className="text-gray-600 text-sm">{action.description}</p>{' '}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </Link>
      ))}
    </div>
  );
};
