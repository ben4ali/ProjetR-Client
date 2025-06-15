import { FC, useState } from "react";
import { motion } from "framer-motion";
import { Portfolio } from "../../../types/Portfolio";
import { Projet } from "../../../types/Projet";
import { ProjectVideoDialog } from "../ProjectVideoDialog";
import QuantumScene from "./QuantumScene";

interface QuantumTemplateProps {
  portfolio: Portfolio;
  isPreview?: boolean;
}

export const QuantumTemplate: FC<QuantumTemplateProps> = ({
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
  const [selectedProject, setSelectedProject] = useState<Projet | null>(null);

  const handleCVDownload = () => {
    if (cvDownloadUrl) {
      window.open(cvDownloadUrl, "_blank");
    }
  };
  return (
    <>
      {" "}
      <div
        className={`relative min-h-screen overflow-hidden bg-slate-950 text-white ${
          isPreview ? "origin-top scale-75" : ""
        }`}
      >
        {/* Quantum 3D Background */}
        <QuantumScene />

        {/* Content overlay */}
        <div className="relative z-10">
          {/* Hero Section */}
          <section className="flex min-h-screen items-center justify-center px-6">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="mb-8"
              >
                <h1 className="mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-6xl font-bold text-transparent md:text-8xl">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="mb-6 text-2xl font-light text-cyan-300 md:text-3xl">
                  {jobTitle || "Développeur Quantique"}
                </p>
                {hook && (
                  <motion.p
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="mb-6 inline-block rounded-lg border border-purple-400/20 bg-purple-500/10 px-4 py-2 text-lg font-medium text-purple-300 backdrop-blur-sm"
                  >
                    ⚛️ {hook}
                  </motion.p>
                )}
                <div className="mx-auto mb-8 h-1 w-32 bg-gradient-to-r from-cyan-400 to-purple-600"></div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-gray-200"
              >
                {" "}
                {about ||
                  `Explorateur des dimensions numériques, architecte de l&apos;impossible. 
                Je transforme les concepts quantiques en réalités tangibles à travers le code.`}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="flex flex-col items-center justify-center gap-6 sm:flex-row"
              >
                {" "}
                <motion.a
                  href="#projets"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 15px rgba(103, 232, 249, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:shadow-cyan-500/25"
                >
                  Explorer l&apos;Univers Quantique
                </motion.a>
                {cvDownloadUrl && (
                  <motion.button
                    onClick={handleCVDownload}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-full border-2 border-cyan-400 px-8 py-4 text-lg font-semibold text-cyan-400 transition-all duration-300 hover:bg-cyan-400 hover:text-black"
                  >
                    Télécharger CV
                  </motion.button>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="mt-16 text-center"
              >
                <div className="inline-flex items-center space-x-8">
                  {githubUrl && (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 transition-colors hover:text-white"
                    >
                      <svg
                        className="h-8 w-8"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                  )}
                  {linkedinUrl && (
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 transition-colors hover:text-white"
                    >
                      <svg
                        className="h-8 w-8"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Skills Quantum Matrix */}
          <section className="px-6 py-20">
            <div className="mx-auto max-w-6xl">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-16 text-center"
              >
                <h2 className="mb-4 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                  Compétences Quantiques
                </h2>
                <div className="mx-auto h-1 w-24 bg-gradient-to-r from-cyan-400 to-purple-600"></div>
              </motion.div>

              <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                {skills?.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 12px rgba(103, 232, 249, 0.3)",
                    }}
                    className="group cursor-pointer rounded-xl border border-cyan-500/30 bg-gradient-to-br from-gray-900/80 to-blue-900/40 p-6 text-center backdrop-blur-sm hover:bg-gradient-to-br hover:from-gray-800/90 hover:to-blue-800/50"
                  >
                    <div className="font-semibold text-cyan-100 transition-colors group-hover:text-white">
                      {skill.name}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="mt-16 text-center"
              >
                <div className="mb-2 text-6xl font-bold text-cyan-400">
                  {yearsOfExperience || 5}+
                </div>
                <div className="text-xl text-gray-400">
                  Années d&apos;Exploration Quantique
                </div>
              </motion.div>
            </div>
          </section>

          {/* Projects Dimension */}
          <section id="projets" className="px-6 py-20">
            <div className="mx-auto max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-16 text-center"
              >
                <h2 className="mb-4 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                  Projets Multi-Dimensionnels
                </h2>
                <div className="mx-auto h-1 w-24 bg-gradient-to-r from-cyan-400 to-purple-600"></div>
              </motion.div>

              <div className="grid gap-12 md:grid-cols-2">
                {projets.slice(0, 4).map((projet, index) => (
                  <motion.div
                    key={projet.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    className="group cursor-pointer"
                    onClick={() => setSelectedProject(projet)}
                  >
                    <div className="relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-gray-900/90 to-blue-900/50 backdrop-blur-sm">
                      {/* Project preview */}
                      <div className="relative aspect-video overflow-hidden">
                        {projet.demoUrl ? (
                          <>
                            <video
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                              src={projet.demoUrl}
                              muted
                              loop
                              autoPlay
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                              <div className="flex items-center space-x-2 rounded-full bg-cyan-500/90 px-6 py-3 font-semibold text-black">
                                <span>▶</span>
                                <span>Entrer dans la Dimension</span>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan-500 to-purple-600">
                            <div className="text-xl font-bold text-black">
                              {projet.title}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Project info */}
                      <div className="p-6">
                        {" "}
                        <h3 className="mb-3 text-2xl font-bold text-gray-100">
                          {projet.title}
                        </h3>
                        <p className="mb-4 line-clamp-3 text-gray-200">
                          {projet.description}
                        </p>
                        <div className="mb-4 flex flex-wrap gap-2">
                          {projet.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-cyan-500/30 bg-cyan-500/20 px-3 py-1 text-sm text-cyan-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProject(projet);
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 font-semibold text-white"
                          >
                            Explorer
                          </motion.button>

                          {projet.githubUrl && (
                            <a
                              href={projet.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-cyan-400 transition-colors hover:text-white"
                            >
                              <svg
                                className="h-6 w-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Portal */}
          <section className="px-6 py-20">
            <div className="mx-auto max-w-4xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="mb-8 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                  Ouvrir un Portail Quantique
                </h2>
                <p className="mx-auto mb-12 max-w-2xl text-xl text-gray-200">
                  Prêt à explorer de nouvelles dimensions ensemble ?
                  Contactez-moi pour transformer vos idées en réalité quantique.
                </p>

                <div className="flex flex-col justify-center gap-6 sm:flex-row">
                  {" "}
                  <motion.a
                    href={`mailto:${user.email}`}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 15px rgba(103, 232, 249, 0.4)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center space-x-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:shadow-cyan-500/25"
                  >
                    <span>📧</span>
                    <span>Initier le Contact</span>
                  </motion.a>
                  {linkedinUrl && (
                    <motion.a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center justify-center space-x-2 rounded-full border-2 border-cyan-400 px-8 py-4 text-lg font-semibold text-cyan-400 transition-all duration-300 hover:bg-cyan-400 hover:text-black"
                    >
                      <span>💼</span>
                      <span>LinkedIn</span>
                    </motion.a>
                  )}
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </div>{" "}
      {selectedProject && (
        <ProjectVideoDialog
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          project={selectedProject}
          variant="quantum"
        />
      )}
    </>
  );
};
