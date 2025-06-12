import { FC } from 'react';
import { User } from '../../types/User';
import GradientText from './GradientText';

interface WelcomeSectionProps {
  user: User;
}

export const WelcomeSection: FC<WelcomeSectionProps> = ({ user }) => {
  const currentHour = new Date().getHours();
  const getGreeting = () => {
    if (currentHour < 12) return 'Bonjour';
    if (currentHour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  };

  return (
    <div className="welcome-section">
      <div className="relative z-10 mb-10">
        {' '}
        <GradientText
          text={`${getGreeting()}, ${user.firstName} ! `}
          className="text-5xl font-bold py-2"
          variant="rosemont"
        />
        <p className="text-gray/90 text-lg">
          Bienvenue sur votre tableau de bord. Que souhaitez-vous faire
          aujourd'hui ?
        </p>
      </div>

      {/* Floating elements for visual appeal */}
      <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-6 left-6 w-12 h-12 bg-white/20 rounded-full blur-lg"></div>
    </div>
  );
};
