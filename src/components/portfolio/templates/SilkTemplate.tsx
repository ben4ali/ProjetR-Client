import { FC, useState } from "react";
import { Portfolio } from "../../../types/Portfolio";
import Silk from "../../../blocks/Backgrounds/Silk/Silk";
import SplitText from "../../../blocks/TextAnimations/SplitText/SplitText";
import ShinyText from "../../../blocks/TextAnimations/ShinyText/ShinyText";
import CircularText from "../../../blocks/TextAnimations/CircularText/CircularText";
import { motion } from "framer-motion";
import { ParallaxText } from "../../ui/parallax-text";
import { Projet } from "../../../types/Projet";
import { ProjectVideoDialog } from "../ProjectVideoDialog";
import { MOCK_PROJECTS } from "./mock-data";

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
    projets = [],
    githubUrl,
    linkedinUrl,
    yearsOfExperience,
    cvDownloadUrl,
    jobTitle,
  } = portfolio;
  const [selectedProject, setSelectedProject] = useState<null | Projet>(null);

  return (
    <div
      className={`relative flex min-h-screen flex-col overflow-hidden bg-zinc-800 ${
        isPreview ? "origin-top scale-75" : ""
      }`}
    >
      {/* Nav */}
      <nav className="fixed top-5 left-2 z-10 flex w-fit gap-3 rounded-lg bg-teal-900/40 p-4 px-6 text-white shadow-md backdrop-blur-lg sm:left-5">
        {/* Avatar */}
        <a href="#hero" className="hidden items-center gap-4 sm:flex">
          <img
            src={user.avatar || "/default-avatar.png"}
            alt={`${user.firstName} ${user.lastName}`}
            className="h-6 w-6 rounded-full sm:h-8 sm:w-8"
          />
          <h2 className="border-r pr-3 text-lg font-semibold">
            {user.firstName}{" "}
          </h2>
        </a>
        {/* Links */}
        <ul className="mt-1 flex gap-3">
          <li>
            <a
              href={"#a-propos"}
              className="relative pb-2 text-sm after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full sm:text-base"
            >
              À propos
            </a>
          </li>
          <li>
            <a
              href={"#competences"}
              className="relative pb-2 text-sm after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full sm:text-base"
            >
              Compétences
            </a>
          </li>
          <li>
            <a
              href={"#projets"}
              className="relative pb-2 text-sm after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full sm:text-base"
            >
              Projets
            </a>
          </li>
          <li>
            <a
              href={"#contact"}
              className="relative pb-2 text-sm after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full sm:text-base"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
      {/* hero section */}
      <section
        id="hero"
        className="relative flex h-150 w-full flex-col items-center justify-center"
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
        <div className="absolute inset-0 z-4 bg-gradient-to-b from-transparent via-transparent to-emerald-950" />
        <div className="flex items-center justify-center gap-4 text-white">
          <SplitText
            text={`${user.firstName} ${user.lastName}`}
            className="text-center text-3xl font-semibold"
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
            className="text-center text-2xl"
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
          className="z-4 mt-4 text-center text-lg"
        />
      </section>
      {/* About Section */}
      <section
        className="relative bg-gradient-to-t from-zinc-800 via-zinc-800 to-emerald-950 py-10 text-white"
        id="a-propos"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8">
          <h2 className="mb-4 w-[60%] border-b p-3 text-3xl font-bold">
            À propos
          </h2>
          <p className="text-xl text-gray-300">
            {about ||
              "Je suis un développeur passionné par la création de solutions innovantes."}
          </p>
          {cvDownloadUrl && (
            <a
              href={cvDownloadUrl}
              download={`${user.firstName}-${user.lastName}-CV.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block max-w-fit transform rounded-lg bg-gradient-to-r from-emerald-700 to-emerald-800 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-101 hover:from-emerald-700 hover:to-emerald-900"
            >
              Télécharger mon CV
            </a>
          )}
          <div>
            {projets.length > 0 && (
              <ShinyText
                text={`${projets.length} + projets réalisés`}
                className="mt-4 text-2xl"
              />
            )}
          </div>
          <div
            className={`absolute bottom-15 hidden size-50 rotate-25 lg:block ${
              isPreview ? "right-2 scale-75" : "right-10"
            }`}
          >
            <CircularText
              text="NOMBRES*D'ANNÉES*D'ÉXPÈRIENCES*"
              spinDuration={20}
              className="size-full text-center text-sm text-emerald-300"
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-2xl font-bold text-emerald-300">
              {yearsOfExperience ? `${yearsOfExperience} ans` : "N/A"}
            </div>
          </div>
          <div className="mt-6 block rounded-lg border border-emerald-300/30 bg-emerald-900/20 p-4 lg:hidden">
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-emerald-300 sm:text-4xl">
                {yearsOfExperience ? `${yearsOfExperience} ans` : "N/A"}
              </div>
              <div className="text-sm text-gray-300 sm:text-base">
                Années d'expérience
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Compétences */}
      <section
        className="relative bg-gradient-to-b from-zinc-800 via-zinc-800 to-emerald-950 py-10 text-white"
        id="competences"
      >
        <div className="mx-auto max-w-6xl px-4 py-8">
          <h2 className="mb-6 w-[60%] border-b p-3 text-3xl font-bold">
            Compétences
          </h2>
          <div className="grid grid-cols-1 gap-6 pb-20 sm:grid-cols-2 lg:grid-cols-3">
            {skills?.map((skill, index) => (
              <motion.div
                key={index}
                className="relative rounded-lg bg-gradient-to-bl from-zinc-800/40 to-zinc-950/40 p-4 shadow-md backdrop-blur-lg transition-shadow duration-300 hover:shadow-lg"
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
                viewport={{ once: true, amount: 0.3 }}
              >
                <h3 className="mb-2 text-xl font-semibold">{skill.name}</h3>
                <div className="h-1 w-full overflow-hidden rounded-full bg-gray-700">
                  <motion.div
                    className="h-full bg-teal-500"
                    initial={{ width: 0 }}
                    whileInView={{
                      width: `${skill.level}%`,
                      transition: { duration: 0.5, delay: index * 0.1 },
                    }}
                    style={{ width: `${skill.level}%` }}
                    viewport={{ once: true, amount: 0.3 }}
                  ></motion.div>
                </div>
                <motion.div
                  className="absolute top-2 right-2 text-xs text-gray-400"
                  initial={{ opacity: 0 }}
                  whileInView={{
                    opacity: 1,
                    transition: { duration: 0.3, delay: index * 0.1 },
                  }}
                >
                  {skill.level}%
                </motion.div>
              </motion.div>
            ))}
            {skills.length === 0 && (
              <div className="col-span-1 text-center text-gray-400 sm:col-span-2 lg:col-span-3">
                Aucune compétence ajoutée pour le moment.
              </div>
            )}
          </div>
        </div>
        <div
          className={`absolute bottom-15 hidden size-50 -rotate-25 lg:block ${
            isPreview ? "left-2 scale-75" : "left-10"
          }`}
        >
          <CircularText
            text="PASSION*COMPÉTENCES*EXPÉRIENCE*"
            spinDuration={20}
            className="size-full text-center text-sm text-emerald-300"
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-2xl font-bold text-emerald-300">
            {"< />"}
          </div>
        </div>
      </section>
      {/* Inbetween */}
      <section className="relative bg-emerald-950 py-10 text-emerald-100">
        <ParallaxText baseVelocity={-1}>
          Passion * travail * créativité * innovation *&nbsp;
        </ParallaxText>
        <ParallaxText baseVelocity={1}>
          Développeur * designer * créateur d'expériences *&nbsp;
        </ParallaxText>
      </section>
      {/* Projets */}
      <section
        className="relative bg-gradient-to-t from-zinc-800 via-zinc-800 to-emerald-950 py-10 text-white"
        id="projets"
      >
        <div className="mx-auto max-w-6xl px-4 py-8">
          <h2 className="mb-6 w-[60%] border-b p-3 text-3xl font-bold">
            Projets
          </h2>
          {projets.length === 0 && !isPreview && (
            <p className="text-xl text-gray-300">
              Aucun projet disponible pour le moment.
            </p>
          )}
          {projets.length === 0 && isPreview && (
            <SilkProjectList
              projets={MOCK_PROJECTS}
              onProjectClick={(project) => setSelectedProject(project)}
            />
          )}
          {projets.length > 0 && (
            <SilkProjectList
              projets={projets}
              onProjectClick={(project) => setSelectedProject(project)}
            />
          )}
        </div>
      </section>
      {/* Contact */}
      <section className="relative mb-10 py-5 text-white" id="contact">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-8">
          <div className="relative overflow-hidden rounded-lg bg-gradient-to-bl from-zinc-800/40 to-zinc-950/40 px-4 py-8 shadow-md">
            <div className="flex flex-col p-3">
              <h2 className="w-fit text-3xl font-bold">Travaillons Ensemble</h2>
              <ShinyText
                text="Prêt à donner vie à vos projets ? Contactez-moi pour discuter de vos besoins"
                className="mb-4 text-lg"
              />
            </div>
            <div className="ml-3 flex items-center gap-4">
              {githubUrl && (
                <motion.a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-r from-emerald-700 to-emerald-800 text-white shadow-lg transition-all duration-300 hover:scale-101 hover:from-emerald-700 hover:to-emerald-900"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  viewport={{ once: true }}
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </motion.a>
              )}

              {linkedinUrl && (
                <motion.a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-r from-emerald-700 to-emerald-800 text-white shadow-lg transition-all duration-300 hover:scale-101 hover:from-emerald-700 hover:to-emerald-900"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.9 }}
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                  viewport={{ once: true }}
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </motion.a>
              )}

              {user.email && (
                <motion.a
                  href={`mailto:${user.email}`}
                  className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-r from-emerald-700 to-emerald-800 text-white shadow-lg transition-all duration-300 hover:scale-101 hover:from-emerald-700 hover:to-emerald-900"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1.0 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  viewport={{ once: true }}
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </motion.a>
              )}
              <div className="absolute top-0 right-0 h-16 w-16">
                <div className="absolute top-[35px] right-[-60px] flex w-[220px] rotate-45 transform items-center justify-center bg-gradient-to-r from-emerald-700 to-emerald-800 py-1 text-sm font-semibold text-white shadow-lg">
                  <p className="w-[90px] text-center">Satisfaction garantie</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* footer - copyright */}
      <footer className="mt-auto border-t border-emerald-900 bg-zinc-800 py-4 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="flex flex-col items-center gap-2 text-sm">
            <div>
              <span>
                Portfolio de {user.firstName} {user.lastName} - Crée sur
              </span>{" "}
              <a
                href="/"
                className="relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                ProjetR
              </a>
            </div>
            <span className="text-gray-400">
              © {new Date().getFullYear()} L'équipe de ProjetR - Tous droits
              réservés.
            </span>
          </div>
          <div className="mt-2 flex justify-center gap-4">
            <a
              href="https://git.dti.crosemont.quebec/dahamada1/nextgen-projects-projets-nouvelle-generation"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors hover:text-white"
            >
              GitLab de ProjetR
            </a>
          </div>
        </div>
      </footer>

      {selectedProject && (
        <ProjectVideoDialog
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          variant="silk"
        />
      )}
    </div>
  );
};

interface SilkProjectListProps {
  projets: Projet[];
  onProjectClick: (project: Projet) => void;
}

function SilkProjectList({ projets, onProjectClick }: SilkProjectListProps) {
  return (
    <div className="flex flex-col gap-10">
      {projets.map((project, index) => (
        <motion.div
          key={project.id}
          className={`flex cursor-pointer flex-col rounded-lg ${
            index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
          } items-start gap-8 border border-transparent p-5 transition-colors duration-200 hover:border-1 hover:border-emerald-900 hover:bg-emerald-900/10`}
          onClick={() => onProjectClick(project)}
          initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: index * 0.2 }}
          viewport={{ once: true }}
        >
          <video
            className="mb-4 aspect-video w-full rounded-lg object-cover md:w-[45%] md:min-w-[45%]"
            src={project.demoUrl}
          />
          <div className={` ${index % 2 !== 0 ? "mr-auto" : ""}`}>
            <h3 className="mb-2 text-2xl font-semibold">{project.title}</h3>
            <p className="mb-4 line-clamp-4 text-gray-300">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="rounded-full bg-emerald-900 px-3 py-1 text-sm text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
