import { FC } from "react";
import { Portfolio } from "../../../types/Portfolio";
import Silk from "../../../blocks/Backgrounds/Silk/Silk";
import SplitText from "../../../blocks/TextAnimations/SplitText/SplitText";

interface SilkTemplateProps {
  portfolio: Portfolio;
  isPreview?: boolean;
}

export const SilkTemplate: FC<SilkTemplateProps> = ({
  portfolio,
  isPreview = false,
}) => {
  const {
    user,
    about,
    hook,
    skills = [],
    githubUrl,
    linkedinUrl,
    projets = [],
    yearsOfExperience,
    cvDownloadUrl,
    jobTitle,
  } = portfolio;

  return (
    <div className="relative h-600 bg-zinc-400">
      {/* Nav */}
      <nav className="text-white sticky top-2 left-5 w-fit rounded-2xl flex gap-3 z-10 bg-teal-900/40 backdrop-blur-2xl shadow-md p-4">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <img
            src={user.avatar || "/default-avatar.png"}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <h2 className="text-lg font-semibold pr-3 border-r">{`${user.firstName} ${user.lastName}`}</h2>
          </div>
        </div>
        {/* Links */}
        <ul className="mt-1 flex gap-2">
          <li>
            <a
              href={"#a-propos"}
            >
              À propos
            </a>
          </li>
          <li>
            <a
              href={"#competences"}
            >
              Compétences
            </a>
          </li>
          <li>
            <a
              href={"#projets"}
            >
              Mes Projets
            </a>
          </li>
          </ul>
      </nav>
      {/* hero section */}
      <div className="absolute top-0 h-150 w-full">
        <Silk color="#059669" />
        <div className="absolute inset-0 flex items-center gap-4 justify-center text-white">
          <SplitText
            text={`${user.firstName} ${user.lastName}`}
            className="text-3xl font-semibold text-center"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />
          <SplitText
            text={`- ${jobTitle || "Software Engineer"}`}
            className="text-2xl text-center"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />
        </div>
      </div>
      {/* About Section */}
      <div>
        
      </div>
    </div>
  );
};
