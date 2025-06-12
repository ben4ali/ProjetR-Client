import { FC, useState } from "react";
import { Portfolio } from "../../../types/Portfolio";
import { Projet } from "../../../types/Projet";
import { ProjectVideoDialog } from "../ProjectVideoDialog";

interface DeveloperTemplateProps {
  portfolio: Portfolio;
  isPreview?: boolean;
}

export const DeveloperTemplate: FC<DeveloperTemplateProps> = ({
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
        className={`bg-gray-900 text-green-400 min-h-screen font-mono ${
          isPreview ? "scale-75 origin-top" : ""
        }`}
      >
        <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-gray-400 text-sm">
                {user.firstName.toLowerCase()}@portfolio:~$ whoami
              </div>
              {cvDownloadUrl && (
                <button
                  onClick={handleCVDownload}
                  className="ml-auto text-blue-400 hover:text-blue-300 text-sm"
                >
                  ./telecharger_cv.sh
                </button>
              )}
            </div>
          </div>
        </header>

        <main className="px-6 py-8">
          <div className="max-w-6xl mx-auto">
            {" "}
            <section id="about" className="mb-12">
              <div className="text-green-400 mb-4">
                <span className="text-gray-400">$</span> cat profil.json
              </div>
              <div className="bg-gray-800 p-6 rounded border border-gray-700 text-sm">
                <div className="text-green-400">
                  {`{`}
                  <br /> &nbsp;&nbsp;
                  {`"nom": "${user.firstName} ${user.lastName}",`}
                  <br />
                  &nbsp;&nbsp;
                  {`"role": "${
                    jobTitle || title || "Développeur Full Stack"
                  }",`}
                  <br />
                  {hook && (
                    <>
                      &nbsp;&nbsp;{`"hook": "${hook}",`}
                      <br />
                    </>
                  )}
                  &nbsp;&nbsp;{`"projets": ${projets.length},`}
                  <br />
                  &nbsp;&nbsp;{`"competences": ${skills.length},`}
                  <br />
                  {yearsOfExperience && (
                    <>
                      &nbsp;&nbsp;{`"experience": "${yearsOfExperience} ans",`}
                      <br />
                    </>
                  )}
                  &nbsp;&nbsp;{`"email": "${user.email}"`}
                  <br />
                  {`}`}
                </div>
              </div>
            </section>{" "}
            <section id="projets" className="mb-12">
              <div className="text-green-400 mb-4">
                <span className="text-gray-400">$</span> ls projets/
              </div>
              <div className="space-y-4">
                {projets.slice(0, 3).map((projet) => (
                  <div
                    key={projet.id}
                    className="bg-gray-800 p-4 rounded border border-gray-700 cursor-pointer hover:border-green-400 transition-colors"
                    onClick={() => setSelectedProject(projet)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-yellow-400 font-bold">
                        {projet.title}
                      </span>
                      <div className="flex items-center space-x-4">
                        {projet.demoUrl && (
                          <span className="text-blue-400 text-xs">
                            ▶ vidéo
                          </span>
                        )}
                        <span className="text-gray-400 text-sm">
                          ⭐ {projet.likes}
                        </span>
                      </div>
                    </div>
                    <div className="text-gray-400 text-sm mb-2">
                      {projet.tags.join(", ")}
                    </div>
                    <div className="text-green-400 text-sm">
                      {projet.description}
                    </div>
                  </div>
                ))}
                {projets.length === 0 && (
                  <div className="text-gray-400">
                    Aucun projet trouvé. Exécutez &apos;git init&apos; pour
                    commencer !
                  </div>
                )}
              </div>
            </section>{" "}
            <section id="skills" className="mb-12">
              <div className="text-green-400 mb-4">
                <span className="text-gray-400">$</span> cat README.md
              </div>
              <div className="bg-gray-800 p-6 rounded border border-gray-700">
                <div className="text-green-400 mb-4 font-bold">À Propos</div>
                <div className="text-gray-300 mb-6">
                  {about ||
                    "Développeur passionné axé sur le code propre et les solutions innovantes."}
                </div>
                <div className="text-green-400 mb-4 font-bold">Compétences</div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {skills.slice(0, 6).map((skill) => (
                    <div key={skill.name} className="text-sm text-gray-300">
                      • {skill.name}
                    </div>
                  ))}
                  {skills.length === 0 &&
                    [
                      "React",
                      "Node.js",
                      "TypeScript",
                      "Python",
                      "Docker",
                      "AWS",
                    ].map((skill) => (
                      <div key={skill} className="text-sm text-gray-300">
                        • {skill}
                      </div>
                    ))}
                </div>
              </div>
            </section>{" "}
            <section id="contact" className="mb-12">
              <div className="text-green-400 mb-4">
                <span className="text-gray-400">$</span> curl -X GET /contact
              </div>
              <div className="bg-gray-800 p-6 rounded border border-gray-700">
                <div className="space-y-2">
                  <div>
                    <span className="text-yellow-400">Email:</span>{" "}
                    <a
                      href={`mailto:${user.email}`}
                      className="text-green-400 hover:underline"
                    >
                      {user.email}
                    </a>
                  </div>
                  {githubUrl && (
                    <div>
                      <span className="text-yellow-400">GitHub:</span>{" "}
                      <a
                        href={githubUrl}
                        className="text-green-400 hover:underline"
                      >
                        {githubUrl.replace("https://", "")}
                      </a>
                    </div>
                  )}
                  {linkedinUrl && (
                    <div>
                      <span className="text-yellow-400">LinkedIn:</span>{" "}
                      <a
                        href={linkedinUrl}
                        className="text-green-400 hover:underline"
                      >
                        {linkedinUrl.replace("https://", "")}
                      </a>
                    </div>
                  )}
                  {cvDownloadUrl && (
                    <div>
                      <span className="text-yellow-400">CV:</span>{" "}
                      <button
                        onClick={handleCVDownload}
                        className="text-green-400 hover:underline cursor-pointer"
                      >
                        telecharger_cv.pdf
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>{" "}
      {selectedProject && (
        <ProjectVideoDialog
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          variant="developer"
        />
      )}
    </>
  );
};
