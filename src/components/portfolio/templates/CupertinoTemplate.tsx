import { FC, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Portfolio } from "../../../types/Portfolio";
import { Projet } from "../../../types/Projet";
import { ProjectVideoDialog } from "../ProjectVideoDialog";

gsap.registerPlugin(ScrollTrigger);

interface CupertinoTemplateProps {
  portfolio: Portfolio;
  isPreview?: boolean;
}

export const CupertinoTemplate: FC<CupertinoTemplateProps> = ({
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
  const [time, setTime] = useState(new Date());
  const heroContentRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isPreview) return;

    if (heroContentRef.current) {
      const elements =
        heroContentRef.current.querySelectorAll(".animate-element");

      gsap.fromTo(
        elements,
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
        },
      );
    }

    if (projectsRef.current) {
      const cards = projectsRef.current.querySelectorAll(".project-card");

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            y: 100,
            opacity: 0,
            scale: 0.8,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
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
        className={`min-h-screen bg-gray-50 text-gray-900 ${
          isPreview ? "origin-top scale-75" : ""
        }`}
      >
        {/* Header */}
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/80 backdrop-blur-xl"
        >
          <nav className="mx-auto max-w-6xl px-6 py-4">
            <div className="flex items-center justify-between">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                  <span className="text-sm font-bold text-white">
                    {user.firstName[0]}
                  </span>
                </div>
                <span className="text-lg font-semibold">{user.firstName}</span>
              </motion.div>{" "}
              <div className="hidden items-center space-x-8 md:flex">
                {["À Propos", "Travaux", "Compétences", "Contact"].map(
                  (item, index) => (
                    <motion.a
                      key={item}
                      href={`#${["about", "work", "skills", "contact"][index]}`}
                      whileHover={{ y: -2 }}
                      className="group relative font-medium text-gray-600 transition-colors hover:text-gray-900"
                    >
                      {item}
                      <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                    </motion.a>
                  ),
                )}
              </div>
              <div className="font-mono text-sm text-gray-500">
                {time.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </nav>
        </motion.header>

        {/* Hero Section */}
        <section className="px-6 py-20">
          <div ref={heroContentRef} className="mx-auto max-w-4xl text-center">
            <div className="animate-element mb-8">
              <motion.div
                whileHover={{ scale: 1.1, rotateY: 10 }}
                className="relative mx-auto mb-8 h-32 w-32"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl"></div>
                <img
                  src={user.avatar || "/default-avatar.png"}
                  alt={user.firstName}
                  className="relative z-10 h-full w-full rounded-3xl object-cover"
                />
                <div className="absolute inset-0 z-20 rounded-3xl bg-gradient-to-t from-black/20 to-transparent"></div>
              </motion.div>
            </div>{" "}
            <h1 className="animate-element mb-6 text-5xl font-light tracking-tight md:text-7xl">
              {title || (
                <>
                  <span className="font-extralight">Bonjour, je suis</span>
                  <br />
                  <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text font-semibold text-transparent">
                    {user.firstName} {user.lastName}
                  </span>
                </>
              )}
            </h1>
            <p className="animate-element mb-8 text-2xl font-light text-gray-600">
              {jobTitle || "Designer & Développeur"}
            </p>{" "}
            {hook && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="animate-element mb-8"
              >
                <p className="inline-block rounded-2xl bg-blue-50 px-6 py-3 text-lg font-medium text-blue-600">
                  {hook}
                </p>
              </motion.div>
            )}
            <div className="animate-element mx-auto mb-12 max-w-2xl">
              <p className="text-lg leading-relaxed text-gray-700">
                {about ||
                  "Je crée des expériences numériques réfléchies qui donnent vie aux idées avec la même attention aux détails et à l&apos;innovation qui définit un grand design."}
              </p>
            </div>
            <div className="animate-element space-x-4">
              <motion.a
                href="#work"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center rounded-2xl bg-blue-500 px-8 py-4 font-medium text-white shadow-lg transition-all duration-300 hover:bg-blue-600 hover:shadow-xl"
              >
                Voir Mes Travaux
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center rounded-2xl bg-gray-100 px-8 py-4 font-medium text-gray-900 transition-all duration-300 hover:bg-gray-200"
              >
                Entrer en Contact
              </motion.a>
            </div>
          </div>
        </section>

        {/* Work Section */}
        <section id="work" className="bg-white px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-16 text-center"
            >
              {" "}
              <h2 className="mb-4 text-4xl font-light tracking-tight md:text-5xl">
                Travaux Sélectionnés
              </h2>
              <div className="mx-auto h-0.5 w-16 bg-gray-300"></div>
            </motion.div>

            <div ref={projectsRef} className="space-y-20">
              {projets.slice(0, 4).map((projet, index) => (
                <div
                  key={projet.id}
                  className={`project-card grid items-center gap-12 md:grid-cols-2 ${
                    index % 2 === 1 ? "md:grid-flow-col-dense" : ""
                  }`}
                >
                  <motion.div
                    className={`${index % 2 === 1 ? "md:col-start-2" : ""}`}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedProject(projet)}
                  >
                    <div className="group cursor-pointer overflow-hidden rounded-3xl bg-gray-100 shadow-xl transition-all duration-500 hover:shadow-2xl">
                      {projet.demoUrl ? (
                        <div className="relative">
                          <video
                            className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            src={projet.demoUrl}
                          />
                          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10"></div>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <div className="rounded-full bg-white/90 p-4 text-gray-900 shadow-lg">
                              <svg
                                className="h-8 w-8"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                          <div className="text-center text-gray-500">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg">
                              <svg
                                className="h-8 w-8"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                            </div>
                            <p className="font-medium">Aperçu du Projet</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>

                  <div className={`${index % 2 === 1 ? "md:col-start-1" : ""}`}>
                    <div className="space-y-6">
                      <div>
                        <h3 className="mb-3 text-3xl font-semibold tracking-tight">
                          {projet.title}
                        </h3>
                        <p className="text-lg leading-relaxed text-gray-600">
                          {projet.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {projet.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
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
                          className="flex items-center font-medium text-blue-500 hover:text-blue-600"
                        >
                          Voir le Projet
                          <svg
                            className="ml-2 h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </motion.button>

                        {projet.githubUrl && (
                          <motion.a
                            href={projet.githubUrl}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center font-medium text-gray-600 hover:text-gray-900"
                          >
                            Code Source
                            <svg
                              className="ml-2 h-4 w-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                            </svg>
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {projets.length === 0 &&
                [
                  {
                    name: "App Météo iOS",
                    desc: "Application météo intuitive avec mises à jour en temps réel et belles animations.",
                    tech: ["Swift", "CoreAnimation", "UIKit", "APIs"],
                  },
                  {
                    name: "Suite Productivité macOS",
                    desc: "Suite d&apos;applications macOS natives conçue pour les professionnels créatifs.",
                    tech: ["SwiftUI", "AppKit", "Core Data", "CloudKit"],
                  },
                  {
                    name: "Bibliothèque Système Design",
                    desc: "Système de design complet avec composants et directives.",
                    tech: ["Figma", "React", "TypeScript", "Storybook"],
                  },
                ].map((project, index) => (
                  <div
                    key={index}
                    className={`project-card grid items-center gap-12 md:grid-cols-2 ${
                      index % 2 === 1 ? "md:grid-flow-col-dense" : ""
                    }`}
                  >
                    <motion.div
                      className={`${index % 2 === 1 ? "md:col-start-2" : ""}`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex aspect-video items-center justify-center overflow-hidden rounded-3xl bg-gray-100 shadow-xl">
                        <div className="text-center text-gray-500">
                          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg">
                            <svg
                              className="h-8 w-8"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          </div>
                          <p className="font-medium">{project.name}</p>
                        </div>
                      </div>
                    </motion.div>

                    <div
                      className={`${index % 2 === 1 ? "md:col-start-1" : ""}`}
                    >
                      <div className="space-y-6">
                        <div>
                          <h3 className="mb-3 text-3xl font-semibold tracking-tight">
                            {project.name}
                          </h3>
                          <p className="text-lg leading-relaxed text-gray-600">
                            {project.desc}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                            >
                              {tech}
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

        {/* Skills Section */}
        <section id="skills" className="bg-gray-50 px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-16 text-center"
            >
              {" "}
              <h2 className="mb-4 text-4xl font-light tracking-tight md:text-5xl">
                Compétences & Expertise
              </h2>
              <div className="mx-auto h-0.5 w-16 bg-gray-300"></div>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h3 className="mb-6 text-2xl font-semibold">
                  Compétences Techniques
                </h3>
                <div className="space-y-4">
                  {(skills?.length > 0
                    ? skills.slice(0, 6)
                    : [
                        { name: "Swift", level: 90 },
                        { name: "SwiftUI", level: 85 },
                        { name: "React", level: 88 },
                        { name: "TypeScript", level: 82 },
                        { name: "Node.js", level: 80 },
                        { name: "Python", level: 75 },
                      ]
                  ).map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm"
                    >
                      <span className="font-medium text-gray-900">
                        {skill.name}
                      </span>
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-200">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                          viewport={{ once: true }}
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                        ></motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                {" "}
                <h3 className="mb-6 text-2xl font-semibold">
                  Philosophie Design
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      title: "Design Centré Utilisateur",
                      desc: "Chaque décision est prise en gardant à l&apos;esprit les besoins et l&apos;expérience de l&apos;utilisateur.",
                    },
                    {
                      title: "Attention aux Détails",
                      desc: "Les plus petits détails font la plus grande différence dans la création d&apos;expériences exceptionnelles.",
                    },
                    {
                      title: "Interfaces Intuitives",
                      desc: "La technologie devrait sembler naturelle et sans effort à utiliser.",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      viewport={{ once: true }}
                      className="rounded-2xl bg-white p-6 shadow-sm"
                    >
                      <h4 className="mb-2 font-semibold text-gray-900">
                        {item.title}
                      </h4>
                      <p className="leading-relaxed text-gray-600">
                        {item.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {yearsOfExperience && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
                className="mt-16 text-center"
              >
                <div className="inline-block rounded-3xl bg-white p-8 shadow-lg">
                  {" "}
                  <div className="mb-2 text-5xl font-light text-gray-900">
                    {yearsOfExperience}+
                  </div>
                  <div className="text-gray-600">Années d&apos;Expérience</div>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-white px-6 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              {" "}
              <h2 className="mb-6 text-4xl font-light tracking-tight md:text-5xl">
                Travaillons Ensemble
              </h2>
              <div className="mx-auto mb-8 h-0.5 w-16 bg-gray-300"></div>
              <p className="mx-auto max-w-2xl text-xl leading-relaxed text-gray-600">
                Je suis toujours enthousiaste à l&apos;idée de collaborer sur
                des projets qui repoussent les limites et créent un impact
                significatif.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-x-6"
            >
              <motion.a
                href={`mailto:${user.email}`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center rounded-2xl bg-blue-500 px-8 py-4 font-medium text-white shadow-lg transition-all duration-300 hover:bg-blue-600 hover:shadow-xl"
              >
                <svg
                  className="mr-3 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Envoyer Message
              </motion.a>

              {cvDownloadUrl && (
                <motion.button
                  onClick={handleCVDownload}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center rounded-2xl bg-gray-100 px-8 py-4 font-medium text-gray-900 transition-all duration-300 hover:bg-gray-200"
                >
                  <svg
                    className="mr-3 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Télécharger CV
                </motion.button>
              )}
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-12 flex justify-center space-x-6"
            >
              {githubUrl && (
                <motion.a
                  href={githubUrl}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-gray-600 transition-all duration-300 hover:bg-gray-200 hover:text-gray-900"
                >
                  <svg
                    className="h-6 w-6"
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
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-gray-600 transition-all duration-300 hover:bg-gray-200 hover:text-gray-900"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                  </svg>
                </motion.a>
              )}
            </motion.div>
          </div>
        </section>
      </div>

      {selectedProject && (
        <ProjectVideoDialog
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          variant="cupertino"
        />
      )}
    </>
  );
};
