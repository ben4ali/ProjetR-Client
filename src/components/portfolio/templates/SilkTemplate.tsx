import { FC } from "react";
import { Portfolio } from "../../../types/Portfolio";
import Silk from "../../../blocks/Backgrounds/Silk/Silk";
import SplitText from "../../../blocks/TextAnimations/SplitText/SplitText";
import ShinyText from "../../../blocks/TextAnimations/ShinyText/ShinyText";
import CircularText from "../../../blocks/TextAnimations/CircularText/CircularText";

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
    <div
      className={`relative h-600 bg-zinc-800 overflow-hidden ${
        isPreview ? "scale-75 origin-top" : ""
      }`}
    >
      {/* Nav */}
      <nav className="text-white fixed top-5 left-5 w-fit rounded-lg flex gap-3 z-10 bg-teal-900/40 backdrop-blur-lg shadow-md p-4 px-6">
        {/* Avatar */}
        <a href="#hero" className="flex items-center gap-4">
          <img
            src={user.avatar || "/default-avatar.png"}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <h2 className="text-lg font-semibold pr-3 border-r">{`${user.firstName} ${user.lastName}`}</h2>
          </div>
        </a>
        {/* Links */}
        <ul className="mt-1 flex gap-4">
          <li>
            <a
              href={"#a-propos"}
              className="pb-2 relative hover:after:w-full after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-white after:w-0 after:transition-all after:duration-300"
            >
              À propos
            </a>
          </li>
          <li>
            <a
              href={"#competences"}
              className="pb-2 relative hover:after:w-full after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-white after:w-0 after:transition-all after:duration-300"
            >
              Compétences
            </a>
          </li>
          <li>
            <a
              href={"#projets"}
              className="pb-2 relative hover:after:w-full after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-white after:w-0 after:transition-all after:duration-300"
            >
              Mes Projets
            </a>
          </li>
        </ul>
      </nav>
      {/* hero section */}
      <div
        id="hero"
        className="relative h-150 w-full flex flex-col items-center justify-center "
      >
        <div className="absolute inset-0">
          {isPreview ? (
            <img
              src="/templates/silk-bg-preview.png"
              alt="bacground preview"
              className="object-cover"
            />
          ) : (
            <Silk color="#047857" />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-emerald-950 z-4" />
        <div className="flex items-center gap-4 justify-center text-white">
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
        {/* hook */}
        <ShinyText
          text={`| ${hook || "Bienvenue sur mon portfolio !"} |`}
          className="z-4 text-center text-lg mt-4"
        />
      </div>
      {/* About Section */}
      <div
        className="py-10 bg-gradient-to-t from-zinc-800 via-zinc-800 to-emerald-950 relative  text-white"
        id="a-propos"
      >
        <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col gap-4 ">
          <h2 className="text-3xl font-bold mb-4 border-b w-[60%] p-3">
            À propos
          </h2>
          <p className="text-xl text-gray-300">
            {about ||
              "Je suis un développeur passionné par la création de solutions innovantes."}
          </p>
          {cvDownloadUrl && (
            <a
              href={cvDownloadUrl}
              className="mt-4 max-w-fit inline-block bg-gradient-to-r from-teal-700 to-emerald-800 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:from-teal-700 hover:to-emerald-900 transition-all duration-300 transform hover:scale-101"
            >
              Télécharger mon CV
            </a>
          )}
          <div className={
            `hidden lg:block size-50 absolute  bottom-15 rotate-25 ${
              isPreview ? "scale-75 right-2" : "right-10"
            }`
          }>
            <CircularText
              text="NOMBRES*D'ANNÉES*D'ÉXPÈRIENCES*"
              spinDuration={20}
              className="text-emerald-300 size-full text-sm text-center"
            />
            <div className=" pointer-events-none absolute inset-0 flex items-center justify-center text-2xl font-bold text-emerald-300">
              {yearsOfExperience ? `${yearsOfExperience} ans` : "N/A"}
            </div>
          </div>
          <div className="block lg:hidden mt-6 p-4 bg-emerald-900/20 rounded-lg border border-emerald-300/30">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-emerald-300 mb-2">
                {yearsOfExperience ? `${yearsOfExperience} ans` : "N/A"}
              </div>
              <div className="text-sm sm:text-base text-gray-300">
                Années d'expérience
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
