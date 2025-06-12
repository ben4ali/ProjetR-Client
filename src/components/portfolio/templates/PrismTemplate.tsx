import { FC, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Portfolio } from "../../../types/Portfolio";
import { Projet } from "../../../types/Projet";
import { ProjectVideoDialog } from "../ProjectVideoDialog";

gsap.registerPlugin(ScrollTrigger);

interface PrismTemplateProps {
  portfolio: Portfolio;
  isPreview?: boolean;
}

export const PrismTemplate: FC<PrismTemplateProps> = ({
  portfolio,
  isPreview = false,
}) => {
  const {
    user,
    title,
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
  const heroRef = useRef<HTMLDivElement>(null);
  const prismRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPreview) return;

    // Floating prism animation
    if (prismRef.current) {
      gsap.to(prismRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
      });

      gsap.to(prismRef.current, {
        y: -30,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    }

    // Skills animation
    if (skillsRef.current) {
      const skillCards = skillsRef.current.querySelectorAll(".skill-card");

      gsap.fromTo(
        skillCards,
        {
          y: 100,
          opacity: 0,
          rotationX: -90,
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }

    // Parallax effect for hero
    if (heroRef.current) {
      gsap.to(heroRef.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
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
        className={`min-h-screen relative overflow-hidden ${
          isPreview ? "scale-75 origin-top" : ""
        }`}
        style={{
          background:
            "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
        }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-pink-300/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        {/* Header */}
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 p-6"
        >
          <nav className="flex justify-between items-center max-w-6xl mx-auto">
            <div className="glass-morphism px-6 py-3 rounded-2xl">
              <span className="text-white font-bold text-xl">
                {user.firstName}.prism
              </span>
            </div>{" "}
            <div className="glass-morphism px-6 py-3 rounded-2xl hidden md:block">
              <div className="flex space-x-8">
                {["À Propos", "Projets", "Compétences", "Contact"].map(
                  (item, index) => (
                    <motion.a
                      key={item}
                      href={`#${["about", "projects", "skills", "contact"][index]}`}
                      whileHover={{ scale: 1.1 }}
                      className="text-white/90 hover:text-white transition-colors font-medium"
                    >
                      {item}
                    </motion.a>
                  ),
                )}
              </div>
            </div>
          </nav>
        </motion.header>
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative z-10 min-h-screen flex items-center justify-center px-6"
        >
          <div className="text-center max-w-4xl mx-auto">
            {/* Floating Prism */}
            <div ref={prismRef} className="mb-12 relative">
              <div className="w-32 h-32 mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-white/10 backdrop-blur-lg rounded-3xl transform rotate-45 border border-white/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={user.avatar || "/default-avatar.png"}
                    alt={user.firstName}
                    className="w-20 h-20 rounded-2xl object-cover"
                  />
                </div>
              </div>
            </div>
            <motion.h1
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-bold mb-6 text-white drop-shadow-2xl"
            >
              {title || `${user.firstName} ${user.lastName}`}
            </motion.h1>{" "}
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl mb-8 text-white/90 font-light"
            >
              {jobTitle || "Développeur Prisme"}
            </motion.p>
            {hook && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="glass-morphism p-4 rounded-2xl mb-8 max-w-xl mx-auto"
              >
                <p className="text-lg text-white/95 font-medium">
                  ✨ {hook} ✨
                </p>
              </motion.div>
            )}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="glass-morphism p-8 rounded-3xl mb-12 max-w-2xl mx-auto"
            >
              {" "}
              <p className="text-white/90 leading-relaxed text-lg">
                {about ||
                  "Réfraction de la lumière en de belles expériences numériques grâce à la puissance du design prismatique et du développement de pointe."}
              </p>
            </motion.div>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="space-x-6"
            >
              {" "}
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="glass-morphism-button px-8 py-4 rounded-2xl font-semibold text-white inline-block"
              >
                Voir le Spectre
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="glass-morphism-button-outline px-8 py-4 rounded-2xl font-semibold text-white inline-block"
              >
                Réfracter la Lumière
              </motion.a>
            </motion.div>
          </div>
        </section>
        {/* Projects Section */}
        <section id="projects" className="relative z-10 py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              {" "}
              <h2 className="text-5xl font-bold text-white mb-4 drop-shadow-xl">
                Projets Prismatiques
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projets.slice(0, 6).map((projet, index) => (
                <motion.div
                  key={projet.id}
                  initial={{ y: 100, opacity: 0, rotateX: -15 }}
                  whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
                  className="group cursor-pointer perspective-1000"
                  onClick={() => setSelectedProject(projet)}
                >
                  <div className="glass-morphism-strong rounded-3xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-500">
                    <div className="h-48 relative overflow-hidden">
                      {projet.demoUrl ? (
                        <>
                          <video
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            src={projet.demoUrl}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="glass-morphism-button rounded-full p-4">
                              <svg
                                className="w-8 h-8 text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm flex items-center justify-center">
                          <div className="text-center text-white">
                            <div className="w-16 h-16 mx-auto mb-4 glass-morphism rounded-2xl flex items-center justify-center">
                              <svg
                                className="w-8 h-8"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-yellow-200 transition-colors">
                        {projet.title}
                      </h3>
                      <p className="text-white/80 mb-4 text-sm leading-relaxed">
                        {projet.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {projet.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 glass-morphism rounded-full text-xs text-white/90 border border-white/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              {/* Fallback projects */}{" "}
              {projets.length === 0 &&
                [
                  {
                    name: "Tableau de Bord Chromatique",
                    desc: "Visualisation de données multi-spectrales",
                    tech: ["React", "D3.js", "WebGL"],
                  },
                  {
                    name: "Coudeur de Lumière",
                    desc: "Simulation optique interactive",
                    tech: ["Three.js", "Physics", "GLSL"],
                  },
                  {
                    name: "Prisme OS",
                    desc: "Système d&apos;exploitation glassmorphique",
                    tech: ["Electron", "React", "CSS"],
                  },
                ].map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 100, opacity: 0, rotateX: -15 }}
                    whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
                    className="group cursor-pointer perspective-1000"
                  >
                    <div className="glass-morphism-strong rounded-3xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-500">
                      <div className="h-48 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm"></div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-yellow-200 transition-colors">
                          {project.name}
                        </h3>
                        <p className="text-white/80 mb-4 text-sm">
                          {project.desc}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 glass-morphism rounded-full text-xs text-white/90 border border-white/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </section>
        {/* Skills Section */}
        <section
          id="skills"
          ref={skillsRef}
          className="relative z-10 py-20 px-6"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              {" "}
              <h2 className="text-5xl font-bold text-white mb-4 drop-shadow-xl">
                Spectre Lumineux
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {(skills?.length > 0
                ? skills
                : [
                    "React",
                    "TypeScript",
                    "Three.js",
                    "GSAP",
                    "WebGL",
                    "Framer Motion",
                    "CSS3",
                    "Node.js",
                  ]
              ).map((skill) => (
                <div
                  key={typeof skill === "string" ? skill : skill.name}
                  className="skill-card glass-morphism-strong rounded-2xl p-6 text-center border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105"
                >
                  <div className="text-white font-semibold text-lg">
                    {typeof skill === "string" ? skill : skill.name}
                  </div>
                </div>
              ))}
            </div>

            {yearsOfExperience && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
                className="text-center mt-16"
              >
                <div className="glass-morphism-strong rounded-3xl p-8 inline-block border border-white/20">
                  {" "}
                  <div className="text-4xl font-bold text-white mb-2">
                    {yearsOfExperience}+
                  </div>
                  <div className="text-white/80">
                    Années d&apos;Expérience Prismatique
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>
        {/* Contact Section */}
        <section id="contact" className="relative z-10 py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              {" "}
              <h2 className="text-5xl font-bold text-white mb-4 drop-shadow-xl">
                Converger la Lumière
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8"></div>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Prêt à créer quelque chose qui déforme la réalité ? Réfractons
                nos idées ensemble.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-center space-x-6"
            >
              <motion.a
                href={`mailto:${user.email}`}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="glass-morphism-button px-8 py-4 rounded-2xl font-semibold text-white"
              >
                Envoyer Signal Lumineux
              </motion.a>

              {cvDownloadUrl && (
                <motion.button
                  onClick={handleCVDownload}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-morphism-button-outline px-8 py-4 rounded-2xl font-semibold text-white"
                >
                  Télécharger Prisme
                </motion.button>
              )}
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex justify-center space-x-8 mt-12"
            >
              {githubUrl && (
                <motion.a
                  href={githubUrl}
                  whileHover={{ scale: 1.2, rotateY: 15 }}
                  className="glass-morphism p-4 rounded-2xl text-white border border-white/20 hover:border-white/40 transition-all duration-300"
                >
                  <svg
                    className="w-6 h-6"
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
                  whileHover={{ scale: 1.2, rotateY: 15 }}
                  className="glass-morphism p-4 rounded-2xl text-white border border-white/20 hover:border-white/40 transition-all duration-300"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                  </svg>
                </motion.a>
              )}
            </motion.div>
          </div>
        </section>{" "}
      </div>

      {selectedProject && (
        <ProjectVideoDialog
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          variant="prism"
        />
      )}
    </>
  );
};
