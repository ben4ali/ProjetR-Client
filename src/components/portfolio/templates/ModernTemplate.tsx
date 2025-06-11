import { FC, useState } from "react";
import { Portfolio } from "../../../types/Portfolio";
import { ProjectVideoDialog } from "../ProjectVideoDialog";

interface ModernTemplateProps {
  portfolio: Portfolio;
  isPreview?: boolean;
}

export const ModernTemplate: FC<ModernTemplateProps> = ({
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
  const [selectedProject, setSelectedProject] = useState<
    (typeof projets)[0] | null
  >(null);

  return (
    <div
      className={`bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white min-h-screen ${
        isPreview ? "scale-75 origin-top" : ""
      }`}
    >
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="mb-8">
            <img
              src={user.avatar || "/default-avatar.png"}
              alt={user.firstName}
              className="w-32 h-32 rounded-full mx-auto border-4 border-white shadow-2xl"
            />
          </div>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {title || `${user.firstName} ${user.lastName}`}
          </h1>{" "}
          <p className="text-2xl mb-8 text-gray-300">
            {jobTitle || "Développeur Full Stack"}
          </p>{" "}
          <div className="space-x-4">
            <a
              href="#projets"
              className="inline-block bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full transition-colors"
            >
              Voir Mon Travail
            </a>
            <a
              href="#contact"
              className="inline-block border border-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-full transition-colors"
            >
              Me Contacter
            </a>
          </div>
        </div>
      </header>{" "}
      <section id="apropos" className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            {" "}
            <h2 className="text-4xl font-bold mb-8">À Propos de Moi</h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              {about ||
                "Développeur passionné créant des solutions innovantes avec les technologies modernes. Je me spécialise dans la création d'applications web évolutives et donner vie aux idées grâce au code."}
            </p>
            <div className="flex space-x-4 mb-8">
              {githubUrl && (
                <a
                  href={githubUrl}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
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
                  className="text-blue-400 hover:text-blue-300 transition-colors"
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
          </div>
          <div>
            {" "}
            <h3 className="text-2xl font-bold mb-6">Compétences</h3>
            <div className="grid grid-cols-2 gap-4">
              {skills?.slice(0, 8).map((skill) => (
                <div
                  key={skill}
                  className="bg-gray-800 p-3 rounded-lg text-center"
                >
                  {skill}
                </div>
              ))}
              {skills?.length === 0 &&
                [
                  "React",
                  "TypeScript",
                  "Node.js",
                  "Python",
                  "PostgreSQL",
                  "AWS",
                  "Docker",
                  "Git",
                ].map((skill) => (
                  <div
                    key={skill}
                    className="bg-gray-800 p-3 rounded-lg text-center"
                  >
                    {skill}
                  </div>
                ))}
            </div>
            <div className="mt-8 text-center">
              <div className="text-3xl font-bold text-blue-400">
                {yearsOfExperience || 5}+
              </div>
              <div className="text-gray-400">Années d&apos;Expérience</div>
            </div>
          </div>
        </div>
      </section>{" "}
      <section id="projets" className="py-20 px-6 bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Projets en Vedette
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {" "}
            {projets.slice(0, 6).map((projet) => (
              <div
                key={projet.id}
                className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
              >
                {" "}
                <div
                  className="h-48 relative group cursor-pointer overflow-hidden"
                  onClick={() => setSelectedProject(projet)}
                >
                  {projet.demoUrl ? (
                    <>
                      <video
                        className="w-full h-full object-cover"
                        src={projet.demoUrl}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50">
                        <svg
                          className="w-12 h-12 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50">
                        <svg
                          className="w-12 h-12 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{projet.title}</h3>
                  <p className="text-gray-300 mb-4">{projet.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {projet.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="bg-blue-600 px-2 py-1 rounded text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setSelectedProject(projet)}
                      className="text-purple-400 hover:text-purple-300 flex items-center gap-1"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      Voir Vidéo
                    </button>
                    {projet.githubUrl && (
                      <a
                        href={projet.githubUrl}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        Code Source
                      </a>
                    )}
                    {projet.liveUrl &&
                      !projet.liveUrl.includes("youtube") &&
                      !projet.liveUrl.includes("vimeo") && (
                        <a
                          href={projet.liveUrl}
                          className="text-green-400 hover:text-green-300"
                        >
                          Démo en Direct
                        </a>
                      )}
                  </div>
                </div>
              </div>
            ))}
            {projets.length === 0 &&
              [
                {
                  name: "Plateforme E-Commerce",
                  desc: "Application web full-stack avec intégration de paiement",
                },
                {
                  name: "Gestionnaire de Tâches",
                  desc: "Application de productivité basée sur React",
                },
                {
                  name: "Passerelle API",
                  desc: "Architecture microservices avec Node.js",
                },
              ].map((project, index) => (
                <div
                  key={index}
                  className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
                >
                  <div className="h-48 bg-gradient-to-br from-blue-600 to-purple-600"></div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                    <p className="text-gray-300 mb-4">{project.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-blue-600 px-2 py-1 rounded text-sm">
                        React
                      </span>
                      <span className="bg-blue-600 px-2 py-1 rounded text-sm">
                        Node.js
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>{" "}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Travaillons Ensemble</h2>
          <p className="text-xl text-gray-300 mb-12">
            Prêt à donner vie à vos idées ? Parlons-en !
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href={`mailto:${user.email}`}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full transition-colors"
            >
              Envoyer un Email
            </a>
            <a
              href={cvDownloadUrl || "#"}
              className="bg-gray-700 hover:bg-gray-600 px-8 py-3 rounded-full transition-colors"
              download
            >
              Télécharger mon CV
            </a>
          </div>
        </div>
      </section>{" "}
      {selectedProject && (
        <ProjectVideoDialog
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          project={selectedProject}
          variant="modern"
        />
      )}
    </div>
  );
};
