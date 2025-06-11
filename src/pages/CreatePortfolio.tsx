import { useState } from "react";
import { useCreatePortfolio } from "../hooks/use-portfolios";
import { PORTFOLIO_TEMPLATES, PortfolioTemplate } from "../types/Portfolio";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/use-auth";
import { useProjectsByUserId } from "../hooks/use-project";
import { TemplatePreviewDialog } from "../components/portfolio/TemplatePreviewDialog";

export const CreatePortfolio = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<
    PortfolioTemplate | ""
  >("");
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<number[]>([]);
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState<number | "">("");
  const [cvDownloadUrl, setCvDownloadUrl] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewTemplate, setPreviewTemplate] =
    useState<PortfolioTemplate | null>(null);
  const [currentSkill, setCurrentSkill] = useState("");

  const createPortfolio = useCreatePortfolio();
  const navigate = useNavigate();
  const { data: currentUser } = useCurrentUser();
  const { data: userProjects = [] } = useProjectsByUserId(currentUser?.id);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTemplate) return;

    setIsSubmitting(true);
    try {
      await createPortfolio.mutateAsync({
        template: selectedTemplate,
        title: title || undefined,
        about: about || undefined,
        skills: skills.length > 0 ? skills : undefined,
        projets: selectedProjects.map(id => ({ id })),
        githubUrl: githubUrl || undefined,
        linkedinUrl: linkedinUrl || undefined,
        websiteUrl: websiteUrl || undefined,
        yearsOfExperience: yearsOfExperience || undefined,
        cvDownloadUrl: cvDownloadUrl || undefined,
        jobTitle: jobTitle || undefined,
        isPublic,
      });

      if (currentUser) {
        navigate(`/profil/${currentUser.id}`);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error creating portfolio:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleProjectToggle = (projectId: number) => {
    setSelectedProjects((prev) =>
      prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId],
    );
  };
  const templateDescriptions = {
    [PORTFOLIO_TEMPLATES.MODERN]:
      "Design moderne et contemporain avec des animations fluides",
    [PORTFOLIO_TEMPLATES.CLASSIC]:
      "Mise en page intemporelle et élégante avec un style traditionnel",
    [PORTFOLIO_TEMPLATES.CREATIVE]:
      "Design audacieux et artistique avec des mises en page uniques",
    [PORTFOLIO_TEMPLATES.MINIMALIST]:
      "Simple et épuré avec un focus sur le contenu",
    [PORTFOLIO_TEMPLATES.DEVELOPER]:
      "Template technique parfait pour les développeurs",
    [PORTFOLIO_TEMPLATES.DESIGNER]:
      "Template visuel pour mettre en valeur le travail de design",
  };

  const handlePreview = (template: PortfolioTemplate) => {
    setPreviewTemplate(template);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {" "}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Créer Votre Portfolio
          </h1>
          <p className="text-xl text-gray-600">
            Choisissez un template qui représente le mieux votre style
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(PORTFOLIO_TEMPLATES).map(([key, value]) => (
              <div
                key={key}
                className={`relative border-2 rounded-lg p-6 transition-all duration-200 hover:shadow-lg ${
                  selectedTemplate === value
                    ? "border-blue-500 bg-blue-50 shadow-lg"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div
                  className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-md mb-4 flex items-center justify-center cursor-pointer hover:from-gray-200 hover:to-gray-300 transition-colors"
                  onClick={() => handlePreview(value)}
                >
                  {" "}
                  <div className="text-center">
                    <div className="text-gray-400 text-sm mb-1">
                      Cliquez pour prévisualiser
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg capitalize text-gray-900">
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {templateDescriptions[value]}
                  </p>
                </div>

                <div className="flex space-x-2 mt-4">
                  {" "}
                  <button
                    type="button"
                    onClick={() => handlePreview(value)}
                    className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm"
                  >
                    Aperçu
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedTemplate(value)}
                    className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedTemplate === value
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {selectedTemplate === value
                      ? "Sélectionné"
                      : "Sélectionner"}
                  </button>
                </div>

                {selectedTemplate === value && (
                  <div className="absolute top-4 right-4">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          {selectedTemplate && (
            <div className="mt-12 bg-white rounded-lg p-8 shadow-lg">
              {" "}
              <h3 className="text-2xl font-bold mb-6 text-gray-900">
                Détails du Portfolio
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {" "}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre du Portfolio
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={`${currentUser?.firstName} ${currentUser?.lastName} - Portfolio`}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>{" "}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre du Poste
                  </label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="Développeur Full Stack, Designer UI/UX, etc."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Années d&apos;Expérience
                  </label>
                  <input
                    type="number"
                    value={yearsOfExperience}
                    onChange={(e) =>
                      setYearsOfExperience(
                        e.target.value ? parseInt(e.target.value) : "",
                      )
                    }
                    placeholder="5"
                    min="0"
                    max="50"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    À Propos de Moi
                  </label>
                  <textarea
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder="Parlez de vous, de votre expérience et de ce qui vous motive..."
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lien de Téléchargement CV
                  </label>
                  <input
                    type="url"
                    value={cvDownloadUrl}
                    onChange={(e) => setCvDownloadUrl(e.target.value)}
                    placeholder="https://example.com/mon-cv.pdf"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>{" "}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Compétences
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={currentSkill}
                      onChange={(e) => setCurrentSkill(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" &&
                        (e.preventDefault(), handleAddSkill())
                      }
                      placeholder="Ajouter une compétence (ex: React, Python, UI/UX)"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={handleAddSkill}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Ajouter
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL GitHub
                  </label>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/votrenom"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>{" "}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL LinkedIn
                  </label>
                  <input
                    type="url"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/votrenom"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL du Site Web
                  </label>
                  <input
                    type="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://votresite.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isPublic}
                      onChange={(e) => setIsPublic(e.target.checked)}
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">
                      Rendre le portfolio public
                    </span>
                  </label>
                </div>
              </div>
              {userProjects.length > 0 && (
                <div className="mt-8">
                  <h4 className="text-lg font-semibold mb-4 text-gray-900">
                    Sélectionner les Projets à Présenter
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userProjects.map((project) => (
                      <div
                        key={project.id}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                          selectedProjects.includes(project.id)
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => handleProjectToggle(project.id)}
                      >
                        <h5 className="font-semibold text-gray-900 mb-2">
                          {project.title}
                        </h5>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {project.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Sélectionnés {selectedProjects.length} sur{" "}
                    {userProjects.length} projets
                  </p>
                </div>
              )}
            </div>
          )}{" "}
          <div className="flex justify-center space-x-4 pt-8">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              disabled={isSubmitting}
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={!selectedTemplate || isSubmitting}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? "Création..." : "Créer le Portfolio"}
            </button>
          </div>
        </form>{" "}
        {createPortfolio.error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">
              Erreur lors de la création du portfolio:{" "}
              {(createPortfolio.error as Error).message}
            </p>
          </div>
        )}
      </div>

      {previewTemplate && (
        <TemplatePreviewDialog
          isOpen={!!previewTemplate}
          onClose={() => setPreviewTemplate(null)}
          template={previewTemplate}
        />
      )}
    </div>
  );
};
