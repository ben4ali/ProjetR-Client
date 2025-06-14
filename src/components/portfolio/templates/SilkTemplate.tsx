import { FC } from "react";
import { Portfolio } from "../../../types/Portfolio";
import Silk from "../../../blocks/Backgrounds/Silk/Silk";
import SplitText from "../../../blocks/TextAnimations/SplitText/SplitText";
import ShinyText from "../../../blocks/TextAnimations/ShinyText/ShinyText";
import CircularText from "../../../blocks/TextAnimations/CircularText/CircularText";
import { motion } from "framer-motion";
import { ParallaxText } from "../../ui/parallax-text";

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
      className={`relative h-600 bg-zinc-800 overflow-hidden min-h-screen flex flex-col ${
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
            <h2 className="text-lg font-semibold pr-3 border-r">
              {user.firstName}{" "}
            </h2>
          </div>
        </a>
        {/* Links */}
        <ul className="mt-1 flex gap-3">
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
              Projets
            </a>
          </li>
          <li>
            <a
              href={"#projets"}
              className="pb-2 relative hover:after:w-full after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-white after:w-0 after:transition-all after:duration-300"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
      {/* hero section */}
      <section
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
      </section>
      {/* About Section */}
      <section
        className="py-10 bg-gradient-to-t from-zinc-800 via-zinc-800 to-emerald-950 relative  text-white"
        id="a-propos"
      >
        <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-4 ">
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
          <div>
            {projets.length > 0 && (
              <ShinyText
                text={`${projets.length} + projets réalisés`}
                className="mt-4 text-2xl "
              />
            )}
          </div>
          <div
            className={`hidden lg:block size-50 absolute  bottom-15 rotate-25 ${
              isPreview ? "scale-75 right-2" : "right-10"
            }`}
          >
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
      </section>
      {/* Compétences */}
      <section className="py-10  text-white relative" id="competences">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-6 border-b w-[60%] p-3">
            Compétences
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills?.map((skill, index) => (
              <motion.div
                key={index}
                className="relative bg-gradient-to-bl from-zinc-800/40 to-zinc-950/40 backdrop-blur-lg p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, delay: index * 0.1 },
                }}
                whileHover={{
                  scale: 1.02,
                  rotate: (Math.random() - 0.5) * 30,
                  transition: { duration: 0.3 },
                }}
              >
                <h3 className="text-xl font-semibold mb-2">{skill.name}</h3>
                <div className="w-full bg-gray-700 rounded-full h-1 overflow-hidden">
                  <motion.div
                    className="bg-teal-500 h-full"
                    initial={{ width: 0 }}
                    whileInView={{
                      width: `${skill.level}%`,
                      transition: { duration: 0.5, delay: index * 0.1 },
                    }}
                    style={{ width: `${skill.level}%` }}
                  ></motion.div>
                </div>
                <motion.div
                  className="absolute top-2 right-2 text-xs text-gray-400"
                  initial={{ opacity: 0 }}
                  whileInView={{
                    opacity: 1,
                    transition: { duration: 0.3, delay: index * 0.1 },
                    }}>
                  {skill.level}%
                </motion.div>
              </motion.div>
            ))}
            {skills.length === 0 && (
              <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center text-gray-400">
                Aucune compétence ajoutée pour le moment.
              </div>
            )}
          </div>
        </div>
        <div
          className={`hidden lg:block size-50 absolute  bottom-15 -rotate-25 ${
            isPreview ? "scale-75 left-2" : "left-10"
          }`}
        >
          <CircularText
            text="PASSION*COMPÉTENCES*EXPÉRIENCE*"
            spinDuration={20}
            className="text-emerald-300 size-full text-sm text-center"
          />
          <div className=" pointer-events-none absolute inset-0 flex items-center justify-center text-2xl font-bold text-emerald-300">
            {"< />"}
          </div>
        </div>
      </section>
      {/* Inbetween */}
      <section className="py-10 bg-emerald-900 relative text-emerald-100">
        <ParallaxText baseVelocity={-1}>
          Passion * travail * créativité * innovation *&nbsp;
        </ParallaxText>
        <ParallaxText baseVelocity={1}>
          Développeur * designer * créateur d'expériences *&nbsp;
        </ParallaxText>
      </section>
      {/* footer - copyright */}
      <footer className="bg-zinc-800 text-white py-4 mt-auto border-t border-emerald-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-sm flex flex-col items-center gap-2">
            <div>
              <span>
                portfolio de {user.firstName} {user.lastName} crée sur
              </span>{" "}
              <a
                href="/"
                className="pb-1 relative hover:after:w-full after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-white after:w-0 after:transition-all after:duration-300"
              >
                ProjetR
              </a>
            </div>
            <span className="text-gray-400">
              © {new Date().getFullYear()} L'équipe de ProjetR - Tous droits
              réservés.
            </span>
          </div>
          <div className="flex justify-center gap-4 mt-2">
            <a
              href="https://git.dti.crosemont.quebec/dahamada1/nextgen-projects-projets-nouvelle-generation"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              GitLab de ProjetR
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
