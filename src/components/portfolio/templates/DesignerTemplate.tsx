import { FC, useState } from "react";
import { Portfolio } from "../../../types/Portfolio";
import { Projet } from "../../../types/Projet";
import { ProjectVideoDialog } from "../ProjectVideoDialog";

interface DesignerTemplateProps {
  portfolio: Portfolio;
  isPreview?: boolean;
}

export const DesignerTemplate: FC<DesignerTemplateProps> = ({
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

  const handleCVDownload = () => {
    if (cvDownloadUrl) {
      window.open(cvDownloadUrl, "_blank");
    }
  };

  return (
    <>
      <div
        className={`bg-gray-50 text-gray-900 min-h-screen ${
          isPreview ? "scale-75 origin-top" : ""
        }`}
      >
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
            <div className="absolute top-40 right-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-2000"></div>
            <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-4000"></div>
          </div>

          <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
            <div className="mb-12">
              <img
                src={user.avatar || "/default-avatar.png"}
                alt={user.firstName}
                className="w-48 h-48 rounded-full mx-auto border-8 border-white shadow-2xl"
              />
            </div>
            <h1 className="text-7xl font-light mb-6 tracking-tight">
              {title ? title.split(" ")[0] : user.firstName}
              <br />
              <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {title ? title.split(" ").slice(1).join(" ") : user.lastName}
              </span>
            </h1>
            {hook && (
              <p className="text-lg mb-6 text-purple-600 font-medium tracking-wide">
                {hook}
              </p>
            )}
            <p className="text-2xl mb-12 text-gray-600 font-light">
              {jobTitle || "Designer Visuel & Directeur Créatif"}
            </p>
            {yearsOfExperience && (
              <div className="mb-8">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {yearsOfExperience}+
                </div>
                <div className="text-lg text-gray-600">
                  Années d&apos;Expérience Créative
                </div>
              </div>
            )}{" "}
            <div className="flex justify-center space-x-6">
              <a
                href="#portfolio"
                className="bg-gray-900 text-white px-10 py-4 rounded-full hover:bg-gray-800 transition-colors font-medium"
              >
                Voir Portfolio
              </a>
              {cvDownloadUrl ? (
                <button
                  onClick={handleCVDownload}
                  className="border-2 border-gray-900 text-gray-900 px-10 py-4 rounded-full hover:bg-gray-900 hover:text-white transition-colors font-medium"
                >
                  Télécharger CV
                </button>
              ) : (
                <a
                  href="#contact"
                  className="border-2 border-gray-900 text-gray-900 px-10 py-4 rounded-full hover:bg-gray-900 hover:text-white transition-colors font-medium"
                >
                  Discutons
                </a>
              )}
            </div>
          </div>
        </section>{" "}
        <section id="portfolio" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-light text-center mb-16 tracking-tight">
              Travaux <span className="font-bold">Sélectionnés</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projets.slice(0, 6).map((projet, index) => {
                const colors = [
                  "from-blue-400 to-blue-600",
                  "from-purple-400 to-purple-600",
                  "from-pink-400 to-pink-600",
                  "from-green-400 to-green-600",
                  "from-yellow-400 to-yellow-600",
                  "from-red-400 to-red-600",
                ];
                return (
                  <div
                    key={projet.id}
                    className="group cursor-pointer"
                    onClick={() => setSelectedProject(projet)}
                  >
                    {" "}
                    <div className="aspect-square mb-6 relative overflow-hidden rounded-2xl">
                      {projet.demoUrl ? (
                        <>
                          <video
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            src={projet.demoUrl}
                          />
                          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                          <div className="absolute top-4 right-4 bg-white/90 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                            ▶ Vidéo
                          </div>
                        </>
                      ) : (
                        <div
                          className={`w-full h-full bg-gradient-to-br ${
                            colors[index % colors.length]
                          } group-hover:scale-105 transition-transform duration-500`}
                        >
                          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white text-gray-900 px-6 py-3 rounded-full font-medium">
                          {projet.demoUrl ? "▶ Voir Vidéo" : "Voir Projet"}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-light mb-2">{projet.title}</h3>
                    <p className="text-gray-600 uppercase text-sm tracking-wider">
                      {projet.course || "Projet Design"}
                    </p>
                  </div>
                );
              })}
              {projets.length === 0 &&
                [
                  {
                    title: "Identité de Marque",
                    category: "Branding",
                    color: "from-blue-400 to-blue-600",
                  },
                  {
                    title: "Design Web",
                    category: "Digital",
                    color: "from-purple-400 to-purple-600",
                  },
                  {
                    title: "Mobile App",
                    category: "UI/UX",
                    color: "from-pink-400 to-pink-600",
                  },
                ].map((project, index) => (
                  <div key={index} className="group cursor-pointer">
                    <div className="aspect-square mb-6 relative overflow-hidden rounded-2xl">
                      <div
                        className={`w-full h-full bg-gradient-to-br ${project.color} group-hover:scale-105 transition-transform duration-500`}
                      >
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white text-gray-900 px-6 py-3 rounded-full font-medium">
                          View Project
                        </div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-light mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 uppercase text-sm tracking-wider">
                      {project.category}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </section>{" "}
        <section id="about" className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                {" "}
                <h2 className="text-5xl font-light mb-8 tracking-tight">
                  À <span className="font-bold">Propos</span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed mb-8 font-light">
                  {about ||
                    "Je suis un designer visuel passionné avec plus de 7 ans d'expérience dans la création d'identités de marque et d'expériences numériques convaincantes. Mon travail se concentre sur l'intersection entre l'esthétique et la fonctionnalité."}
                </p>
                {yearsOfExperience && (
                  <p className="text-lg text-gray-700 mb-6 font-medium">
                    {yearsOfExperience} années d&apos;expérience créative
                  </p>
                )}
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Compétences</h3>
                    <div className="space-y-2">
                      {skills.slice(0, 5).map((skill) => (
                        <div key={skill.name} className="text-gray-600">
                          {skill.name}
                        </div>
                      ))}
                      {skills.length === 0 &&
                        [
                          "Design Visuel",
                          "Identité de Marque",
                          "UI/UX Design",
                          "Typographie",
                          "Théorie des Couleurs",
                        ].map((skill) => (
                          <div key={skill} className="text-gray-600">
                            {skill}
                          </div>
                        ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-4">Contact</h3>
                    <div className="space-y-2">
                      <div>
                        <a
                          href={`mailto:${user.email}`}
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          {user.email}
                        </a>
                      </div>
                      {githubUrl && (
                        <div>
                          <a
                            href={githubUrl}
                            className="text-gray-600 hover:text-gray-900 transition-colors"
                          >
                            Portfolio GitHub
                          </a>
                        </div>
                      )}
                      {linkedinUrl && (
                        <div>
                          <a
                            href={linkedinUrl}
                            className="text-gray-600 hover:text-gray-900 transition-colors"
                          >
                            Profil LinkedIn
                          </a>
                        </div>
                      )}
                      {cvDownloadUrl && (
                        <div>
                          <button
                            onClick={handleCVDownload}
                            className="text-gray-600 hover:text-gray-900 transition-colors text-left"
                          >
                            Télécharger CV
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="h-32 bg-gradient-to-br from-blue-200 to-blue-300 rounded-2xl"></div>
                    <div className="h-20 bg-gradient-to-br from-purple-200 to-purple-300 rounded-2xl"></div>
                    <div className="h-24 bg-gradient-to-br from-pink-200 to-pink-300 rounded-2xl"></div>
                  </div>
                  <div className="space-y-4 mt-8">
                    <div className="h-20 bg-gradient-to-br from-green-200 to-green-300 rounded-2xl"></div>
                    <div className="h-32 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-2xl"></div>
                    <div className="h-16 bg-gradient-to-br from-red-200 to-red-300 rounded-2xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>{" "}
        <section id="contact" className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            {" "}
            <h2 className="text-5xl font-light mb-8 tracking-tight">
              <span className="font-bold">Collaborons</span>
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto font-light">
              Prêt à donner vie à votre vision ? J&apos;aimerais entendre parler
              de votre prochain projet.
            </p>
            <div className="flex justify-center space-x-6">
              <a
                href={`mailto:${user.email}`}
                className="bg-gray-900 text-white px-10 py-4 rounded-full hover:bg-gray-800 transition-colors font-medium"
              >
                Entrer en Contact
              </a>
              {cvDownloadUrl ? (
                <button
                  onClick={handleCVDownload}
                  className="border-2 border-gray-900 text-gray-900 px-10 py-4 rounded-full hover:bg-gray-900 hover:text-white transition-colors font-medium"
                >
                  Télécharger CV
                </button>
              ) : (
                <a
                  href="#portfolio"
                  className="border-2 border-gray-900 text-gray-900 px-10 py-4 rounded-full hover:bg-gray-900 hover:text-white transition-colors font-medium"
                >
                  Voir Plus de Travaux
                </a>
              )}
            </div>
          </div>
        </section>
      </div>{" "}
      {selectedProject && (
        <ProjectVideoDialog
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          variant="designer"
        />
      )}
    </>
  );
};
