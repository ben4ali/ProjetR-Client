import { FC, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Portfolio } from "../../../types/Portfolio";
import { Projet } from "../../../types/Projet";
import { ProjectVideoDialog } from "../ProjectVideoDialog";

interface NeuralTemplateProps {
  portfolio: Portfolio;
  isPreview?: boolean;
}

export const NeuralTemplate: FC<NeuralTemplateProps> = ({
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
    cvDownloadUrl,
    jobTitle,
  } = portfolio;

  const [selectedProject, setSelectedProject] = useState<Projet | null>(null);
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Neural network animation
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const nodes: Array<{ x: number; y: number; vx: number; vy: number }> = [];
    const connections: Array<{ from: number; to: number; strength: number }> =
      [];

    // Create nodes
    for (let i = 0; i < 50; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    // Create connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = Math.sqrt(
          Math.pow(nodes[i].x - nodes[j].x, 2) +
            Math.pow(nodes[i].y - nodes[j].y, 2),
        );
        if (distance < 150) {
          connections.push({
            from: i,
            to: j,
            strength: 1 - distance / 150,
          });
        }
      }
    }

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      });

      // Draw connections
      connections.forEach((conn) => {
        const from = nodes[conn.from];
        const to = nodes[conn.to];
        const distance = Math.sqrt(
          Math.pow(from.x - to.x, 2) + Math.pow(from.y - to.y, 2),
        );

        if (distance < 150) {
          ctx.beginPath();
          ctx.moveTo(from.x, from.y);
          ctx.lineTo(to.x, to.y);
          ctx.strokeStyle = `rgba(59, 130, 246, ${conn.strength * 0.3})`;
          ctx.lineWidth = conn.strength * 2;
          ctx.stroke();
        }
      });

      // Draw nodes
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#3b82f6";
        ctx.fill();

        // Glow effect
        ctx.beginPath();
        ctx.arc(node.x, node.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(59, 130, 246, 0.2)";
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Cycling skills effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkillIndex((prev) => (prev + 1) % Math.max(skills?.length, 1));
    }, 2000);
    return () => clearInterval(interval);
  }, [skills.length]);

  const handleCVDownload = () => {
    if (cvDownloadUrl) {
      window.open(cvDownloadUrl, "_blank");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <div
        className={`bg-black text-white min-h-screen relative overflow-hidden ${
          isPreview ? "scale-75 origin-top" : ""
        }`}
      >
        {/* Neural network background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
          }}
        />

        {/* Header */}
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 p-6"
        >
          <nav className="flex justify-between items-center max-w-6xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
              {user.firstName}.neural
            </motion.div>{" "}
            <div className="space-x-8 hidden md:flex">
              {["À Propos", "Projets", "Compétences", "Contact"].map(
                (item, index) => (
                  <motion.a
                    key={item}
                    href={`#${["about", "projects", "skills", "contact"][index]}`}
                    whileHover={{ scale: 1.1, color: "#60a5fa" }}
                    className="transition-colors hover:text-blue-400"
                  >
                    {item}
                  </motion.a>
                ),
              )}
            </div>
          </nav>
        </motion.header>

        {/* Hero Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 min-h-screen flex items-center justify-center px-6"
        >
          <div className="text-center max-w-4xl mx-auto">
            <motion.div variants={itemVariants} className="mb-8">
              <motion.img
                src={user.avatar || "/default-avatar.png"}
                alt={user.firstName}
                className="w-40 h-40 rounded-full mx-auto border-4 border-blue-400 shadow-2xl"
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 50px rgba(59, 130, 246, 0.5)",
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-8xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {title || `${user.firstName} ${user.lastName}`}
              </span>
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="text-2xl mb-8 h-8 flex items-center justify-center"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentSkillIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-gray-300"
                >
                  {skills[currentSkillIndex]?.name ||
                    jobTitle ||
                    "Développeur Neural"}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            {hook && (
              <motion.div variants={itemVariants} className="mb-8">
                <motion.p
                  className="text-lg text-cyan-300 font-medium px-6 py-3 rounded-full border border-cyan-400/30 bg-cyan-400/5 backdrop-blur-sm inline-block"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(34, 211, 238, 0.3)",
                  }}
                >
                  🧠 {hook}
                </motion.p>
              </motion.div>
            )}

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              {about ||
                "Architecturer l&apos;avenir à travers les réseaux de neurones et les systèmes intelligents"}
            </motion.p>

            <motion.div variants={itemVariants} className="space-x-6">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                Explorer le Réseau Neural
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block border-2 border-blue-400 px-8 py-4 rounded-full font-semibold hover:bg-blue-400 hover:text-black transition-all duration-300"
              >
                Connecter les Nœuds
              </motion.a>
            </motion.div>
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          id="projects"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-10 py-20 px-6"
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
              Projets Neural
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projets.slice(0, 6).map((projet, index) => (
                <motion.div
                  key={projet.id}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProject(projet)}
                >
                  <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-blue-400/50 transition-all duration-300">
                    <div className="h-48 relative overflow-hidden">
                      {projet.demoUrl ? (
                        <>
                          <video
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            src={projet.demoUrl}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              className="bg-blue-500 rounded-full p-4"
                            >
                              <svg
                                className="w-8 h-8 text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </motion.div>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                              <svg
                                className="w-8 h-8"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                        {projet.title}
                      </h3>
                      <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                        {projet.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {projet.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs border border-blue-500/30"
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
                    name: "Visualiseur de Réseau Neural",
                    desc: "Visualisation interactive de modèles IA",
                    tech: ["Three.js", "TensorFlow", "React"],
                  },
                  {
                    name: "Simulateur Quantique",
                    desc: "Simulation avancée d&apos;états quantiques",
                    tech: ["WebGL", "Physics", "Algorithms"],
                  },
                  {
                    name: "Tableau de Bord IA",
                    desc: "Surveillance en temps réel de modèles ML",
                    tech: ["Python", "React", "D3.js"],
                  },
                ].map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group cursor-pointer"
                  >
                    <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-blue-400/50 transition-all duration-300">
                      <div className="h-48 bg-gradient-to-br from-blue-600 to-purple-600"></div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                          {project.name}
                        </h3>
                        <p className="text-gray-400 mb-4 text-sm">
                          {project.desc}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs border border-blue-500/30"
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
        </motion.section>

        {/* Skills Section */}
        <motion.section
          id="skills"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-10 py-20 px-6"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
              Voies Neurales
            </motion.h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {(skills?.length > 0
                ? skills
                : [
                    "Apprentissage Automatique",
                    "Apprentissage Profond",
                    "Réseaux de Neurones",
                    "Vision par Ordinateur",
                    "TAL",
                    "TensorFlow",
                    "PyTorch",
                    "Python",
                  ]
              ).map((skill, index) => (
                <motion.div
                  key={typeof skill === "string" ? skill : skill.name}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-blue-400/50 transition-all duration-300"
                >
                  <div className="text-blue-400 font-semibold">
                    {typeof skill === "string" ? skill : skill.name}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-10 py-20 px-6"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
              Initialiser Connexion
            </motion.h2>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-gray-300 mb-12"
            >
              Prêt à construire l&apos;avenir ensemble ? Connectons nos réseaux
              de neurones.
            </motion.p>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex justify-center space-x-6"
            >
              <motion.a
                href={`mailto:${user.email}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                Envoyer Signal
              </motion.a>

              {cvDownloadUrl && (
                <motion.button
                  onClick={handleCVDownload}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-blue-400 px-8 py-4 rounded-full font-semibold hover:bg-blue-400 hover:text-black transition-all duration-300"
                >
                  Télécharger Carte Neural
                </motion.button>
              )}
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex justify-center space-x-6 mt-12"
            >
              {githubUrl && (
                <motion.a
                  href={githubUrl}
                  whileHover={{ scale: 1.1, color: "#60a5fa" }}
                  className="text-gray-400 hover:text-blue-400 transition-colors"
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
                  whileHover={{ scale: 1.1, color: "#60a5fa" }}
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                  </svg>
                </motion.a>
              )}
            </motion.div>
          </div>
        </motion.section>
      </div>

      {selectedProject && (
        <ProjectVideoDialog
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          variant="neural"
        />
      )}
    </>
  );
};
