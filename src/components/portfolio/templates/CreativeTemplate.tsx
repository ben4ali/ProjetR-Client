import { FC, useState } from "react";
import { Portfolio } from "../../../types/Portfolio";
import { Projet } from "../../../types/Projet";
import { ProjectVideoDialog } from "../ProjectVideoDialog";

interface CreativeTemplateProps {
  portfolio: Portfolio;
  isPreview?: boolean;
}

export const CreativeTemplate: FC<CreativeTemplateProps> = ({
  portfolio,
  isPreview = false,
}) => {
  const {
    user,
    title,
    about,
    skills = [],
    githubUrl,
    linkedinUrl,
    projets = [],
    yearsOfExperience,
    cvDownloadUrl,
    jobTitle,
  } = portfolio;
  const [selectedProject, setSelectedProject] = useState<Projet | null>(null);

  const handleCVDownload = () => {
    if (cvDownloadUrl) {
      window.open(cvDownloadUrl, "_blank");
    }
  };

  return (
    <>
      <div
        className={`bg-black text-white min-h-screen overflow-hidden ${
          isPreview ? "scale-75 origin-top" : ""
        }`}
      >
        <section className="relative h-screen flex items-center justify-center">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-500 via-purple-600 to-blue-600 opacity-20"></div>
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-400 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-400 rounded-full filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
          </div>
          <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
            <div className="mb-8 relative">
              <img
                src={user.avatar || "/default-avatar.png"}
                alt={user.firstName}
                className="w-40 h-40 rounded-full mx-auto border-4 border-white shadow-2xl transform hover:rotate-12 transition-transform duration-500"
              />
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-400 rounded-full animate-bounce animation-delay-1000"></div>
            </div>
            <h1 className="text-7xl font-black mb-4 transform hover:scale-105 transition-transform">
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                {title ? title.split(" ")[0] : user.firstName}
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-green-400 to-pink-400 bg-clip-text text-transparent">
                {title ? title.split(" ").slice(1).join(" ") : user.lastName}
              </span>
            </h1>
            <p className="text-2xl mb-8 text-gray-300 font-light">
              {jobTitle || "Développeur Créatif & Artiste Numérique"}
            </p>
            {yearsOfExperience && (
              <div className="mb-8">
                <div className="text-4xl font-bold text-yellow-400 mb-2">
                  {yearsOfExperience}+
                </div>
                <div className="text-lg text-gray-300">
                  Années d&apos;Expérience
                </div>
              </div>
            )}{" "}
            <div className="flex justify-center space-x-4">
              <a
                href="#projets"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 px-8 py-4 rounded-full font-bold transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Explorez Mon Art
              </a>
              {cvDownloadUrl && (
                <button
                  onClick={handleCVDownload}
                  className="border-2 border-white hover:bg-white hover:text-black px-8 py-4 rounded-full font-bold transform hover:scale-105 transition-all duration-300"
                >
                  Télécharger CV
                </button>
              )}
            </div>
          </div>{" "}
        </section>

        <section id="about" className="py-20 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20"></div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                {" "}
                <h2 className="text-5xl font-black bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
                  À Propos de Moi
                </h2>{" "}
                <p className="text-xl text-gray-300 leading-relaxed">
                  {about ||
                    "Je suis un développeur créatif qui croit que le code est un art et l'art est du code. Je mélange l'expertise technique avec la vision artistique pour créer des expériences numériques qui ne fonctionnent pas seulement—elles inspirent."}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 p-6 rounded-2xl backdrop-blur-sm border border-pink-300/20">
                    <div className="text-3xl font-black text-pink-400">
                      {projets.length}+
                    </div>
                    <div className="text-gray-400">Projets</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500/20 to-green-500/20 p-6 rounded-2xl backdrop-blur-sm border border-blue-300/20">
                    <div className="text-3xl font-black text-blue-400">
                      100%
                    </div>
                    <div className="text-gray-400">Passion</div>
                  </div>
                </div>
                {(githubUrl || linkedinUrl) && (
                  <div className="flex space-x-4">
                    {githubUrl && (
                      <a
                        href={githubUrl}
                        className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 p-3 rounded-xl backdrop-blur-sm border border-pink-300/20 hover:from-pink-500/30 hover:to-purple-500/30 transition-all"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                    )}
                    {linkedinUrl && (
                      <a
                        href={linkedinUrl}
                        className="bg-gradient-to-r from-blue-500/20 to-green-500/20 p-3 rounded-xl backdrop-blur-sm border border-blue-300/20 hover:from-blue-500/30 hover:to-green-500/30 transition-all"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl transform rotate-6"></div>
                <div className="relative bg-black p-8 rounded-3xl border border-purple-300/20">
                  <h3 className="text-2xl font-bold mb-6 text-center">
                    Arsenal Créatif
                  </h3>{" "}
                  <div className="space-y-4">
                    {skills.slice(0, 6).map((skill) => (
                      <div
                        key={skill}
                        className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-purple-900/30 to-pink-900/30 hover:from-purple-800/40 hover:to-pink-800/40 transition-all"
                      >
                        <span className="text-2xl">⚡</span>
                        <span className="font-medium">{skill}</span>
                      </div>
                    ))}
                    {skills.length === 0 &&
                      [
                        { tool: "React/Next.js", icon: "⚛️" },
                        { tool: "Three.js/WebGL", icon: "🎮" },
                        { tool: "Adobe Creative Suite", icon: "🎨" },
                        { tool: "Blender/3D Modeling", icon: "🏗️" },
                        { tool: "Motion Graphics", icon: "🎬" },
                        { tool: "UI/UX Design", icon: "✨" },
                      ].map(({ tool, icon }) => (
                        <div
                          key={tool}
                          className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-purple-900/30 to-pink-900/30 hover:from-purple-800/40 hover:to-pink-800/40 transition-all"
                        >
                          <span className="text-2xl">{icon}</span>
                          <span className="font-medium">{tool}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
        </section>

        <section
          id="projets"
          className="py-20 px-6 bg-gradient-to-br from-purple-900/10 to-pink-900/10"
        >
          <div className="max-w-6xl mx-auto">
            {" "}
            <h2 className="text-5xl font-black text-center mb-16 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Créations Vedettes
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {" "}
              {projets.slice(0, 6).map((projet) => (
                <div
                  key={projet.id}
                  className="group relative overflow-hidden rounded-2xl cursor-pointer"
                  onClick={() => setSelectedProject(projet)}
                >
                  {" "}
                  <div className="aspect-square bg-gradient-to-br from-pink-500 via-purple-600 to-blue-600 p-1">
                    {projet.demoUrl ? (
                      <div className="w-full h-full rounded-2xl overflow-hidden relative">
                        <video
                          className="w-full h-full object-cover"
                          src={projet.demoUrl}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-neutral-800/75" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <h3 className="text-xl font-bold mb-2 text-white drop-shadow-lg">
                              {projet.title}
                            </h3>
                            <p className="text-gray-200 text-sm drop-shadow-lg">
                              {projet.course || "Expérience numérique créative"}
                            </p>
                            {projet.demoUrl && (
                              <div className="mt-2 text-yellow-400 text-xs drop-shadow-lg">
                                ▶ Vidéo disponible
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-black rounded-2xl flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                        <div className="text-center">
                          <h3 className="text-xl font-bold mb-2">
                            {projet.title}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {projet.course || "Expérience numérique créative"}
                          </p>
                          {projet.demoUrl && (
                            <div className="mt-2 text-yellow-400 text-xs">
                              ▶ Vidéo disponible
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-neutral-800/75 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <div className="flex space-x-2">
                      {projet.demoUrl ? (
                        <button className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform">
                          ▶ Voir Vidéo
                        </button>
                      ) : (
                        <a
                          href={projet.githubUrl || projet.liveUrl || "#"}
                          className="bg-white text-black px-4 py-2 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Voir Projet
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {projets.length === 0 &&
                [1, 2, 3].map((project) => (
                  <div
                    key={project}
                    className="group relative overflow-hidden rounded-2xl"
                  >
                    <div className="aspect-square bg-gradient-to-br from-pink-500 via-purple-600 to-blue-600 p-1">
                      <div className="w-full h-full bg-black rounded-2xl flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                        <div className="text-center">
                          <h3 className="text-xl font-bold mb-2">
                            Projet {project}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            Expérience numérique créative
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <button className="bg-white text-black px-4 py-2 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        Voir Projet
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>{" "}
        </section>

        <section id="contact" className="py-20 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-900/20 via-purple-900/20 to-blue-900/20"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            {" "}
            <h2 className="text-5xl font-black mb-8 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Créons Ensemble
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Prêt à transformer vos rêves numériques les plus fous en réalité ?
              Collaborons et créons quelque chose d&apos;extraordinaire !
            </p>
            <div className="flex justify-center space-x-6">
              <a
                href={`mailto:${user.email}`}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 px-8 py-4 rounded-full font-bold transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Démarrer un Projet
              </a>{" "}
              <a
                href="#projets"
                className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black px-8 py-4 rounded-full font-bold transform hover:scale-105 transition-all duration-300"
              >
                Voir Portfolio
              </a>
            </div>
          </div>
        </section>
      </div>{" "}
      {selectedProject && (
        <ProjectVideoDialog
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          variant="creative"
        />
      )}
    </>
  );
};
