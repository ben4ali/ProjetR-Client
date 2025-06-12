import { FC, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Portfolio } from "../../../types/Portfolio";
import { Projet } from "../../../types/Projet";
import { ProjectVideoDialog } from "../ProjectVideoDialog";

gsap.registerPlugin(ScrollTrigger);

interface MeteorTemplateProps {
  portfolio: Portfolio;
  isPreview?: boolean;
}

export const MeteorTemplate: FC<MeteorTemplateProps> = ({
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
  const meteorShowRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  // Meteor shower animation
  useEffect(() => {
    if (isPreview) return;

    const createMeteor = () => {
      const meteor = document.createElement("div");
      meteor.className =
        "meteor absolute w-1 h-20 bg-gradient-to-b from-orange-400 to-transparent rounded-full opacity-80";
      meteor.style.left = Math.random() * 100 + "%";
      meteor.style.top = "-100px";
      meteor.style.transform = "rotate(45deg)";

      if (meteorShowRef.current) {
        meteorShowRef.current.appendChild(meteor);

        gsap.to(meteor, {
          y: window.innerHeight + 200,
          duration: Math.random() * 3 + 2,
          ease: "power2.out",
          onComplete: () => {
            meteor.remove();
          },
        });
      }
    };

    const meteorInterval = setInterval(createMeteor, 800);

    // GSAP animations
    if (skillsRef.current) {
      gsap.fromTo(
        skillsRef.current.children,
        { y: 50, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
          },
        },
      );
    }

    if (projectsRef.current) {
      gsap.fromTo(
        projectsRef.current.children,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 80%",
          },
        },
      );
    }

    return () => {
      clearInterval(meteorInterval);
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
      <div
        className={`relative min-h-screen bg-gray-900 text-white overflow-hidden ${
          isPreview ? "scale-75 origin-top" : ""
        }`}
      >
        {/* Meteor shower background */}
        <div
          ref={meteorShowRef}
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse at top, #1a202c 0%, #2d3748 50%, #1a202c 100%)",
          }}
        />

        {/* Animated background particles */}
        <div className="fixed inset-0 z-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-orange-400 rounded-full animate-pulse"
              style={{
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
                animationDelay: Math.random() * 3 + "s",
                animationDuration: Math.random() * 2 + 1 + "s",
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Hero Section */}
          <section className="min-h-screen flex items-center justify-center px-6">
            <div className="text-center">
              {" "}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="mb-8"
              >
                <motion.h1
                  className="text-6xl md:text-8xl font-bold mb-6"
                  style={{
                    background:
                      "linear-gradient(45deg, #ff6b35, #f7931e, #ff6b35)",
                    backgroundSize: "300% 300%",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    animation: "meteorGlow 3s ease-in-out infinite",
                  }}
                >
                  {user.firstName} {user.lastName}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="text-2xl md:text-3xl font-light text-orange-300 mb-4"
                >
                  {jobTitle || "Architecte Digital"}
                </motion.p>

                {hook && (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-lg text-red-400 font-medium mb-8 tracking-wide"
                    style={{
                      textShadow: "0 0 20px rgba(239, 68, 68, 0.5)",
                    }}
                  >
                    ✨ {hook} ✨
                  </motion.p>
                )}

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 200 }}
                  transition={{ duration: 1.5, delay: 0.6 }}
                  className="h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-12"
                />
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
              >
                {about ||
                  `Comme une météorite traversant l'atmosphère numérique, 
                je laisse une traînée d'innovation brillante dans chaque projet que je touche.`}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              >
                <motion.a
                  href="#projets"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(255, 107, 53, 0.6)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-full font-semibold text-lg shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
                >
                  🌟 Voir l&apos;Impact
                </motion.a>

                {cvDownloadUrl && (
                  <motion.button
                    onClick={handleCVDownload}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 border-2 border-orange-400 text-orange-400 rounded-full font-semibold text-lg hover:bg-orange-400 hover:text-gray-900 transition-all duration-300"
                  >
                    📄 Mon Parcours
                  </motion.button>
                )}
              </motion.div>
              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.3 }}
                className="mt-16 flex justify-center space-x-8"
              >
                {githubUrl && (
                  <motion.a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                    className="text-orange-400 hover:text-white transition-colors"
                  >
                    <svg
                      className="w-8 h-8"
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
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                    className="text-orange-400 hover:text-white transition-colors"
                  >
                    <svg
                      className="w-8 h-8"
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

          {/* Skills Constellation */}
          <section className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                  Constellation de Compétences
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto"></div>
              </motion.div>{" "}
              <div
                ref={skillsRef}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              >
                {skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0 0 20px rgba(255, 107, 53, 0.4)",
                      rotate: [0, -5, 5, 0],
                    }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 border border-orange-500/30 rounded-xl p-6 text-center cursor-pointer group relative overflow-hidden"
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="relative z-10">
                      <div className="text-orange-400 group-hover:text-white transition-colors font-semibold text-lg">
                        {skill.name}
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
                <div className="inline-flex items-center space-x-8 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 border border-orange-500/30">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-orange-400 mb-2">
                      {yearsOfExperience || 5}+
                    </div>
                    <div className="text-gray-400">
                      Années d&apos;Expérience
                    </div>
                  </div>
                  <div className="w-px h-16 bg-orange-500/30"></div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-red-400 mb-2">
                      {projets.length}
                    </div>
                    <div className="text-gray-400">Projets Réalisés</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Projects Meteor Trail */}
          <section id="projets" className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                  Traînée de Projets Brillants
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto"></div>
              </motion.div>

              <div ref={projectsRef} className="space-y-20">
                {projets.slice(0, 4).map((projet, index) => (
                  <motion.div
                    key={projet.id}
                    whileHover={{ scale: 1.02 }}
                    className={`grid md:grid-cols-2 gap-12 items-center ${
                      index % 2 === 1 ? "md:grid-flow-col-dense" : ""
                    }`}
                  >
                    {/* Project preview */}
                    <div
                      className={`${index % 2 === 1 ? "md:col-start-2" : ""} cursor-pointer group`}
                      onClick={() => setSelectedProject(projet)}
                    >
                      <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-orange-500 to-red-600 shadow-2xl">
                        {projet.demoUrl ? (
                          <>
                            <video
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              src={projet.demoUrl}
                              muted
                              loop
                              autoPlay
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold flex items-center space-x-2 shadow-lg">
                                <span>🎬</span>
                                <span>Voir la Démo</span>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-white text-2xl font-bold">
                              {projet.title}
                            </div>
                          </div>
                        )}

                        {/* Meteor effect on hover */}
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
                      </div>
                    </div>

                    {/* Project info */}
                    <div
                      className={`${index % 2 === 1 ? "md:col-start-1" : ""} space-y-6`}
                    >
                      <div>
                        <h3 className="text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                          {projet.title}
                        </h3>
                        <p className="text-gray-300 leading-relaxed text-lg">
                          {projet.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {projet.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 rounded-full text-sm font-medium border border-orange-500/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex space-x-4">
                        <motion.button
                          onClick={() => setSelectedProject(projet)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-white font-semibold shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
                        >
                          🚀 Explorer
                        </motion.button>

                        {projet.githubUrl && (
                          <motion.a
                            href={projet.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 border-2 border-orange-500 text-orange-400 rounded-lg font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300 flex items-center space-x-2"
                          >
                            <span>💻</span>
                            <span>Code</span>
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Launch Pad */}
          <section className="py-20 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                  Lancement de Mission
                </h2>
                <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                  Prêt à enflammer votre projet ? Contactez-moi et faisons
                  briller votre vision comme une étoile filante dans le cosmos
                  digital.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <motion.a
                    href={`mailto:${user.email}`}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 30px rgba(255, 107, 53, 0.6)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-full font-semibold text-lg shadow-lg hover:shadow-orange-500/25 transition-all duration-300 inline-flex items-center justify-center space-x-2"
                  >
                    <span>🚀</span>
                    <span>Démarrer la Mission</span>
                  </motion.a>

                  {linkedinUrl && (
                    <motion.a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 border-2 border-orange-400 text-orange-400 rounded-full font-semibold text-lg hover:bg-orange-400 hover:text-gray-900 transition-all duration-300 inline-flex items-center justify-center space-x-2"
                    >
                      <span>🌟</span>
                      <span>Connecter</span>
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
          variant="meteor"
        />
      )}
      <style>{`
        @keyframes meteorGlow {
          0%, 100% {
            filter: brightness(1) saturate(1);
          }
          50% {
            filter: brightness(1.2) saturate(1.5);
          }
        }

        .meteor {
          box-shadow: 0 0 10px rgba(255, 107, 53, 0.8);
        }
      `}</style>
    </>
  );
};
