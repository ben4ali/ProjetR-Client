import { FC, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Portfolio } from "../../../types/Portfolio";
import { Projet } from "../../../types/Projet";
import { ProjectVideoDialog } from "../ProjectVideoDialog";

gsap.registerPlugin(ScrollTrigger);

interface HologramTemplateProps {
  portfolio: Portfolio;
  isPreview?: boolean;
}

export const HologramTemplate: FC<HologramTemplateProps> = ({
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
  const [hologramActive, setHologramActive] = useState(false);
  const hologramRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);

  // Hologram effects
  useEffect(() => {
    if (isPreview) return;

    // Activate hologram after page load
    const timer = setTimeout(() => setHologramActive(true), 1000);

    // Scanning line animation
    if (scanLineRef.current) {
      gsap.to(scanLineRef.current, {
        y: "100vh",
        duration: 2,
        repeat: -1,
        ease: "power2.inOut",
        delay: 1,
      });
    }

    // Hologram grid animation
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          stagger: 0.1,
          ease: "power3.out",
          delay: 1.5,
        },
      );
    } // Floating animation for skill items
    if (gridRef.current) {
      const skillItems = gridRef.current.querySelectorAll("div > div");
      gsap.to(skillItems, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        stagger: 0.2,
      });
    } // Glitch effect periodically (reduced intensity)
    const glitchInterval = setInterval(() => {
      if (hologramRef.current) {
        hologramRef.current.style.filter = "hue-rotate(30deg) contrast(110%)";
        setTimeout(() => {
          if (hologramRef.current) {
            hologramRef.current.style.filter =
              hologramActive || isPreview
                ? "drop-shadow(0 0 8px rgba(103, 232, 249, 0.3))"
                : "none";
          }
        }, 100);
      }
    }, 12000); // Less frequent

    return () => {
      clearTimeout(timer);
      clearInterval(glitchInterval);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [isPreview]);

  const handleCVDownload = () => {
    if (cvDownloadUrl) {
      window.open(cvDownloadUrl, "_blank");
    }
  };
  return (
    <>
      {" "}
      <div
        className={`relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-cyan-400 overflow-hidden ${
          isPreview ? "scale-75 origin-top" : ""
        }`}
      >
        {" "}
        {/* Holographic grid background */}
        <div className="fixed inset-0 opacity-10 bg-[linear-gradient(rgba(103,232,249,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,0.1)_1px,transparent_1px)] bg-[length:60px_60px]"></div>
        {/* Scanning line */}
        <div
          ref={scanLineRef}
          className="fixed left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-40 z-20 pointer-events-none -top-24"
        />
        {/* Hologram container */}{" "}
        <div
          ref={hologramRef}
          className={`relative z-10 transition-all duration-1000 ${
            hologramActive || isPreview
              ? "opacity-100 drop-shadow-[0_0_8px_rgba(103,232,249,0.3)]"
              : "opacity-0"
          }`}
        >
          {/* Hero Section */}
          <section className="min-h-screen flex items-center justify-center px-6 relative">
            {/* Holographic border */}
            <div className="absolute inset-8 border-2 border-cyan-400/30 rounded-lg">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-cyan-400"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-cyan-400"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-cyan-400"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-cyan-400"></div>
            </div>

            <div className="text-center relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="mb-8"
              >
                {" "}
                <motion.h1 className="text-6xl md:text-8xl font-bold mb-6 text-cyan-50 drop-shadow-[0_0_4px_#67e8f9]">
                  {user.firstName} {user.lastName}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1 }}
                  className="text-2xl md:text-3xl font-light text-cyan-300 mb-4 tracking-wider"
                >
                  &gt; {jobTitle || "Architecte Holographique"} &lt;
                </motion.p>
                {hook && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 1.1 }}
                    className="mb-8"
                  >
                    <p className="text-lg text-green-300 font-mono bg-black/70 border border-green-400/50 rounded px-4 py-2 inline-block backdrop-blur-sm">
                      [SYSTEM_HOOK] {hook}
                    </p>
                  </motion.div>
                )}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, delay: 1.2 }}
                  className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mb-12 max-w-md"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="bg-black/50 border border-cyan-400/50 rounded-lg p-8 mb-12 backdrop-blur-sm max-w-3xl mx-auto"
              >
                {" "}
                <p className="text-lg text-cyan-100 leading-relaxed font-mono">
                  {about ||
                    `INITIALISATION... SYSTÈME HOLOGRAPHIQUE ACTIVÉ
                  Développeur pionnier dans l'univers des technologies immersives.
                  Spécialisé dans la création d'expériences digitales transcendantes.`}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.8 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              >
                {" "}
                <motion.a
                  href="#projets"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 15px rgba(103, 232, 249, 0.5)",
                    filter: "brightness(1.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400 rounded-lg font-semibold text-lg hover:bg-cyan-400/10 transition-all duration-300 tracking-wider"
                >
                  &gt; ACCÉDER AUX PROJETS_
                </motion.a>
                {cvDownloadUrl && (
                  <motion.button
                    onClick={handleCVDownload}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 border-2 border-cyan-400/50 text-cyan-300 rounded-lg font-semibold text-lg hover:border-cyan-400 hover:text-cyan-100 transition-all duration-300 tracking-wider"
                  >
                    &gt; TÉLÉCHARGER.CV
                  </motion.button>
                )}
              </motion.div>

              {/* Holographic social links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2 }}
                className="mt-16 flex justify-center space-x-12"
              >
                {" "}
                {githubUrl && (
                  <motion.a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{
                      scale: 1.2,
                      filter: "drop-shadow(0 0 5px #67e8f9)",
                    }}
                    className="text-cyan-400 hover:text-cyan-100 transition-colors"
                  >
                    <svg
                      className="w-10 h-10"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                  </motion.a>
                )}
                {linkedinUrl && (
                  <motion.a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{
                      scale: 1.2,
                      filter: "drop-shadow(0 0 5px #67e8f9)",
                    }}
                    className="text-cyan-400 hover:text-cyan-100 transition-colors"
                  >
                    <svg
                      className="w-10 h-10"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </motion.a>
                )}
              </motion.div>
            </div>
          </section>

          {/* Skills Matrix */}
          <section className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                {" "}
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-cyan-50 font-mono drop-shadow-[0_0_4px_#67e8f9]">
                  &gt; MATRICE_COMPÉTENCES.EXE
                </h2>
                <div className="w-24 h-px bg-cyan-400 mx-auto"></div>
              </motion.div>

              <div
                ref={gridRef}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              >
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 10px rgba(103, 232, 249, 0.3)",
                      borderColor: "#67e8f9",
                    }}
                    className="bg-black/80 border border-cyan-400/50 rounded-lg p-6 text-center cursor-pointer group relative overflow-hidden backdrop-blur-sm transition-all duration-300 hover:bg-cyan-400/10"
                  >
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Corner indicators */}
                    <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-cyan-400"></div>
                    <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-cyan-400"></div>
                    <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-cyan-400"></div>
                    <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-cyan-400"></div>
                    <div className="relative z-10">
                      <div className="text-cyan-100 group-hover:text-white transition-colors font-mono font-bold">
                        {skill.name}
                      </div>
                      <div className="text-xs text-cyan-400/50 mt-1 group-hover:text-cyan-300/70 transition-colors">
                        ACTIVE
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center mt-16"
              >
                <div className="inline-block bg-black/80 border border-cyan-400/50 rounded-lg p-8 backdrop-blur-sm">
                  <div className="grid grid-cols-2 gap-8 text-center">
                    <div>
                      <div className="text-5xl font-bold text-cyan-400 mb-2 font-mono">
                        {yearsOfExperience || 5}+
                      </div>
                      <div className="text-cyan-400/70 font-mono text-sm">
                        ANNÉES_EXPÉRIENCE
                      </div>
                    </div>
                    <div>
                      <div className="text-5xl font-bold text-cyan-400 mb-2 font-mono">
                        {projets.length}
                      </div>
                      <div className="text-cyan-400/70 font-mono text-sm">
                        PROJETS_TERMINÉS
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Projects Database */}
          <section id="projets" className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                {" "}
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-cyan-50 font-mono drop-shadow-[0_0_4px_#67e8f9]">
                  &gt; BASE_DONNÉES_PROJETS.DB
                </h2>
                <div className="w-24 h-px bg-cyan-400 mx-auto"></div>
              </motion.div>

              <div className="space-y-16">
                {projets.slice(0, 4).map((projet, index) => (
                  <motion.div
                    key={projet.id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-black/80 border border-cyan-400/50 rounded-lg overflow-hidden backdrop-blur-sm group cursor-pointer"
                    onClick={() => setSelectedProject(projet)}
                  >
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Project preview */}
                      <div className="relative aspect-video md:aspect-auto">
                        {projet.demoUrl ? (
                          <>
                            <video
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              src={projet.demoUrl}
                              muted
                              loop
                              autoPlay
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="bg-cyan-500/90 text-black px-6 py-3 rounded font-mono font-bold flex items-center space-x-2">
                                <span>&gt;</span>
                                <span>EXÉCUTER.DÉMO</span>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border-r border-cyan-400/50">
                            <div className="text-cyan-400 text-2xl font-mono font-bold">
                              {projet.title}
                            </div>
                          </div>
                        )}

                        {/* Holographic overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-transparent opacity-50 group-hover:opacity-70 transition-opacity"></div>
                      </div>

                      {/* Project data */}
                      <div className="p-8 space-y-6">
                        {" "}
                        <div>
                          <h3 className="text-2xl font-bold text-cyan-50 mb-3 font-mono">
                            &gt; {projet.title}_
                          </h3>{" "}
                          <p className="text-cyan-50 leading-relaxed font-mono text-sm">
                            {projet.description}
                          </p>
                        </div>
                        <div className="space-y-3">
                          <div className="text-cyan-400/70 font-mono text-xs">
                            TECHNOLOGIES:
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {projet.tags.slice(0, 4).map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded border border-cyan-400/50 font-mono text-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex space-x-4 pt-4">
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProject(projet);
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 bg-cyan-500/20 border border-cyan-400 text-cyan-400 rounded font-mono font-bold hover:bg-cyan-400/20 hover:text-cyan-100 transition-all duration-300"
                          >
                            &gt; ANALYSER_
                          </motion.button>

                          {projet.githubUrl && (
                            <motion.a
                              href={projet.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-6 py-3 border border-cyan-400/50 text-cyan-400/70 rounded font-mono hover:border-cyan-400 hover:text-cyan-100 transition-all duration-300 flex items-center space-x-2"
                            >
                              <span>&gt;</span>
                              <span>CODE.SOURCE</span>
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Interface */}
          <section className="py-20 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-black/80 border border-cyan-400/50 rounded-lg p-12 backdrop-blur-sm"
              >
                {" "}
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-cyan-50 font-mono drop-shadow-[0_0_4px_#67e8f9]">
                  &gt; INTERFACE_CONTACT.EXE
                </h2>
                <p className="text-lg text-cyan-50 mb-12 font-mono leading-relaxed">
                  ÉTABLISSEMENT DE CONNEXION SÉCURISÉE...
                  <br />
                  Prêt à collaborer sur des projets révolutionnaires ?
                  <br />
                  INITIALISATION DU PROTOCOLE DE COMMUNICATION...
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <motion.a
                    href={`mailto:${user.email}`}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 15px rgba(103, 232, 249, 0.5)",
                      filter: "brightness(1.1)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-cyan-500/20 border-2 border-cyan-400 rounded font-mono font-bold text-lg hover:bg-cyan-400/20 transition-all duration-300 inline-flex items-center justify-center space-x-2"
                  >
                    <span>&gt;</span>
                    <span>ENVOYER.MESSAGE</span>
                  </motion.a>

                  {linkedinUrl && (
                    <motion.a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 border-2 border-cyan-400/50 text-cyan-400/70 rounded font-mono font-bold text-lg hover:border-cyan-400 hover:text-cyan-100 transition-all duration-300 inline-flex items-center justify-center space-x-2"
                    >
                      <span>&gt;</span>
                      <span>RÉSEAU.PROFESSIONNEL</span>
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
          variant="hologram"
        />
      )}
    </>
  );
};
