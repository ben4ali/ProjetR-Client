import { FC } from "react";
import { User } from "../../types/User";
import GradientText from "./GradientText";

interface WelcomeSectionProps {
  user: User;
}

export const WelcomeSection: FC<WelcomeSectionProps> = ({ user }) => {
  const currentHour = new Date().getHours();
  const getGreeting = () => {
    if (currentHour < 12) return "Bonjour";
    if (currentHour < 18) return "Bon après-midi";
    return "Bonsoir";
  };

  return (
    <div className="welcome-section">
      <div className="relative z-10 mb-10">
        {" "}
        <GradientText
          text={`${getGreeting()}, ${user.firstName} ! `}
          className="py-2 text-5xl font-bold"
          variant="rosemont"
        />
        <p className="text-gray/90 text-lg">
          Bienvenue sur votre tableau de bord. Que souhaitez-vous faire
          aujourd'hui ?
        </p>
      </div>

      <div className="absolute top-4 right-4 h-16 w-16 rounded-full bg-white/10 blur-xl"></div>
      <div className="absolute bottom-6 left-6 h-12 w-12 rounded-full bg-white/20 blur-lg"></div>
    </div>
  );
};
