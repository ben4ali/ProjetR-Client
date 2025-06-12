import { FC, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Portfolio } from "../../../types/Portfolio";
import { Projet } from "../../../types/Projet";
import { ProjectVideoDialog } from "../ProjectVideoDialog";

gsap.registerPlugin(ScrollTrigger);

interface CartoonTemplateProps {
  portfolio: Portfolio;
  isPreview?: boolean;
}

export const CartoonTemplate: FC<CartoonTemplateProps> = ({
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
  const heroRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  // Floating clouds animation
  useEffect(() => {
    if (isPreview) return;

    const createCloud = () => {
      const cloud = document.createElement("div");
      cloud.className = "floating-cloud";
      cloud.style.cssText = `
        position: fixed;
        top: ${Math.random() * 50 + 10}%;
        left: -100px;
        width: ${Math.random() * 50 + 50}px;
        height: ${Math.random() * 30 + 20}px;
        background: white;
        border-radius: 50px;
        z-index: 5;
        pointer-events: none;
        opacity: 0.8;
        animation: cloudFloat ${15 + Math.random() * 10}s linear infinite;
      `;

      // Add cloud shape
      cloud.innerHTML = `
        <div style="
          position: absolute;
          background: white;
          border-radius: 50%;
          top: -10px;
          left: 10px;
          width: 20px;
          height: 20px;
        "></div>
        <div style="
          position: absolute;
          background: white;
          border-radius: 50%;
          top: -5px;
          right: 15px;
          width: 15px;
          height: 15px;
        "></div>
      `;

      document.body.appendChild(cloud);

      setTimeout(() => {
        cloud.remove();
      }, 25000);
    };

    const interval = setInterval(createCloud, 3000);

    // Add CSS animation
    const style = document.createElement("style");
    style.textContent = `
      @keyframes cloudFloat {
        to {
          transform: translateX(calc(100vw + 150px));
        }
      }
      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
          transform: translateY(0);
        }
        40% {
          transform: translateY(-10px);
        }
        60% {
          transform: translateY(-5px);
        }
      }
      @keyframes wiggle {
        0% { transform: rotate(0deg); }
        25% { transform: rotate(5deg); }
        75% { transform: rotate(-5deg); }
        100% { transform: rotate(0deg); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      clearInterval(interval);
      style.remove();
    };
  }, [isPreview]);

  // GSAP animations
  useEffect(() => {
    if (isPreview) return;

    // Hero bouncy animation
    if (heroRef.current) {
      gsap.to(heroRef.current, {
        y: -20,
        duration: 2,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
      });
    }

    // Skills candy animation
    if (skillsRef.current) {
      const skillCards = skillsRef.current.querySelectorAll(".skill-card");
      gsap.fromTo(
        skillCards,
        { scale: 0, rotation: -180 },
        {
          scale: 1,
          rotation: 0,
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

    // Project cards bounce in
    if (projectsRef.current) {
      const cards = projectsRef.current.querySelectorAll(".project-card");
      gsap.fromTo(
        cards,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "bounce.out",
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 80%",
          },
        },
      );
    }
  }, [isPreview]);

  const handleCVDownload = () => {
    if (cvDownloadUrl) {
      window.open(cvDownloadUrl, "_blank");
    }
  };

  const adventureQuotes = [
    "Mathematical!",
    "Algebraic!",
    "What time is it? ADVENTURE TIME!",
    "Sucking at something is the first step to being sorta good at something.",
    "Dude, suckin' at something is the first step to being sorta good at something!",
  ];

  const colors = [
    "from-yellow-400 to-orange-500",
    "from-pink-400 to-red-500",
    "from-blue-400 to-purple-500",
    "from-green-400 to-blue-500",
    "from-purple-400 to-pink-500",
    "from-orange-400 to-yellow-500",
  ];

  return (
    <>
      <div
        className={`bg-gradient-to-b from-sky-300 via-sky-200 to-green-200 text-gray-800 min-h-screen relative overflow-hidden ${
          isPreview ? "scale-75 origin-top" : ""
        }`}
      >
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b-4 border-yellow-400 shadow-lg">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <motion.div
                className="text-3xl font-bold text-blue-600"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎮 {user.firstName} Time!
              </motion.div>
              <div className="hidden md:flex space-x-6">
                {" "}
                {[
                  "Accueil",
                  "À propos",
                  "Compétences",
                  "Projets",
                  "Contact",
                ].map((label) => (
                  <button
                    key={label}
                    className="text-lg font-bold text-blue-600 hover:text-yellow-500 transition-colors transform hover:scale-110 duration-200"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-300 rounded-full opacity-50 animate-bounce"></div>
            <div
              className="absolute top-40 right-32 w-24 h-24 bg-pink-300 rounded-full opacity-50"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute bottom-32 left-1/3 w-28 h-28 bg-blue-300 rounded-full opacity-50 animate-bounce"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>

          <div
            ref={heroRef}
            className="relative z-10 text-center max-w-4xl mx-auto px-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
              className="mb-8"
            >
              <div className="relative w-64 h-64 mx-auto mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse opacity-50"></div>
                <img
                  src={user.avatar || "/default-avatar.png"}
                  alt={user.firstName}
                  className="w-full h-full object-cover rounded-full border-8 border-white shadow-2xl relative z-10"
                />
                {/* Finn's hat style */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-16 bg-white rounded-t-full border-4 border-blue-600"></div>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full"></div>
                {/* Floating hearts */}
                <motion.div
                  className="absolute -top-2 -right-2 text-3xl"
                  animate={{ y: [-10, -20, -10], rotate: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  💝
                </motion.div>
              </div>
            </motion.div>

            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-7xl md:text-9xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
              style={{ fontFamily: "Comic Sans MS, cursive" }}
            >
              {user.firstName}
              <br />
              <span className="text-5xl md:text-7xl text-yellow-500">
                {user.lastName}
              </span>
            </motion.h1>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-2xl md:text-3xl mb-8 text-blue-700 font-bold"
              style={{ fontFamily: "Comic Sans MS, cursive" }}
            >
              {hook || "Il est quelle heure ? C'EST L'HEURE DE L'AVENTURE ! 🎮"}
            </motion.p>

            {jobTitle && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.9, type: "spring" }}
                className="mb-8"
              >
                <span className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-3 rounded-full text-xl font-bold shadow-lg transform hover:scale-110 transition-transform">
                  🌟 {jobTitle} 🌟
                </span>
              </motion.div>
            )}

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <motion.button
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-10 py-4 rounded-full text-xl font-bold shadow-lg transform hover:scale-110 transition-all duration-200"
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
              >
                🚀 Commencer l'Aventure !
              </motion.button>
              {cvDownloadUrl && (
                <motion.button
                  onClick={handleCVDownload}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-10 py-4 rounded-full text-xl font-bold shadow-lg transform hover:scale-110 transition-all duration-200"
                  whileHover={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  📄 Télécharger CV !
                </motion.button>
              )}
            </motion.div>

            {/* Floating quote */}
            <motion.div
              className="absolute top-20 right-10 bg-white/90 p-4 rounded-2xl shadow-lg max-w-xs"
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="text-sm font-bold text-purple-600">
                💭 "
                {
                  adventureQuotes[
                    Math.floor(Math.random() * adventureQuotes.length)
                  ]
                }
                "
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 px-6 bg-gradient-to-r from-pink-200 to-yellow-200">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                {" "}
                <h2
                  className="text-6xl font-black mb-8 text-purple-600"
                  style={{ fontFamily: "Comic Sans MS, cursive" }}
                >
                  Mon Histoire Épique ! 📖
                </h2>
                <div className="bg-white/80 p-8 rounded-3xl shadow-xl border-4 border-blue-300">
                  {" "}
                  <p className="text-lg text-gray-700 leading-relaxed mb-6 font-medium">
                    {about ||
                      "Salut copain ! Je suis un développeur super cool qui adore créer des trucs incroyables avec du code ! Tout comme Finn et Jake partent en aventures épiques, je pars en aventures de codage pour créer des projets géniaux qui aident les gens et rendent le monde plus mathématique ! 🎮✨"}
                  </p>
                  {yearsOfExperience && (
                    <div className="flex items-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                        <span className="text-3xl font-black text-white">
                          {yearsOfExperience}
                        </span>
                      </div>{" "}
                      <div>
                        <div className="text-2xl font-black text-blue-600">
                          Années d'Aventure !
                        </div>
                        <div className="text-lg text-purple-600">
                          Développeur Niveau {yearsOfExperience} 🎮
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="relative">
                <motion.div
                  className="bg-white/90 p-8 rounded-3xl border-4 border-pink-300 shadow-xl"
                  animate={{ rotate: [0, 2, 0, -2, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <h3 className="text-2xl font-black text-green-600 mb-4">
                    Statistiques d'Aventure ! 📊
                  </h3>
                  <div className="space-y-4">
                    {" "}
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-blue-600">🎯 Génie</span>
                      <span className="font-black text-yellow-600">100%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-4 rounded-full w-full"></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-blue-600">
                        ⚡ Énergie
                      </span>
                      <span className="font-black text-yellow-600">95%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full w-[95%]"></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-blue-600">
                        🌟 Créativité
                      </span>
                      <span className="font-black text-yellow-600">98%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div className="bg-gradient-to-r from-purple-400 to-pink-500 h-4 rounded-full w-[98%]"></div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section
          ref={skillsRef}
          className="py-20 px-6 bg-gradient-to-r from-blue-200 to-purple-200"
        >
          <div className="max-w-6xl mx-auto">
            {" "}
            <h2
              className="text-6xl font-black text-center mb-16 text-yellow-600"
              style={{ fontFamily: "Comic Sans MS, cursive" }}
            >
              Mes Super Pouvoirs ! 🦸‍♂️
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {" "}
              {(skills.length > 0
                ? skills
                : [
                    { name: "Magie React", level: 90 },
                    { name: "Sorts JavaScript", level: 95 },
                    { name: "Sorcellerie CSS", level: 85 },
                    { name: "Pouvoir Node.js", level: 80 },
                    { name: "Compétences TypeScript", level: 88 },
                    { name: "Arts du Design", level: 75 },
                  ]
              )
                .slice(0, 6)
                .map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="skill-card group"
                    whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className={`bg-gradient-to-br ${colors[index % colors.length]} p-6 rounded-3xl shadow-xl border-4 border-white hover:shadow-2xl transition-all duration-300`}
                    >
                      <div className="text-center">
                        <div className="text-4xl mb-3">
                          {index === 0
                            ? "⚛️"
                            : index === 1
                              ? "✨"
                              : index === 2
                                ? "🎨"
                                : index === 3
                                  ? "🚀"
                                  : index === 4
                                    ? "🔮"
                                    : "🎭"}
                        </div>
                        <h3 className="text-xl font-black mb-4 text-white">
                          {skill.name}
                        </h3>
                        <div className="relative h-6 bg-white/30 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-white rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1.5, delay: index * 0.1 }}
                          />
                        </div>
                        <div className="text-2xl font-black text-white mt-2">
                          {skill.level}%
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          ref={projectsRef}
          className="py-20 px-6 bg-gradient-to-r from-green-200 to-blue-200"
        >
          <div className="max-w-7xl mx-auto">
            {" "}
            <h2
              className="text-6xl font-black text-center mb-16 text-pink-600"
              style={{ fontFamily: "Comic Sans MS, cursive" }}
            >
              Aventures Épiques ! 🗺️
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projets.slice(0, 6).map((projet, index) => (
                <motion.div
                  key={projet.id}
                  className="project-card group cursor-pointer"
                  onClick={() => setSelectedProject(projet)}
                  whileHover={{ y: -10, rotate: [0, 1, -1, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white rounded-3xl overflow-hidden shadow-xl border-4 border-yellow-300 hover:border-pink-400 transition-all duration-300">
                    <div className="aspect-video relative overflow-hidden">
                      {" "}
                      {projet.previewImageUrl ? (
                        <img
                          src={projet.previewImageUrl}
                          alt={projet.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div
                          className={`w-full h-full bg-gradient-to-br ${colors[index % colors.length]} flex items-center justify-center`}
                        >
                          <span className="text-6xl">🎮</span>
                        </div>
                      )}{" "}
                      <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full">
                        <span className="text-sm font-bold text-purple-600">
                          Quête #{index + 1}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3
                        className="text-2xl font-black mb-3 text-blue-600"
                        style={{ fontFamily: "Comic Sans MS, cursive" }}
                      >
                        {projet.title}
                      </h3>
                      <p className="text-gray-700 text-base mb-4 font-medium line-clamp-2">
                        {projet.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {projet.tags?.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tag}
                            className={`bg-gradient-to-r ${colors[tagIndex % colors.length]} text-white px-3 py-1 rounded-full text-sm font-bold`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}{" "}
              {projets.length === 0 &&
                [
                  {
                    title: "Boulangerie de Tree Trunks",
                    description: "Système de commande de délices sucrés ! 🧁",
                    tags: ["React", "Sweet.js"],
                  },
                  {
                    title: "Console de Jeu BMO",
                    description: "Plateforme de jeux rétro ! 🎮",
                    tags: ["JavaScript", "Canvas"],
                  },
                  {
                    title: "Labo de Princesse Chewing-gum",
                    description: "Suivi d'expériences scientifiques ! 🧪",
                    tags: ["Vue", "Chemistry"],
                  },
                ].map((projet, index) => (
                  <div key={index} className="project-card group">
                    <div className="bg-white rounded-3xl overflow-hidden shadow-xl border-4 border-yellow-300">
                      <div
                        className={`aspect-video bg-gradient-to-br ${colors[index % colors.length]} flex items-center justify-center`}
                      >
                        <span className="text-6xl">🎮</span>
                      </div>
                      <div className="p-6">
                        <h3
                          className="text-2xl font-black mb-3 text-blue-600"
                          style={{ fontFamily: "Comic Sans MS, cursive" }}
                        >
                          {projet.title}
                        </h3>
                        <p className="text-gray-700 text-base mb-4 font-medium">
                          {projet.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {projet.tags?.map((tag, tagIndex) => (
                            <span
                              key={tag}
                              className={`bg-gradient-to-r ${colors[tagIndex % colors.length]} text-white px-3 py-1 rounded-full text-sm font-bold`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 px-6 bg-gradient-to-r from-yellow-200 to-pink-200">
          <div className="max-w-4xl mx-auto text-center">
            {" "}
            <h2
              className="text-6xl font-black mb-8 text-green-600"
              style={{ fontFamily: "Comic Sans MS, cursive" }}
            >
              Partons à l'Aventure ! 🌟
            </h2>
            <motion.div
              className="bg-white/90 p-8 rounded-3xl shadow-xl border-4 border-blue-300"
              animate={{ rotate: [0, 1, 0, -1, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              {" "}
              <p className="text-2xl text-purple-600 mb-8 font-bold">
                Allez, prends tes amis ! Créons quelque chose de mathématique !
                🎮
              </p>
              <div className="flex justify-center space-x-8">
                {githubUrl && (
                  <motion.a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-20 h-20 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full flex items-center justify-center shadow-xl transform hover:scale-110 transition-all duration-200"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <svg
                      className="w-10 h-10 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </motion.a>
                )}{" "}
                {linkedinUrl && (
                  <motion.a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-20 h-20 bg-gradient-to-r from-pink-400 to-yellow-500 rounded-full flex items-center justify-center shadow-xl transform hover:scale-110 transition-all duration-200"
                    whileHover={{ rotate: -360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <svg
                      className="w-10 h-10 text-white"
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
                    className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-xl transform hover:scale-110 transition-all duration-200"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <svg
                      className="w-10 h-10 text-white"
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
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectVideoDialog
            project={selectedProject}
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
            variant="cartoon"
          />
        )}
      </AnimatePresence>
    </>
  );
};
