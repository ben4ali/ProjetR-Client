import { FC, useState } from "react";
import { Portfolio } from "../../../types/Portfolio";
import { ProjectVideoDialog } from "../ProjectVideoDialog";

interface ClassicTemplateProps {
  portfolio: Portfolio;
  isPreview?: boolean;
}

export const ClassicTemplate: FC<ClassicTemplateProps> = ({
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
      className={`bg-white text-gray-800 min-h-screen ${
        isPreview ? "scale-75 origin-top" : ""
      }`}
    >
      <header className="bg-gray-50 border-b-2 border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={user.avatar || "/default-avatar.png"}
                alt={user.firstName}
                className="w-16 h-16 rounded-full border-2 border-gray-300"
              />{" "}
              <div>
                <h1 className="text-2xl font-serif font-bold">
                  {title || `${user.firstName} ${user.lastName}`}
                </h1>
                <p className="text-gray-600">Développeur Professionnel</p>
              </div>
            </div>{" "}
            <nav className="hidden md:flex space-x-8">
              <a
                href="#about"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                À propos
              </a>{" "}
              <a
                href="#about"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Expérience
              </a>
              <a
                href="#portfolio"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Portfolio
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {" "}
          <h2 className="text-5xl font-serif font-bold mb-6 text-gray-900">
            {jobTitle || "Créer l'Excellence Numérique"}
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            {about ||
              "Avec plus de 5 ans d'expérience en développement logiciel, je me spécialise dans la création d'applications robustes et évolutives qui favorisent le succès des entreprises."}
          </p>{" "}
          <a
            href="#portfolio"
            className="bg-gray-900 text-white px-8 py-3 hover:bg-gray-800 transition-colors font-medium inline-block"
          >
            Voir Mon Travail
          </a>
        </div>
      </section>{" "}
      <section id="about" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              {" "}
              <h3 className="text-3xl font-serif font-bold mb-6">
                À Propos de Moi
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {about ||
                  "Je suis un ingénieur logiciel dévoué avec une passion pour la création de solutions innovantes. Mon expertise couvre le développement full-stack, avec un accent particulier sur les technologies web modernes."}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="border-l-4 border-gray-900 pl-4">
                  <div className="text-2xl font-bold text-gray-900">
                    {projets.length}+
                  </div>
                  <div className="text-gray-600">Projets Complétés</div>
                </div>
                <div className="border-l-4 border-gray-900 pl-4">
                  <div className="text-2xl font-bold text-gray-900">
                    {yearsOfExperience || 5}+
                  </div>
                  <div className="text-gray-600">Années d&apos;Expérience</div>
                </div>
              </div>
              {(githubUrl || linkedinUrl) && (
                <div className="flex space-x-4 mt-6">
                  {githubUrl && (
                    <a
                      href={githubUrl}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
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
                      className="text-gray-600 hover:text-gray-900 transition-colors"
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
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold mb-6">
                Compétences Principales
              </h4>{" "}
              <div className="space-y-4">
                {skills.slice(0, 4).map((skill, index) => {
                  const levels = [90, 85, 80, 75];
                  return (
                    <div key={skill}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{skill}</span>
                        <span className="text-sm text-gray-600">
                          {levels[index] || 75}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gray-900 h-2 rounded-full"
                          style={{ width: `${levels[index] || 75}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>{" "}
      <section id="portfolio" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          {" "}
          <h3 className="text-3xl font-serif font-bold mb-12 text-center">
            Projets en Vedette
          </h3>
          <div className="space-y-8">
            {projets.slice(0, 3).map((projet) => (
              <div
                key={projet.id}
                className="border-l-4 border-gray-300 pl-8 pb-8"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xl font-semibold">{projet.title}</h4>
                  <span className="text-gray-600">
                    {new Date(projet.createdAt).getFullYear()}
                  </span>
                </div>
                <p className="text-gray-700 mb-2">
                  {projet.tags?.join(", ") || "Développement Full Stack"}
                </p>
                <p className="text-gray-600 mb-4">{projet.description}</p>

                <div className="flex space-x-4">
                  {projet.githubUrl && (
                    <a
                      href={projet.githubUrl}
                      className="inline-flex items-center text-gray-900 hover:text-gray-700 font-medium"
                    >
                      Voir le Projet →
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedProject(projet)}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    🎥 Voir la Vidéo
                  </button>
                </div>
              </div>
            ))}
            {projets.length === 0 && (
              <div className="border-l-4 border-gray-300 pl-8 pb-8">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xl font-semibold">
                    Développeur Full Stack Senior
                  </h4>
                  <span className="text-gray-600">2022 - Présent</span>
                </div>
                <p className="text-gray-700 mb-2">Tech Solutions Inc.</p>
                <p className="text-gray-600">
                  Dirigé le développement d&apos;applications d&apos;entreprise
                  servant plus de 10 000 utilisateurs. Implémenté une
                  architecture de microservices et amélioré les performances du
                  système de 40%.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>{" "}
      <section id="contact" className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          {" "}
          <h3 className="text-3xl font-serif font-bold mb-8">
            Entrer en Contact
          </h3>
          <p className="text-xl text-gray-300 mb-12">
            Prêt à discuter de votre prochain projet ? J&apos;aimerais avoir de
            vos nouvelles.
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href={`mailto:${user.email}`}
              className="bg-white text-gray-900 px-8 py-3 hover:bg-gray-100 transition-colors font-medium"
            >
              M&apos;Envoyer un Email
            </a>
            <a
              href={cvDownloadUrl || "#"}
              className="border border-white text-white px-8 py-3 hover:bg-white hover:text-gray-900 transition-colors font-medium"
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
          variant="classic"
        />
      )}
    </div>
  );
};
