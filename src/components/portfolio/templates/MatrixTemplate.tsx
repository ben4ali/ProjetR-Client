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

  useEffect(() => {
    if (isPreview) return;
    const text = "RÉVEILLEZ-VOUS... LA MATRICE VOUS TIENT...";
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        setMatrixText(text.slice(0, i + 1));
        i++;
        setTimeout(typeWriter, 50);
      } else {
        setTimeout(() => {
          setIsInitialized(true);
        }, 1000);
      }
    };

    const timeout = setTimeout(typeWriter, 2000);
    return () => clearTimeout(timeout);
  }, [isPreview]);

  useEffect(() => {
    if (isPreview) return;

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
        ease: "easeOut" as const,
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
        className={`relative min-h-screen overflow-hidden bg-black font-mono text-green-400 ${
          isPreview ? "origin-top scale-75" : ""
        }`}
      >
        <canvas
          ref={canvasRef}
          className="pointer-events-none fixed inset-0 z-0"
          style={{ filter: "opacity(0.3)" }}
        />

        {/* Navigation */}
        <nav className="fixed top-0 right-0 left-0 z-50 border-b border-green-500/30 bg-black/80 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-6 py-4">
            <div className="flex items-center justify-between">
              <motion.div
                className="text-2xl font-bold text-green-400"
                whileHover="glitch"
                variants={glitchVariants}
              >
                &gt; {user.firstName}.exe
              </motion.div>
              <div className="hidden space-x-8 md:flex">
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
                    className="group relative text-sm font-medium transition-colors hover:text-white"
                  >
                    <span className="opacity-0 transition-opacity group-hover:opacity-100">
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
          className="relative z-10 flex h-screen items-center justify-center"
        >
          <div className="mx-auto max-w-4xl px-6 text-center">
            {!isInitialized ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-8"
              >
                <div className="mb-8 font-mono text-2xl md:text-4xl">
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
                  <div className="relative mx-auto mb-8 h-48 w-48">
                    <div className="absolute inset-0 animate-pulse rounded-full bg-green-500/20"></div>
                    <img
                      src={user.avatar || "/default-avatar.png"}
                      alt={user.firstName}
                      className="relative z-10 h-full w-full rounded-full border-2 border-green-500 object-cover brightness-110 contrast-125 filter"
                    />
                    <div className="absolute inset-0 animate-ping rounded-full bg-green-500/10"></div>
                  </div>
                </div>
                <motion.h1
                  className="mb-6 text-6xl font-bold text-green-400 md:text-8xl"
                  whileHover="glitch"
                  variants={glitchVariants}
                >
                  &gt; {user.firstName}
                  <br />
                  <span className="text-4xl text-white md:text-6xl">
                    {user.lastName}
                  </span>
                </motion.h1>{" "}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-8 text-xl text-green-300 md:text-2xl"
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
                    <span className="inline-block rounded border border-green-500 bg-green-500/20 px-6 py-2 font-mono text-green-400">
                      ROLE: {jobTitle.toUpperCase()}
                    </span>
                  </motion.div>
                )}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6"
                >
                  {" "}
                  <button className="rounded bg-green-500 px-8 py-3 font-bold text-black shadow-lg transition-colors hover:bg-green-600">
                    &gt; EXÉCUTER PORTFOLIO
                  </button>
                  {cvDownloadUrl && (
                    <button
                      onClick={handleCVDownload}
                      className="rounded border border-green-500 px-8 py-3 font-bold text-green-500 transition-colors hover:bg-green-500 hover:text-black"
                    >
                      &gt; TÉLÉCHARGER CV
                    </button>
                  )}
                </motion.div>
              </motion.div>
            )}
          </div>

          <div className="absolute bottom-10 left-10 text-xs text-green-600 opacity-50">
            <div>&gt; system_status: ONLINE</div>
            <div>&gt; user_authenticated: TRUE</div>
            <div>&gt; matrix_level: {yearsOfExperience || 5}</div>
          </div>
        </section>

        {/* About Section */}
        <section className="relative z-10 bg-black/90 px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-16 md:grid-cols-2">
              <div>
                {" "}
                <h2 className="mb-8 text-5xl font-bold text-green-400">
                  &gt; ABOUT.EXE
                </h2>
                <div className="space-y-4 text-lg">
                  <div className="rounded border border-green-500/30 bg-green-500/5 p-4 font-mono">
                    <div className="mb-2 text-sm text-green-600">
                      &gt; Chargement du profil...
                    </div>
                    <p className="leading-relaxed text-green-300">
                      {about ||
                        "Je suis un architecte numérique qui navigue entre les lignes de code et la réalité. Dans cette matrice de possibilités infinies, je conçois des solutions qui comblent le fossé entre les besoins humains et le potentiel technologique."}
                    </p>
                  </div>
                  {yearsOfExperience && (
                    <div className="flex items-center">
                      <span className="text-green-500">
                        &gt; EXPERIENCE_LEVEL:
                      </span>
                      <span className="ml-2 font-bold text-white">
                        {yearsOfExperience} YEARS
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded border border-green-500/30 bg-green-500/5 p-6">
                  <div className="mb-4 font-mono text-sm text-green-400">
                    &gt; SYSTEM_INFO
                  </div>{" "}
                  <div className="space-y-2 font-mono text-sm">
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
        <section ref={skillsRef} className="relative z-10 bg-black px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-16 text-center text-5xl font-bold text-green-400">
              &gt; SKILLS.DATABASE
            </h2>

            <div className="grid gap-8 md:grid-cols-2">
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
                    <div className="rounded border border-green-500/30 bg-green-500/5 p-4 transition-all duration-300 hover:border-green-400/50">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-mono text-green-400">
                          &gt; {skill.name.toUpperCase()}
                        </span>
                        <span className="font-bold text-white">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="relative h-2 overflow-hidden rounded bg-gray-800">
                        <div
                          className="skill-bar absolute top-0 left-0 h-full rounded bg-gradient-to-r from-green-600 to-green-400 transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                        <div className="absolute inset-0 animate-pulse bg-green-400/20"></div>
                      </div>{" "}
                      <div className="mt-1 font-mono text-xs text-green-600">
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
        <section className="relative z-10 bg-black/90 px-6 py-20">
          <div className="mx-auto max-w-7xl">
            {" "}
            <h2 className="mb-16 text-center text-5xl font-bold text-green-400">
              &gt; PROJETS.ARCHIVE
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projets.slice(0, 6).map((projet, index) => (
                <motion.div
                  key={projet.id}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProject(projet)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="overflow-hidden rounded border border-green-500/30 bg-green-500/5 transition-all duration-300 hover:border-green-400/50">
                    <div className="relative aspect-video overflow-hidden">
                      {" "}
                      {projet.previewImageUrl ? (
                        <img
                          src={projet.previewImageUrl}
                          alt={projet.title}
                          className="h-full w-full object-cover brightness-75 contrast-125 filter transition-all duration-300 group-hover:brightness-100"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-green-900 to-black">
                          <span className="text-6xl text-green-500">&gt;_</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-green-500/10 transition-colors duration-300 group-hover:bg-green-500/20"></div>{" "}
                      <div className="absolute top-2 left-2 font-mono text-xs text-green-400">
                        PROJET_{String(index + 1).padStart(3, "0")}.EXE
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="mb-2 font-mono text-xl font-bold text-green-400">
                        &gt; {projet.title.toUpperCase()}
                      </h3>
                      <p className="mb-4 line-clamp-2 text-sm text-green-300">
                        {projet.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {projet.tags?.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded border border-green-500 bg-green-500/20 px-2 py-1 font-mono text-xs text-green-400"
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
                    <div className="overflow-hidden rounded border border-green-500/30 bg-green-500/5">
                      <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-green-900 to-black">
                        <span className="text-6xl text-green-500">&gt;_</span>
                      </div>
                      <div className="p-6">
                        <h3 className="mb-2 font-mono text-xl font-bold text-green-400">
                          &gt; {projet.title.toUpperCase()}
                        </h3>
                        <p className="mb-4 text-sm text-green-300">
                          {projet.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {projet.tags?.map((tag) => (
                            <span
                              key={tag}
                              className="rounded border border-green-500 bg-green-500/20 px-2 py-1 font-mono text-xs text-green-400"
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
        <section className="relative z-10 bg-black px-6 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-8 text-5xl font-bold text-green-400">
              &gt; CONTACT.SYS
            </h2>
            <div className="rounded border border-green-500/30 bg-green-500/5 p-8">
              {" "}
              <p className="mb-8 font-mono text-xl text-green-300">
                &gt; ÉTABLIR CONNEXION? [O/N]
              </p>
              <div className="flex justify-center space-x-8">
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-16 w-16 items-center justify-center rounded border border-green-500 bg-green-500/20 transition-colors hover:bg-green-500 hover:text-black"
                  >
                    <svg
                      className="h-8 w-8 text-green-400 group-hover:text-black"
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
                    className="group flex h-16 w-16 items-center justify-center rounded border border-green-500 bg-green-500/20 transition-colors hover:bg-green-500 hover:text-black"
                  >
                    <svg
                      className="h-8 w-8 text-green-400 group-hover:text-black"
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
                    className="group flex h-16 w-16 items-center justify-center rounded border border-green-500 bg-green-500/20 transition-colors hover:bg-green-500 hover:text-black"
                  >
                    <svg
                      className="h-8 w-8 text-green-400 group-hover:text-black"
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
            variant="matrix"
          />
        )}
      </AnimatePresence>
    </>
  );
};
