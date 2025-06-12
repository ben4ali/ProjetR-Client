import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FC, useEffect, useRef, useState } from "react";
import { Portfolio } from "../../../types/Portfolio";
import { Projet } from "../../../types/Projet";
import { ProjectVideoDialog } from "../ProjectVideoDialog";

gsap.registerPlugin(ScrollTrigger);

interface PixelTemplateProps {
  portfolio: Portfolio;
  isPreview?: boolean;
}

export const PixelTemplate: FC<PixelTemplateProps> = ({
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
  const [score, setScore] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPreview) return;

    // Pixel floating animation
    if (heroRef.current) {
      const pixels = heroRef.current.querySelectorAll(".floating-pixel");
      gsap.fromTo(
        pixels,
        { y: 0, opacity: 1 },
        {
          y: -20,
          duration: 2,
          repeat: -1,
          yoyo: true,
          stagger: 0.2,
          ease: "power2.inOut",
        },
      );
    }

    // Skills power-up animation
    if (skillsRef.current) {
      const skillBars = skillsRef.current.querySelectorAll(".skill-bar");
      gsap.fromTo(
        skillBars,
        { width: 0 },
        {
          width: "100%",
          duration: 1.5,
          stagger: 0.1,
          ease: "steps(10)",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
          },
        },
      );
    }

    // Projects arcade animation
    if (projectsRef.current) {
      const cards = projectsRef.current.querySelectorAll(".project-card");
      gsap.fromTo(
        cards,
        { scale: 0, rotation: 180 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 80%",
          },
        },
      );
    }

    // Score animation
    const scoreInterval = setInterval(() => {
      setScore((prev) => prev + Math.floor(Math.random() * 10));
    }, 3000);

    return () => clearInterval(scoreInterval);
  }, [isPreview]);

  const handleCVDownload = () => {
    if (cvDownloadUrl) {
      window.open(cvDownloadUrl, "_blank");
    }
  };

  const pixelColors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-orange-500",
  ];
  return (
    <>
      <div
        className={`relative min-h-screen bg-black text-white overflow-hidden ${
          isPreview ? "scale-75 origin-top" : ""
        }`}
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 20px,
              rgba(0, 255, 0, 0.05) 20px,
              rgba(0, 255, 0, 0.05) 22px
            ),
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 20px,
              rgba(255, 255, 0, 0.03) 20px,
              rgba(255, 255, 0, 0.03) 22px
            )
          `,
        }}
      >
        {/* Floating Pixel Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-3 h-3 ${
                pixelColors[i % pixelColors.length]
              } border border-white/30`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                rotate: [0, 360],
                scale: [1, Math.random() * 0.5 + 0.5, 1],
              }}
              transition={{
                duration: Math.random() * 10 + 5,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        {/* Score Board - Top Left */}
        <motion.div
          className="fixed top-8 left-8 z-20 bg-black border-4 border-green-500 p-4 font-mono"
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, type: "spring", bounce: 0.6 }}
        >
          <div className="text-green-400 text-sm mb-2">PLAYER 1</div>
          <div className="text-yellow-400 text-xl font-bold">
            {score.toString().padStart(8, "0")}
          </div>
          <div className="text-cyan-400 text-xs mt-1">
            LEVEL {yearsOfExperience || 1}
          </div>
        </motion.div>

        {/* Player Avatar - Top Right */}
        <motion.div
          className="fixed top-8 right-8 z-20"
          initial={{ x: 200, opacity: 0, rotate: 180 }}
          animate={{ x: 0, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
        >
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-purple-600 border-4 border-white relative">
              {/* Pixel avatar grid */}
              <div className="absolute inset-1 grid grid-cols-5 grid-rows-5 gap-px">
                {[...Array(25)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`${
                      Math.random() > 0.4
                        ? "bg-cyan-300"
                        : Math.random() > 0.6
                          ? "bg-purple-400"
                          : "bg-white"
                    }`}
                    animate={{
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Status indicators */}
            <div className="absolute -bottom-4 left-0 right-0 flex justify-center space-x-1">
              <div className="w-2 h-2 bg-green-500 animate-pulse"></div>
              <div className="w-2 h-2 bg-yellow-500 animate-pulse"></div>
              <div className="w-2 h-2 bg-red-500 animate-pulse"></div>
            </div>
          </div>
        </motion.div>

        {/* Main Character Info - Center Diagonal */}
        <motion.div
          className="absolute top-32 left-35 transform -rotate-12 z-30"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: -12 }}
          transition={{ duration: 1.5, type: "spring", bounce: 0.3 }}
        >
          <div className="bg-gradient-to-r from-purple-900 to-blue-900 border-4 border-yellow-400 p-8 relative">
            {/* Glitch effect border */}
            <div className="absolute inset-0 border-4 border-cyan-400 animate-pulse opacity-50"></div>

            <motion.h1
              className="text-4xl font-bold font-mono mb-4"
              style={{
                textShadow: "3px 3px 0px #000, 6px 6px 0px #333",
                background: "linear-gradient(45deg, #00ff00, #ffff00, #ff00ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              animate={{
                textShadow: [
                  "3px 3px 0px #000, 6px 6px 0px #333",
                  "2px 2px 0px #ff0000, 4px 4px 0px #00ff00",
                  "3px 3px 0px #000, 6px 6px 0px #333",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              {user.firstName.toUpperCase()}
              <br />
              <span className="text-3xl">{user.lastName.toUpperCase()}</span>
            </motion.h1>

            <div className="text-green-400 font-mono text-lg mb-2">
              &gt; {jobTitle || "CODE_WARRIOR"}
            </div>

            <div className="text-white font-mono text-sm max-w-xs">
              {hook ||
                "Maître des algorithmes et architecte des mondes numériques"}
            </div>

            {/* Action buttons floating around */}
            <motion.button
              className="absolute -right-4 -top-4 bg-red-500 hover:bg-red-400 text-white px-4 py-2 font-mono font-bold border-2 border-red-700 transform rotate-12"
              whileHover={{ scale: 1.1, rotate: 0 }}
              whileTap={{ scale: 0.9 }}
              onClick={() =>
                document.getElementById("projets")?.scrollIntoView()
              }
            >
              ⚡ START
            </motion.button>

            {cvDownloadUrl && (
              <motion.button
                className="absolute -left-6 -bottom-4 bg-blue-500 hover:bg-blue-400 text-white px-3 py-2 font-mono font-bold border-2 border-blue-700 transform -rotate-6"
                whileHover={{ scale: 1.1, rotate: 0 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCVDownload}
              >
                💾 CV
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Skills Inventory - Bottom Left Diagonal */}
        <motion.div
          className="absolute bottom-20 left-12 transform rotate-6 z-30"
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="bg-black border-4 border-purple-500 p-6 max-w-md">
            <h3 className="text-purple-400 font-mono font-bold text-xl mb-4">
              🎒 INVENTAIRE
            </h3>

            <div className="grid grid-cols-4 gap-2 mb-4">
              {skills.slice(0, 8).map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="relative group"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`w-12 h-12 ${
                      pixelColors[index % pixelColors.length]
                    } border-2 border-white flex items-center justify-center font-mono text-xs text-black font-bold`}
                  >
                    {skill.name.substring(0, 2).toUpperCase()}
                  </div>

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black text-white text-xs px-2 py-1 border border-purple-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-mono">
                    {skill.name}: {skill.level}%
                  </div>

                  {/* Level indicator */}
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 border border-yellow-600 text-black text-xs font-bold font-mono flex items-center justify-center">
                    {Math.floor(skill.level / 10)}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* About text as quest log */}
            <div className="bg-gray-800 border-2 border-green-500 p-3">
              <div className="text-green-400 font-mono text-xs mb-2">
                📜 JOURNAL DE QUÊTE:
              </div>
              <p className="text-white font-mono text-xs leading-relaxed">
                {about?.substring(0, 150) ||
                  "Aventurier du code en quête perpétuelle de nouveaux défis techniques et créatifs..."}
                {about && about.length > 150 && "..."}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Projects Arcade Machine - Right Side */}
        <motion.div
          className="absolute top-100 right-50 transform -translate-y-1/2 rotate-3 z-30"
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          id="projets"
        >
          <div className="relative">
            {/* Arcade machine frame */}
            <div className="bg-gray-800 border-4 border-yellow-500 p-6 max-w-sm">
              <div className="text-center mb-4">
                <motion.h2
                  className="text-yellow-400 font-mono font-bold text-2xl"
                  animate={{
                    color: ["#facc15", "#ef4444", "#10b981", "#facc15"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                >
                  🕹️ ARCADE
                </motion.h2>
                <div className="text-white font-mono text-sm">
                  CHOISISSEZ VOTRE JEU
                </div>
              </div>

              {/* Game selection screen */}
              <div className="bg-black border-2 border-cyan-500 p-4 max-h-96 overflow-y-auto">
                {projets.length > 0 ? (
                  <div className="space-y-3">
                    {projets.slice(0, 4).map((projet, index) => (
                      <motion.div
                        key={projet.id}
                        className="bg-gray-900 border-2 border-green-500 p-3 cursor-pointer hover:bg-gray-800 transition-colors"
                        onClick={() => setSelectedProject(projet)}
                        whileHover={{ scale: 1.05, x: 10 }}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 * index }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 border border-white flex items-center justify-center font-mono text-xs text-white font-bold">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="text-green-400 font-mono font-bold text-sm">
                              {projet.title}
                            </div>
                            <div className="text-gray-400 font-mono text-xs">
                              {projet.description?.substring(0, 50)}...
                            </div>

                            {projet.tags && projet.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {projet.tags
                                  .slice(0, 2)
                                  .map((tag, tagIndex) => (
                                    <span
                                      key={tagIndex}
                                      className="bg-purple-600 text-white text-xs px-1 py-0.5 font-mono border border-purple-400"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Play button */}
                        <div className="mt-2 text-center">
                          <span className="bg-red-500 text-white px-2 py-1 font-mono text-xs border border-red-700">
                            ▶ JOUER
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 font-mono">
                    <div className="text-4xl mb-2">🚧</div>
                    <div className="text-sm">JEUX EN DÉVELOPPEMENT</div>
                  </div>
                )}
              </div>

              {/* Arcade controls */}
              <div className="flex justify-center mt-4 space-x-2">
                <div className="w-8 h-8 bg-red-500 border-2 border-red-700 rounded-full"></div>
                <div className="w-8 h-8 bg-yellow-500 border-2 border-yellow-700 rounded-full"></div>
                <div className="w-8 h-8 bg-green-500 border-2 border-green-700 rounded-full"></div>
                <div className="w-8 h-8 bg-blue-500 border-2 border-blue-700 rounded-full"></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Terminal - Bottom Right */}
        <motion.div
          className="absolute bottom-8 right-30 transform -rotate-3 z-30"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <div className="bg-black border-4 border-green-500 p-4 max-w-xs">
            <div className="text-green-400 font-mono text-sm mb-2">
              &gt; TERMINAL_CONTACT.EXE
            </div>

            <div className="space-y-2 font-mono text-xs">
              <div className="text-cyan-400">
                EMAIL: <span className="text-white">{user.email}</span>
              </div>

              <div className="flex space-x-2 mt-4">
                {githubUrl && (
                  <motion.a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-purple-600 hover:bg-purple-500 text-white px-3 py-1 text-xs font-bold border border-purple-400"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    GIT
                  </motion.a>
                )}

                {linkedinUrl && (
                  <motion.a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 text-xs font-bold border border-blue-400"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    LINK
                  </motion.a>
                )}
              </div>
            </div>

            {/* Blinking cursor */}
            <motion.div
              className="text-green-400 font-mono text-sm mt-2"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              &gt; _
            </motion.div>
          </div>
        </motion.div>

        {/* Power-up Effects */}
        <motion.div
          className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 10, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity },
          }}
        >
          <div className="w-16 h-16 bg-yellow-400 border-4 border-yellow-600 relative">
            <div className="absolute inset-2 bg-yellow-300"></div>
            <div className="absolute inset-0 flex items-center justify-center text-2xl">
              ⚡
            </div>
          </div>
        </motion.div>

        {/* Copyright Footer */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 font-mono text-xs text-gray-600 text-center">
          © {new Date().getFullYear()} {user.firstName} {user.lastName} -
          PIXEL_PORTFOLIO v2.0
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectVideoDialog
            project={selectedProject}
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
            variant="pixel"
          />
        )}
      </AnimatePresence>
    </>
  );
};
