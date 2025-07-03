import { FC, useState } from "react";
import { Portfolio } from "../../../types/Portfolio";
import { Projet } from "../../../types/Projet";
import { ProjectVideoDialog } from "../ProjectVideoDialog";

interface MinimalistTemplateProps {
  portfolio: Portfolio;
  isPreview?: boolean;
}

export const MinimalistTemplate: FC<MinimalistTemplateProps> = ({
  portfolio,
  isPreview = false,
}) => {
  const {
    user,
    title,
    about,
    hook,
    skills = [],
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
        className={`min-h-screen bg-white text-gray-900 ${
          isPreview ? "origin-top scale-75" : ""
        }`}
      >
        <header className="border-b border-gray-100 px-6 py-8">
          <div className="mx-auto flex max-w-4xl items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={user.avatar || "/default-avatar.png"}
                alt={user.firstName}
                className="h-12 w-12 rounded-full"
              />
              <h1 className="text-xl font-light">
                {user.firstName} {user.lastName}
              </h1>
            </div>
            <nav className="hidden space-x-8 md:flex">
              <a
                href="#work"
                className="text-sm tracking-wider text-gray-600 uppercase hover:text-gray-900"
              >
                Travaux
              </a>
              <a
                href="#about"
                className="text-sm tracking-wider text-gray-600 uppercase hover:text-gray-900"
              >
                À Propos
              </a>
              <a
                href="#contact"
                className="text-sm tracking-wider text-gray-600 uppercase hover:text-gray-900"
              >
                Contact
              </a>
              {cvDownloadUrl && (
                <button
                  onClick={handleCVDownload}
                  className="text-sm tracking-wider text-gray-600 uppercase hover:text-gray-900"
                >
                  CV
                </button>
              )}
            </nav>
          </div>
        </header>
        <section className="px-6 py-32">
          <div className="mx-auto max-w-4xl">
            {" "}
            <div className="max-w-2xl">
              {" "}
              <h2 className="mb-8 text-6xl leading-tight font-light">
                {title ? title.split(" ").slice(0, 2).join(" ") : "Développeur"}{" "}
                &<br />
                <span className="text-gray-600 italic">
                  {jobTitle ||
                    (title
                      ? title.split(" ").slice(2).join(" ")
                      : "Résolveur de Problèmes")}
                </span>
              </h2>
              {hook && (
                <p className="mb-8 border-l-2 border-gray-200 pl-6 text-lg font-light text-gray-500 italic">
                  {hook}
                </p>
              )}
              <p className="mb-12 text-xl leading-relaxed font-light text-gray-600">
                {about ||
                  "Je crée des expériences numériques avec du code propre et un design réfléchi. Chaque ligne sert un objectif."}
              </p>
              {yearsOfExperience && (
                <div className="mb-8">
                  <div className="text-3xl font-light text-gray-900">
                    {yearsOfExperience}+ années d&apos;expérience
                  </div>
                </div>
              )}{" "}
              <a
                href="#work"
                className="inline-block border border-gray-900 px-8 py-3 text-sm tracking-wider uppercase transition-colors hover:bg-gray-900 hover:text-white"
              >
                Voir Travaux Sélectionnés
              </a>
            </div>
          </div>{" "}
        </section>{" "}
        <section id="work" className="bg-gray-50 px-6 py-20">
          <div className="mx-auto max-w-4xl">
            {" "}
            <h3 className="mb-16 text-sm tracking-wider text-gray-600 uppercase">
              Travaux Sélectionnés
            </h3>
            <div className="space-y-16">
              {projets.slice(0, 3).map((projet, index) => (
                <div
                  key={projet.id}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProject(projet)}
                >
                  <div className="grid items-center gap-12 md:grid-cols-2">
                    {" "}
                    <div className="group relative aspect-video cursor-pointer overflow-hidden">
                      {projet.demoUrl ? (
                        <>
                          <video
                            className="h-full w-full object-cover"
                            src={projet.demoUrl}
                          />
                          <div className="absolute inset-0 bg-gray-900/0 transition-colors group-hover:bg-gray-900/10" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                            <div className="rounded bg-white/90 px-4 py-2 text-sm font-medium text-gray-900">
                              ▶ Cliquez pour voir la vidéo
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-200 transition-colors group-hover:bg-gray-300">
                          <div className="text-sm text-gray-500">
                            Aperçu du projet
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="mb-2 text-sm text-gray-500">
                        0{index + 1}
                      </div>
                      <h4 className="mb-4 text-2xl font-light transition-colors group-hover:text-gray-600">
                        {projet.title}
                      </h4>
                      <p className="mb-6 leading-relaxed font-light text-gray-600">
                        {projet.description}
                      </p>
                      <div className="flex space-x-4 text-sm text-gray-500">
                        {projet.tags.slice(0, 3).map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {projets.length === 0 &&
                [1, 2, 3].map((project) => (
                  <div key={project} className="group cursor-pointer">
                    <div className="grid items-center gap-12 md:grid-cols-2">
                      <div className="aspect-video bg-gray-200 transition-colors group-hover:bg-gray-300"></div>
                      <div>
                        <div className="mb-2 text-sm text-gray-500">
                          0{project}
                        </div>
                        <h4 className="mb-4 text-2xl font-light transition-colors group-hover:text-gray-600">
                          Titre du Projet {project}
                        </h4>
                        <p className="mb-6 leading-relaxed font-light text-gray-600">
                          Une brève description de ce projet et des technologies
                          utilisées pour le créer. Focus sur le problème résolu
                          et l&apos;impact créé.
                        </p>
                        <div className="flex space-x-4 text-sm text-gray-500">
                          <span>React</span>
                          <span>TypeScript</span>
                          <span>Node.js</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>{" "}
        </section>{" "}
        <section id="about" className="px-6 py-32">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-16 md:grid-cols-2">
              {" "}
              <div>
                <h3 className="mb-8 text-sm tracking-wider text-gray-600 uppercase">
                  À Propos
                </h3>
                <h4 className="mb-8 text-3xl leading-relaxed font-light">
                  {about
                    ? about.split(".")[0] + "."
                    : "Je crois au pouvoir de la simplicité et à la beauté des solutions épurées."}
                </h4>
                <p className="mb-6 leading-relaxed font-light text-gray-600">
                  {about
                    ? about.split(".").slice(1).join(".").trim()
                    : "Avec plus de 5 ans d'expérience en développement web, je me concentre sur la création d'applications qui sont non seulement fonctionnelles mais aussi maintenables et évolutives."}
                </p>
                {yearsOfExperience && (
                  <p className="mb-4 font-light text-gray-800">
                    {yearsOfExperience} années d&apos;expérience professionnelle
                  </p>
                )}
              </div>
              <div className="space-y-8">
                <div>
                  <h5 className="mb-4 text-sm tracking-wider text-gray-600 uppercase">
                    Compétences
                  </h5>
                  <div className="space-y-2">
                    {skills?.slice(0, 5).map((skill) => (
                      <div
                        key={skill.name}
                        className="font-light text-gray-800"
                      >
                        {skill.name}
                      </div>
                    ))}
                    {skills?.length === 0 &&
                      [
                        "JavaScript/TypeScript",
                        "React/Next.js",
                        "Node.js/Express",
                        "PostgreSQL/MongoDB",
                        "AWS/Docker",
                      ].map((skill) => (
                        <div key={skill} className="font-light text-gray-800">
                          {skill}
                        </div>
                      ))}
                  </div>
                </div>
                <div>
                  <h5 className="mb-4 text-sm tracking-wider text-gray-600 uppercase">
                    Projets
                  </h5>
                  <div className="space-y-2">
                    <div className="font-light text-gray-800">
                      {projets.length}+ Projets Complétés
                    </div>
                    <div className="font-light text-gray-800">
                      Défenseur du Code Propre
                    </div>
                    <div className="font-light text-gray-800">
                      Design Minimaliste
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>{" "}
        <section id="contact" className="border-t border-gray-100 px-6 py-32">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-16 md:grid-cols-2">
              {" "}
              <div>
                <h3 className="mb-8 text-sm tracking-wider text-gray-600 uppercase">
                  Contact
                </h3>
                <h4 className="mb-8 text-3xl leading-relaxed font-light">
                  Discutons de votre{" "}
                  <span className="italic">prochain projet</span>.
                </h4>
                <p className="mb-8 leading-relaxed font-light text-gray-600">
                  Je suis toujours intéressé à entendre parler de nouvelles
                  opportunités et de défis créatifs.
                </p>
                <a
                  href={`mailto:${user.email}`}
                  className="inline-block w-62 border border-gray-900 py-3 text-center text-sm tracking-wider uppercase transition-colors hover:bg-gray-900 hover:text-white"
                >
                  Envoyer un Message
                </a>
                {cvDownloadUrl && (
                  <a
                    href={cvDownloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block w-62 border border-gray-600 py-3 text-center text-sm tracking-wider text-gray-600 uppercase transition-colors hover:bg-gray-600 hover:text-white"
                  >
                    Télécharger CV
                  </a>
                )}
              </div>
              <div className="space-y-6">
                <div>
                  <div className="mb-2 text-sm tracking-wider text-gray-600 uppercase">
                    Email
                  </div>
                  <div className="font-light text-gray-800">{user.email}</div>
                </div>
                <div>
                  <div className="mb-2 text-sm tracking-wider text-gray-600 uppercase">
                    Réseaux Sociaux
                  </div>
                  <div className="space-y-1">
                    <div className="cursor-pointer font-light text-gray-800 hover:text-gray-600">
                      LinkedIn
                    </div>
                    <div className="cursor-pointer font-light text-gray-800 hover:text-gray-600">
                      GitHub
                    </div>
                    <div className="cursor-pointer font-light text-gray-800 hover:text-gray-600">
                      Twitter
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>{" "}
      {selectedProject && (
        <ProjectVideoDialog
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          variant="minimalist"
        />
      )}
    </>
  );
};
