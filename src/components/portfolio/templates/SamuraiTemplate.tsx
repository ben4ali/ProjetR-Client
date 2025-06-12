import { FC, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Portfolio } from "../../../types/Portfolio";
import { Projet } from "../../../types/Projet";
import { ProjectVideoDialog } from "../ProjectVideoDialog";

gsap.registerPlugin(ScrollTrigger);

interface SamuraiTemplateProps {
  portfolio: Portfolio;
  isPreview?: boolean;
}

export const SamuraiTemplate: FC<SamuraiTemplateProps> = ({
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
  const [activeSection, setActiveSection] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  // Sakura petals animation
  useEffect(() => {
    if (isPreview) return;

    const createSakuraPetal = () => {
      const petal = document.createElement("div");
      petal.className = "sakura-petal";
      petal.style.cssText = `
        position: fixed;
        top: -10px;
        left: ${Math.random() * 100}%;
        width: 10px;
        height: 10px;
        background: radial-gradient(circle, #ffb3ba, #ff9999);
        border-radius: 50% 0;
        z-index: 10;
        pointer-events: none;
        animation: sakuraFall ${8 + Math.random() * 5}s linear infinite;
        transform: rotate(${Math.random() * 360}deg);
      `;
      document.body.appendChild(petal);

      setTimeout(() => {
        petal.remove();
      }, 13000);
    };

    const interval = setInterval(createSakuraPetal, 1000);

    // Add CSS animation
    const style = document.createElement("style");
    style.textContent = `
      @keyframes sakuraFall {
        to {
          transform: translateY(100vh) rotate(360deg);
        }
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

    // Hero parallax
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

    // Skills bamboo animation
    if (skillsRef.current) {
      const bambooSticks = skillsRef.current.querySelectorAll(".bamboo-stick");
      gsap.fromTo(
        bambooSticks,
        { height: 0 },
        {
          height: "100%",
          duration: 1.5,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
          },
        },
      );
    }

    // Project cards animation
    if (projectsRef.current) {
      const cards = projectsRef.current.querySelectorAll(".project-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
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

  const scrollToSection = (index: number) => {
    const sections = ["hero", "about", "skills", "projects", "contact"];
    const element = document.getElementById(sections[index]);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(index);
    }
  };

  return (
    <>
      <div
        className={`bg-gradient-to-b from-gray-900 via-red-950 to-black text-white min-h-screen relative overflow-hidden ${
          isPreview ? "scale-75 origin-top" : ""
        }`}
      >
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-red-800/30">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold text-red-400">
                {user.firstName} {user.lastName}
              </div>{" "}
              <div className="hidden md:flex space-x-8">
                {[
                  { japanese: "武士", french: "Samouraï", section: "hero" },
                  { japanese: "物語", french: "Histoire", section: "about" },
                  {
                    japanese: "技能",
                    french: "Compétences",
                    section: "skills",
                  },
                  { japanese: "作品", french: "Projets", section: "projects" },
                  { japanese: "連絡", french: "Contact", section: "contact" },
                ].map((item, index) => (
                  <div key={index} className="relative group">
                    <button
                      onClick={() => scrollToSection(index)}
                      className={`text-sm font-medium transition-colors hover:text-red-400 ${
                        activeSection === index ? "text-red-400" : "text-white"
                      }`}
                      aria-label={`Aller à la section ${item.french}`}
                      title={item.french}
                    >
                      {item.japanese}
                    </button>
                    {/* Tooltip */}
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                      {item.french}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </nav>
        {/* Hero Section */}
        <section
          id="hero"
          className="relative h-screen flex items-center justify-center overflow-hidden"
        >
          <div
            ref={heroRef}
            className="absolute inset-0 bg-gradient-to-r from-red-900/30 to-black/50"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSI5IiBjeT0iOSIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
          </div>

          <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mb-8"
            >
              <div className="relative w-48 h-48 mx-auto mb-8">
                <div className="absolute inset-0 bg-red-600 rounded-full opacity-20 animate-pulse"></div>
                <img
                  src={user.avatar || "/default-avatar.png"}
                  alt={user.firstName}
                  className="w-full h-full object-cover rounded-full border-4 border-red-600 relative z-10"
                />{" "}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center group">
                  <span
                    className="text-white text-xs"
                    title="Samouraï"
                    aria-label="Samouraï"
                  >
                    侍
                  </span>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    Samouraï
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent"
            >
              {user.firstName}
              <br />
              <span className="text-4xl md:text-6xl">{user.lastName}</span>
            </motion.h1>{" "}
            <motion.p
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-xl md:text-2xl mb-8 text-gray-300 font-light relative group"
            >
              <span
                title={hook ? undefined : "Guerrier du Chemin du Code"}
                aria-label={hook ? undefined : "Guerrier du Chemin du Code"}
                className={hook ? undefined : "cursor-help"}
              >
                {hook || "コードの道を歩む武士 - Guerrier du Chemin du Code"}
              </span>
              {!hook && (
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                  Guerrier du Chemin du Code
                </div>
              )}
            </motion.p>
            {jobTitle && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
                className="mb-8"
              >
                <span className="inline-block bg-red-600/20 border border-red-600 px-6 py-2 rounded-full text-red-400 font-medium">
                  {jobTitle}
                </span>
              </motion.div>
            )}{" "}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <div className="relative group">
                <button
                  onClick={() => scrollToSection(3)}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
                  aria-label="Voir mes projets"
                  title="Voir mes projets"
                >
                  作品を見る
                </button>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                  Voir mes projets
                </div>
              </div>
              {cvDownloadUrl && (
                <div className="relative group">
                  <button
                    onClick={handleCVDownload}
                    className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                    aria-label="Télécharger mon CV"
                    title="Télécharger mon CV"
                  >
                    履歴書をダウンロード
                  </button>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    Télécharger mon CV
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Decorative elements */}
          <div className="absolute bottom-20 left-20 opacity-20">
            <div className="w-32 h-32 border-2 border-red-600 transform rotate-45"></div>
          </div>
          <div className="absolute top-20 right-20 opacity-20">
            <div className="w-24 h-24 border-2 border-yellow-600 rounded-full"></div>
          </div>
        </section>
        {/* About Section */}
        <section
          id="about"
          className="py-20 px-6 bg-gradient-to-r from-black to-red-950"
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {" "}
              <div>
                <div className="relative group inline-block">
                  <h2 className="text-5xl font-bold mb-8 text-red-400 cursor-help">
                    私の物語
                    <span className="block text-2xl text-gray-400 mt-2">
                      Mon Histoire
                    </span>
                  </h2>
                  <div className="absolute -bottom-2 left-0 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    Mon Histoire
                  </div>
                </div>
                <div className="relative group inline-block">
                  <p
                    className="text-lg text-gray-300 leading-relaxed mb-6 cursor-help"
                    title={
                      about
                        ? undefined
                        : "En tant que développeur avec l'esprit d'un samouraï, je continue de marcher sur le chemin de la technologie. Avec dévouement, j'écris soigneusement chaque ligne de code."
                    }
                    aria-label={
                      about
                        ? undefined
                        : "En tant que développeur avec l'esprit d'un samouraï, je continue de marcher sur le chemin de la technologie. Avec dévouement, j'écris soigneusement chaque ligne de code."
                    }
                  >
                    {about ||
                      "武士の心を持つ開発者として、私は技術の道を歩み続けています。精神を込めて、一つ一つのコードを丁寧に書き上げます。"}
                  </p>
                  {!about && (
                    <div className="absolute -bottom-8 left-0 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap max-w-sm">
                      En tant que développeur avec l'esprit d'un samouraï, je
                      continue de marcher sur le chemin de la technologie. Avec
                      dévouement, j'écris soigneusement chaque ligne de code.
                    </div>
                  )}
                </div>
                {yearsOfExperience && (
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl font-bold">
                        {yearsOfExperience}
                      </span>
                    </div>{" "}
                    <div>
                      <div className="relative group inline-block">
                        <div
                          className="text-xl font-semibold cursor-help"
                          title="Années d'Expérience"
                          aria-label="Années d'Expérience"
                        >
                          年の経験
                        </div>
                        <div className="absolute -bottom-6 left-0 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                          Années d'Expérience
                        </div>
                      </div>
                      <div className="text-gray-400">Années d'Expérience</div>
                    </div>
                  </div>
                )}
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-red-600/20 to-yellow-600/20 p-8 rounded-2xl border border-red-600/30">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-red-400">誠実 - Integrity</span>
                      <span className="text-yellow-400">100%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-red-600 to-yellow-600 h-2 rounded-full w-full"></div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-red-400">勇気 - Courage</span>
                      <span className="text-yellow-400">95%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-red-600 to-yellow-600 h-2 rounded-full w-[95%]"></div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-red-400">礼儀 - Respect</span>
                      <span className="text-yellow-400">98%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-red-600 to-yellow-600 h-2 rounded-full w-[98%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Skills Section */}
        <section
          id="skills"
          ref={skillsRef}
          className="py-20 px-6 bg-gradient-to-r from-red-950 to-black"
        >
          <div className="max-w-6xl mx-auto">
            {" "}
            <h2 className="text-5xl font-bold text-center mb-16 text-red-400">
              技能
              <span className="block text-2xl text-gray-400 mt-2">
                Compétences & Capacités
              </span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(skills.length > 0
                ? skills
                : [
                    { name: "React", level: 90 },
                    { name: "TypeScript", level: 85 },
                    { name: "Node.js", level: 80 },
                    { name: "Python", level: 75 },
                    { name: "Design", level: 70 },
                    { name: "Leadership", level: 85 },
                  ]
              )
                .slice(0, 6)
                .map((skill) => (
                  <div key={skill.name} className="relative group">
                    <div className="bg-gradient-to-br from-red-900/40 to-black/60 p-6 rounded-xl border border-red-600/30 hover:border-red-400/50 transition-all duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-white">
                          {skill.name}
                        </h3>
                        <span className="text-red-400 font-bold">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="bamboo-stick absolute top-0 left-0 h-full bg-gradient-to-r from-red-600 to-yellow-600 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                      <div className="absolute top-2 right-2 text-xs text-red-400 opacity-50">
                        段 {Math.floor(skill.level / 10)}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
        {/* Projects Section */}
        <section
          id="projects"
          ref={projectsRef}
          className="py-20 px-6 bg-gradient-to-r from-black to-red-950"
        >
          <div className="max-w-7xl mx-auto">
            {" "}
            <h2 className="text-5xl font-bold text-center mb-16 text-red-400">
              作品集
              <span className="block text-2xl text-gray-400 mt-2">
                Portfolio
              </span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {" "}
              {projets.slice(0, 6).map((projet) => (
                <motion.div
                  key={projet.id}
                  className="project-card group cursor-pointer"
                  onClick={() => setSelectedProject(projet)}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                  aria-label={`Voir les détails du projet ${projet.title}`}
                  title={`Voir les détails du projet ${projet.title}`}
                >
                  <div className="bg-gradient-to-br from-red-900/40 to-black/60 rounded-xl overflow-hidden border border-red-600/30 hover:border-red-400/50 transition-all duration-300">
                    <div className="aspect-video relative overflow-hidden">
                      {" "}
                      {projet.previewImageUrl ? (
                        <img
                          src={projet.previewImageUrl}
                          alt={projet.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-red-600 to-yellow-600 flex items-center justify-center group">
                          <span
                            className="text-4xl text-white cursor-help"
                            title="Samouraï"
                            aria-label="Samouraï"
                          >
                            侍
                          </span>
                          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                            Samouraï
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="relative group/button">
                          <div className="bg-red-600 text-white px-6 py-2 rounded-full font-semibold">
                            詳細を見る
                          </div>
                          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/button:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                            Voir les détails
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-white">
                        {projet.title}
                      </h3>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                        {projet.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {projet.tags?.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="bg-red-600/20 border border-red-600 text-red-400 px-2 py-1 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              {projets.length === 0 &&
                [
                  {
                    title: "Bushido App",
                    description: "サムライの精神を学ぶアプリ",
                    tags: ["React", "TypeScript"],
                  },
                  {
                    title: "Zen Garden",
                    description: "禅庭園シミュレーター",
                    tags: ["Three.js", "WebGL"],
                  },
                  {
                    title: "Katana Builder",
                    description: "刀作成ツール",
                    tags: ["Vue.js", "Canvas"],
                  },
                ].map((projet, index) => (
                  <div key={index} className="project-card group">
                    <div className="bg-gradient-to-br from-red-900/40 to-black/60 rounded-xl overflow-hidden border border-red-600/30">
                      {" "}
                      <div className="aspect-video bg-gradient-to-br from-red-600 to-yellow-600 flex items-center justify-center relative group">
                        <span
                          className="text-4xl text-white cursor-help"
                          title="Samouraï"
                          aria-label="Samouraï"
                        >
                          侍
                        </span>
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                          Samouraï
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 text-white">
                          {projet.title}
                        </h3>
                        <p className="text-gray-300 text-sm mb-4">
                          {projet.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {projet.tags?.map((tag) => (
                            <span
                              key={tag}
                              className="bg-red-600/20 border border-red-600 text-red-400 px-2 py-1 rounded text-xs"
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
        {/* Contact Section */}{" "}
        <section
          id="contact"
          className="py-20 px-6 bg-gradient-to-r from-red-950 to-black"
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative group inline-block mb-8">
              <h2 className="text-5xl font-bold text-red-400 cursor-help">
                連絡先
                <span className="block text-2xl text-gray-400 mt-2">
                  Contact
                </span>
              </h2>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                Contact
              </div>
            </div>
            <div className="relative group inline-block mb-12">
              <p
                className="text-xl text-gray-300 cursor-help"
                title="Créons ensemble quelque chose de merveilleux"
                aria-label="Créons ensemble quelque chose de merveilleux"
              >
                一緒に素晴らしいものを作りましょう
              </p>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                Créons ensemble quelque chose de merveilleux
              </div>
            </div>

            <div className="flex justify-center space-x-8">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors"
                >
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              )}{" "}
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors"
                >
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              )}
              {user.email && (
                <a
                  href={`mailto:${user.email}`}
                  className="w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors"
                >
                  <svg
                    className="w-8 h-8 text-white"
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
                </a>
              )}
            </div>
          </div>
        </section>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectVideoDialog
            project={selectedProject}
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};
