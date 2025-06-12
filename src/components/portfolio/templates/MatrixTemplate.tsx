import { FC, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Portfolio } from "../../../types/Portfolio";
import { Projet } from "../../../types/Projet";
import { ProjectVideoDialog } from "../ProjectVideoDialog";

gsap.registerPlugin(ScrollTrigger);

interface MatrixTemplateProps {
  portfolio: Portfolio;
  isPreview?: boolean;
}

export const MatrixTemplate: FC<MatrixTemplateProps> = ({
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
  const [matrixText, setMatrixText] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  // Matrix rain effect
  useEffect(() => {
    if (isPreview) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana =
      "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
    const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nums = "0123456789";
    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const rainDrops: number[] = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0F0";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(
          Math.floor(Math.random() * alphabet.length),
        );
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const interval = setInterval(draw, 30);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [isPreview]);

  // Typewriter effect for matrix text
  useEffect(() => {
    if (isPreview) return;
    const text = "RÉVEILLEZ-VOUS... LA MATRICE VOUS TIENT...";
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        setMatrixText(text.slice(0, i + 1));
        i++;
        setTimeout(typeWriter, 100);
      } else {
        setTimeout(() => {
          setIsInitialized(true);
        }, 1000);
      }
    };

    const timeout = setTimeout(typeWriter, 2000);
    return () => clearTimeout(timeout);
  }, [isPreview]);

  // GSAP animations
  useEffect(() => {
    if (isPreview) return;

    // Glitch effect on scroll
    if (heroRef.current) {
      gsap.to(heroRef.current, {
        filter: "hue-rotate(0deg)",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      });
    }

    // Skills matrix animation
    if (skillsRef.current) {
      const skillBars = skillsRef.current.querySelectorAll(".skill-bar");
      gsap.fromTo(
        skillBars,
        { width: 0, opacity: 0 },
        {
          width: "100%",
          opacity: 1,
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
  }, [isPreview]);

  const handleCVDownload = () => {
    if (cvDownloadUrl) {
      window.open(cvDownloadUrl, "_blank");
    }
  };

  const glitchVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    glitch: {
      x: [0, -5, 5, -5, 0],
      filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(0deg)"],
      transition: {
        duration: 0.2,
        repeat: 3,
      },
    },
  };

  return (
    <>
      <div
        className={`bg-black text-green-400 min-h-screen relative overflow-hidden font-mono ${
          isPreview ? "scale-75 origin-top" : ""
        }`}
      >
        {/* Matrix rain canvas */}
        <canvas
          ref={canvasRef}
          className="fixed inset-0 z-0 pointer-events-none"
          style={{ filter: "opacity(0.3)" }}
        />

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-green-500/30">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <motion.div
                className="text-2xl font-bold text-green-400"
                whileHover="glitch"
                variants={glitchVariants}
              >
                &gt; {user.firstName}.exe
              </motion.div>
              <div className="hidden md:flex space-x-8">
                {" "}
                {[
                  "ACCUEIL",
                  "À PROPOS",
                  "COMPÉTENCES",
                  "PROJETS",
                  "CONTACT",
                ].map((label) => (
                  <button
                    key={label}
                    className="text-sm font-medium hover:text-white transition-colors relative group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      &gt;_
                    </span>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative h-screen flex items-center justify-center z-10"
        >
          <div className="text-center max-w-4xl mx-auto px-6">
            {!isInitialized ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-8"
              >
                <div className="text-2xl md:text-4xl mb-8 font-mono">
                  <span className="text-green-400">&gt; {matrixText}</span>
                  <span className="animate-pulse">|</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              >
                <div className="relative mb-8">
                  <div className="w-48 h-48 mx-auto mb-8 relative">
                    <div className="absolute inset-0 bg-green-500/20 rounded-full animate-pulse"></div>
                    <img
                      src={user.avatar || "/default-avatar.png"}
                      alt={user.firstName}
                      className="w-full h-full object-cover rounded-full border-2 border-green-500 relative z-10 filter brightness-110 contrast-125"
                    />
                    <div className="absolute inset-0 bg-green-500/10 rounded-full animate-ping"></div>
                  </div>
                </div>
                <motion.h1
                  className="text-6xl md:text-8xl font-bold mb-6 text-green-400"
                  whileHover="glitch"
                  variants={glitchVariants}
                >
                  &gt; {user.firstName}
                  <br />
                  <span className="text-4xl md:text-6xl text-white">
                    {user.lastName}
                  </span>
                </motion.h1>{" "}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-xl md:text-2xl mb-8 text-green-300"
                >
                  {hook || "&gt; RÉALITÉ.EXE A CESSÉ DE FONCTIONNER"}
                </motion.p>
                {jobTitle && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mb-8"
                  >
                    <span className="inline-block bg-green-500/20 border border-green-500 px-6 py-2 rounded font-mono text-green-400">
                      ROLE: {jobTitle.toUpperCase()}
                    </span>
                  </motion.div>
                )}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
                >
                  {" "}
                  <button className="bg-green-500 hover:bg-green-600 text-black px-8 py-3 rounded font-bold transition-colors shadow-lg">
                    &gt; EXÉCUTER PORTFOLIO
                  </button>
                  {cvDownloadUrl && (
                    <button
                      onClick={handleCVDownload}
                      className="border border-green-500 text-green-500 hover:bg-green-500 hover:text-black px-8 py-3 rounded font-bold transition-colors"
                    >
                      &gt; TÉLÉCHARGER CV
                    </button>
                  )}
                </motion.div>
              </motion.div>
            )}
          </div>

          {/* Decorative terminal elements */}
          <div className="absolute bottom-10 left-10 text-xs text-green-600 opacity-50">
            <div>&gt; system_status: ONLINE</div>
            <div>&gt; user_authenticated: TRUE</div>
            <div>&gt; matrix_level: {yearsOfExperience || 5}</div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 px-6 bg-black/90 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                {" "}
                <h2 className="text-5xl font-bold mb-8 text-green-400">
                  &gt; ABOUT.EXE
                </h2>
                <div className="space-y-4 text-lg">
                  <div className="border border-green-500/30 bg-green-500/5 p-4 rounded font-mono">
                    <div className="text-green-600 text-sm mb-2">
                      &gt; Chargement du profil...
                    </div>
                    <p className="text-green-300 leading-relaxed">
                      {about ||
                        "Je suis un architecte numérique qui navigue entre les lignes de code et la réalité. Dans cette matrice de possibilités infinies, je conçois des solutions qui comblent le fossé entre les besoins humains et le potentiel technologique."}
                    </p>
                  </div>
                  {yearsOfExperience && (
                    <div className="flex items-center">
                      <span className="text-green-500">
                        &gt; EXPERIENCE_LEVEL:
                      </span>
                      <span className="ml-2 text-white font-bold">
                        {yearsOfExperience} YEARS
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <div className="border border-green-500/30 bg-green-500/5 p-6 rounded">
                  <div className="text-green-400 font-mono text-sm mb-4">
                    &gt; SYSTEM_INFO
                  </div>{" "}
                  <div className="space-y-2 text-sm font-mono">
                    <div className="flex justify-between">
                      <span className="text-green-300">STATUT:</span>
                      <span className="text-white">OPÉRATIONNEL</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-300">LOCALISATION:</span>
                      <span className="text-white">LA MATRICE</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-300">NIVEAU_ACCÈS:</span>
                      <span className="text-white">DÉVELOPPEUR</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-300">
                        DERNIÈRE_CONNEXION:
                      </span>
                      <span className="text-white">MAINTENANT</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section ref={skillsRef} className="py-20 px-6 bg-black relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-16 text-green-400">
              &gt; SKILLS.DATABASE
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {(skills.length > 0
                ? skills
                : [
                    { name: "JavaScript", level: 95 },
                    { name: "React", level: 90 },
                    { name: "Node.js", level: 85 },
                    { name: "Python", level: 80 },
                    { name: "TypeScript", level: 88 },
                    { name: "Docker", level: 75 },
                  ]
              )
                .slice(0, 8)
                .map((skill) => (
                  <div key={skill.name} className="group">
                    <div className="border border-green-500/30 bg-green-500/5 p-4 rounded hover:border-green-400/50 transition-all duration-300">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-green-400 font-mono">
                          &gt; {skill.name.toUpperCase()}
                        </span>
                        <span className="text-white font-bold">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="relative h-2 bg-gray-800 rounded overflow-hidden">
                        <div
                          className="skill-bar absolute top-0 left-0 h-full bg-gradient-to-r from-green-600 to-green-400 rounded transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                        <div className="absolute inset-0 bg-green-400/20 animate-pulse"></div>
                      </div>{" "}
                      <div className="text-xs text-green-600 mt-1 font-mono">
                        MAÎTRISE:{" "}
                        {skill.level >= 90
                          ? "EXPERT"
                          : skill.level >= 70
                            ? "AVANCÉ"
                            : "INTERMÉDIAIRE"}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-20 px-6 bg-black/90 relative z-10">
          <div className="max-w-7xl mx-auto">
            {" "}
            <h2 className="text-5xl font-bold text-center mb-16 text-green-400">
              &gt; PROJETS.ARCHIVE
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projets.slice(0, 6).map((projet, index) => (
                <motion.div
                  key={projet.id}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProject(projet)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="border border-green-500/30 bg-green-500/5 rounded overflow-hidden hover:border-green-400/50 transition-all duration-300">
                    <div className="aspect-video relative overflow-hidden">
                      {" "}
                      {projet.previewImageUrl ? (
                        <img
                          src={projet.previewImageUrl}
                          alt={projet.title}
                          className="w-full h-full object-cover filter brightness-75 contrast-125 group-hover:brightness-100 transition-all duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-green-900 to-black flex items-center justify-center">
                          <span className="text-6xl text-green-500">&gt;_</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-green-500/10 group-hover:bg-green-500/20 transition-colors duration-300"></div>{" "}
                      <div className="absolute top-2 left-2 text-xs font-mono text-green-400">
                        PROJET_{String(index + 1).padStart(3, "0")}.EXE
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-green-400 font-mono">
                        &gt; {projet.title.toUpperCase()}
                      </h3>
                      <p className="text-green-300 text-sm mb-4 line-clamp-2">
                        {projet.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {projet.tags?.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="bg-green-500/20 border border-green-500 text-green-400 px-2 py-1 rounded text-xs font-mono"
                          >
                            {tag.toUpperCase()}
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
                    title: "Red Pill",
                    description: "Reality authentication system",
                    tags: ["React", "WebGL"],
                  },
                  {
                    title: "Neo.js",
                    description: "AI consciousness framework",
                    tags: ["Node.js", "TensorFlow"],
                  },
                  {
                    title: "Zion Network",
                    description: "Secure communication platform",
                    tags: ["Blockchain", "P2P"],
                  },
                ].map((projet, index) => (
                  <div key={index} className="group">
                    <div className="border border-green-500/30 bg-green-500/5 rounded overflow-hidden">
                      <div className="aspect-video bg-gradient-to-br from-green-900 to-black flex items-center justify-center">
                        <span className="text-6xl text-green-500">&gt;_</span>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 text-green-400 font-mono">
                          &gt; {projet.title.toUpperCase()}
                        </h3>
                        <p className="text-green-300 text-sm mb-4">
                          {projet.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {projet.tags?.map((tag) => (
                            <span
                              key={tag}
                              className="bg-green-500/20 border border-green-500 text-green-400 px-2 py-1 rounded text-xs font-mono"
                            >
                              {tag.toUpperCase()}
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
        <section className="py-20 px-6 bg-black relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-8 text-green-400">
              &gt; CONTACT.SYS
            </h2>
            <div className="border border-green-500/30 bg-green-500/5 p-8 rounded">
              {" "}
              <p className="text-xl text-green-300 mb-8 font-mono">
                &gt; ÉTABLIR CONNEXION? [O/N]
              </p>
              <div className="flex justify-center space-x-8">
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-16 h-16 bg-green-500/20 border border-green-500 hover:bg-green-500 hover:text-black rounded flex items-center justify-center transition-colors group"
                  >
                    <svg
                      className="w-8 h-8 text-green-400 group-hover:text-black"
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
                    className="w-16 h-16 bg-green-500/20 border border-green-500 hover:bg-green-500 hover:text-black rounded flex items-center justify-center transition-colors group"
                  >
                    <svg
                      className="w-8 h-8 text-green-400 group-hover:text-black"
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
                    className="w-16 h-16 bg-green-500/20 border border-green-500 hover:bg-green-500 hover:text-black rounded flex items-center justify-center transition-colors group"
                  >
                    <svg
                      className="w-8 h-8 text-green-400 group-hover:text-black"
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
