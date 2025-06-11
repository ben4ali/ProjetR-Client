import { FC, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  usePortfolioById,
  useUpdatePortfolio,
  useDeletePortfolio,
} from "../hooks/use-portfolios";
import { useCurrentUser } from "../hooks/use-auth";
import { useProjectsByUserId } from "../hooks/use-project";
import { PORTFOLIO_TEMPLATES, PortfolioTemplate } from "../types/Portfolio";
import { TemplatePreviewDialog } from "../components/portfolio/TemplatePreviewDialog";

export const PortfolioEdit: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: currentUser } = useCurrentUser();
  const { data: portfolio, isLoading, error } = usePortfolioById(id);
  const updatePortfolio = useUpdatePortfolio();
  const deletePortfolio = useDeletePortfolio();
  const { data: userProjects = [] } = useProjectsByUserId(currentUser?.id);

  const [selectedTemplate, setSelectedTemplate] =
    useState<PortfolioTemplate>("modern");
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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  // Pagination constants
  const TEMPLATES_PER_PAGE = 6;
  const templateEntries = Object.entries(PORTFOLIO_TEMPLATES);
  const totalPages = Math.ceil(templateEntries.length / TEMPLATES_PER_PAGE);
  const currentTemplates = templateEntries.slice(
    currentPage * TEMPLATES_PER_PAGE,
    (currentPage + 1) * TEMPLATES_PER_PAGE,
  );

  useEffect(() => {
    if (portfolio) {
      if (portfolio.user.id !== currentUser?.id) {
        navigate("/");
        return;
      }

      setSelectedTemplate(portfolio.template);
      setTitle(portfolio.title || "");
      setAbout(portfolio.about || "");
      setSkills(portfolio.skills || []);
      setSelectedProjects(portfolio.projectIds || []);
      setGithubUrl(portfolio.githubUrl || "");
      setLinkedinUrl(portfolio.linkedinUrl || "");
      setWebsiteUrl(portfolio.websiteUrl || "");
      setYearsOfExperience(portfolio.yearsOfExperience || "");
      setCvDownloadUrl(portfolio.cvDownloadUrl || "");
      setJobTitle(portfolio.jobTitle || "");
      setIsPublic(portfolio.isPublic);
    }
  }, [portfolio, currentUser, navigate]);

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
    [PORTFOLIO_TEMPLATES.NEURAL]:
      "Réseau neuronal interactif avec animations 3D et effets futuristes",
    [PORTFOLIO_TEMPLATES.PRISM]:
      "Design glassmorphique avec effets de prisme et animations GSAP",
    [PORTFOLIO_TEMPLATES.CUPERTINO]:
      "Style Apple minimaliste avec animations élégantes et attention aux détails",
    [PORTFOLIO_TEMPLATES.QUANTUM]:
      "Expérience quantique immersive avec particules ThreeJS et effets holographiques",
    [PORTFOLIO_TEMPLATES.METEOR]:
      "Design cosmique avec pluie de météores et animations GSAP dynamiques",
    [PORTFOLIO_TEMPLATES.HOLOGRAM]:
      "Interface holographique futuriste avec effets de glitch et animations cyber",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!portfolio) return;

    setIsSubmitting(true);
    try {
      await updatePortfolio.mutateAsync({
        id: portfolio.id,
        portfolioData: {
          template: selectedTemplate,
          title: title || undefined,
          about: about || undefined,
          skills: skills.length > 0 ? skills : undefined,
          projets: selectedProjects.map((id) => ({ id })),
          githubUrl: githubUrl || undefined,
          linkedinUrl: linkedinUrl || undefined,
          websiteUrl: websiteUrl || undefined,
          yearsOfExperience: yearsOfExperience || undefined,
          cvDownloadUrl: cvDownloadUrl || undefined,
          jobTitle: jobTitle || undefined,
          isPublic,
        },
      });

      navigate(`/portfolio/${portfolio.id}`);
    } catch (error) {
      console.error("Error updating portfolio:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePortfolio = async () => {
    if (!portfolio) return;

    try {
      await deletePortfolio.mutateAsync(portfolio.id);
      navigate("/profil");
    } catch (error) {
      console.error("Error deleting portfolio:", error);
    } finally {
      setShowDeleteConfirm(false);
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

  const handlePreview = (template: PortfolioTemplate) => {
    setPreviewTemplate(template);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du portfolio...</p>
        </div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Portfolio non trouvé
          </h1>
          <p className="text-gray-600 mb-6">
            Le portfolio que vous recherchez n&apos;existe pas ou a été
            supprimé.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Modifier Votre Portfolio
          </h1>
          <p className="text-xl text-gray-600">
            Mettez à jour votre portfolio pour refléter vos derniers projets
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Template Selection with Pagination */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentTemplates.map(([key, value]) => (
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-4 mt-8">
                <button
                  type="button"
                  onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                  disabled={currentPage === 0}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Précédent
                </button>

                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCurrentPage(i)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        currentPage === i
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages - 1, currentPage + 1))
                  }
                  disabled={currentPage === totalPages - 1}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Suivant
                </button>
              </div>
            )}
          </div>
          <div className="mt-12 bg-white rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">
              Détails du Portfolio
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              </div>

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
              </div>

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
              </div>

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
          </div>{" "}
          <div className="flex justify-between items-center pt-8">
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              disabled={isSubmitting}
            >
              Supprimer le Portfolio
            </button>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => navigate(`/profil/${currentUser?.id}`)}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                disabled={isSubmitting}
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting
                  ? "Mise à jour..."
                  : "Sauvegarder les Modifications"}
              </button>
            </div>
          </div>
        </form>
        {updatePortfolio.error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">
              Erreur lors de la mise à jour du portfolio:{" "}
              {(updatePortfolio.error as Error).message}
            </p>
          </div>
        )}{" "}
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirmer la suppression
            </h3>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer ce portfolio ? Cette action est
              irréversible.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleDeletePortfolio}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

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
