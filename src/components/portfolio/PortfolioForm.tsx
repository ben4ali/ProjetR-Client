import { FC } from "react";
import { useCurrentUser } from "../../hooks/use-auth";
import { useProjectsByUserId } from "../../hooks/use-project";
import { PortfolioFormState } from "../../hooks/use-portfolio-form";
import { PORTFOLIO_TEMPLATES, PortfolioTemplate } from "../../types/Portfolio";
import { TemplatePreviewDialog } from "./TemplatePreviewDialog";

interface PortfolioFormProps {
  formState: PortfolioFormState;
  onFieldUpdate: <K extends keyof PortfolioFormState>(
    field: K,
    value: PortfolioFormState[K],
  ) => void;
  onAddSkill: () => void;
  onRemoveSkill: (skill: string) => void;
  onProjectToggle: (projectId: number) => void;
  onPreview: (template: PortfolioTemplate) => void;
  onClosePreview: () => void;
  currentTemplates: [string, PortfolioTemplate][];
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  onSetPage: (page: number) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitButtonText: string;
  isEdit?: boolean;
  onCancel: () => void;
  onDelete?: () => void;
  error?: Error | null;
}

export const PortfolioForm: FC<PortfolioFormProps> = ({
  formState,
  onFieldUpdate,
  onAddSkill,
  onRemoveSkill,
  onProjectToggle,
  onPreview,
  onClosePreview,
  currentTemplates,
  totalPages,
  onNextPage,
  onPrevPage,
  onSetPage,
  onSubmit,
  submitButtonText,
  isEdit = false,
  onCancel,
  onDelete,
  error,
}) => {
  const { data: currentUser } = useCurrentUser();
  const { data: userProjects = [] } = useProjectsByUserId(currentUser?.id);
  const templateDescriptions: Record<PortfolioTemplate, string> = {
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

  const templatePreviewImages: Record<PortfolioTemplate, string> = {
    [PORTFOLIO_TEMPLATES.MODERN]:
      `/templates/${PORTFOLIO_TEMPLATES.MODERN}.png`,
    [PORTFOLIO_TEMPLATES.CLASSIC]:
      `/templates/${PORTFOLIO_TEMPLATES.CLASSIC}.png`,
    [PORTFOLIO_TEMPLATES.CREATIVE]:
      `/templates/${PORTFOLIO_TEMPLATES.CREATIVE}.png`,
    [PORTFOLIO_TEMPLATES.MINIMALIST]:
      `/templates/${PORTFOLIO_TEMPLATES.MINIMALIST}.png`,   
    [PORTFOLIO_TEMPLATES.DEVELOPER]:
      `/templates/${PORTFOLIO_TEMPLATES.DEVELOPER}.png`,
    [PORTFOLIO_TEMPLATES.DESIGNER]:
      `/templates/${PORTFOLIO_TEMPLATES.DESIGNER}.png`,
    [PORTFOLIO_TEMPLATES.NEURAL]:
      `/templates/${PORTFOLIO_TEMPLATES.NEURAL}.png`,
    [PORTFOLIO_TEMPLATES.PRISM]:
      `/templates/${PORTFOLIO_TEMPLATES.PRISM}.png`,
    [PORTFOLIO_TEMPLATES.CUPERTINO]:
      `/templates/${PORTFOLIO_TEMPLATES.CUPERTINO}.png`,
    [PORTFOLIO_TEMPLATES.QUANTUM]:
      `/templates/${PORTFOLIO_TEMPLATES.QUANTUM}.png`,
    [PORTFOLIO_TEMPLATES.METEOR]:
      `/templates/${PORTFOLIO_TEMPLATES.METEOR}.png`,
    [PORTFOLIO_TEMPLATES.HOLOGRAM]:
      `/templates/${PORTFOLIO_TEMPLATES.HOLOGRAM}.png`,
  };

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-8">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentTemplates.map(([key, value]) => (
              <div
                key={key}
                className={`relative border-2 rounded-xl p-4 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
                  formState.selectedTemplate === value
                    ? "border-blue-500 bg-blue-50 shadow-lg ring-2 ring-blue-200"
                    : "border-gray-200 bg-white hover:border-blue-300"
                }`}
              >
                {" "}
                <div
                  className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-md mb-4 flex items-center justify-center cursor-pointer hover:from-gray-200 hover:to-gray-300 transition-colors overflow-hidden relative group"
                  onClick={() => onPreview(value)}
                >
                  <img
                    src={templatePreviewImages[value]}
                    alt={`${value} template preview`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />{" "}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <div className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex flex-col items-center">
                      <svg
                        className="w-8 h-8 mx-auto mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      Aperçu
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
                    onClick={() => onFieldUpdate("selectedTemplate", value)}
                    className={`cursor-pointer flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      formState.selectedTemplate === value
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700"
                    }`}
                  >
                    {formState.selectedTemplate === value
                      ? "✓ Sélectionné"
                      : "Sélectionner"}
                  </button>
                </div>
                {formState.selectedTemplate === value && (
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

          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-4 mt-8">
              <button
                type="button"
                onClick={onPrevPage}
                disabled={formState.currentPage === 0}
                className="cursor-pointer px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Précédent
              </button>

              <div className="flex space-x-1">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => onSetPage(i)}
                    className={`cursor-pointer px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      formState.currentPage === i
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
                onClick={onNextPage}
                disabled={formState.currentPage === totalPages - 1}
                className="cursor-pointer px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Suivant
              </button>
            </div>
          )}
        </div>

        {formState.selectedTemplate && (
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
                  value={formState.title}
                  onChange={(e) => onFieldUpdate("title", e.target.value)}
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
                  value={formState.jobTitle}
                  onChange={(e) => onFieldUpdate("jobTitle", e.target.value)}
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
                  value={formState.yearsOfExperience}
                  onChange={(e) =>
                    onFieldUpdate(
                      "yearsOfExperience",
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
                  value={formState.about}
                  onChange={(e) => onFieldUpdate("about", e.target.value)}
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
                  value={formState.cvDownloadUrl}
                  onChange={(e) =>
                    onFieldUpdate("cvDownloadUrl", e.target.value)
                  }
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
                    value={formState.currentSkill}
                    onChange={(e) =>
                      onFieldUpdate("currentSkill", e.target.value)
                    }
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), onAddSkill())
                    }
                    placeholder="Ajouter une compétence (ex: React, Python, UI/UX)"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={onAddSkill}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Ajouter
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formState.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => onRemoveSkill(skill)}
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
                  value={formState.githubUrl}
                  onChange={(e) => onFieldUpdate("githubUrl", e.target.value)}
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
                  value={formState.linkedinUrl}
                  onChange={(e) => onFieldUpdate("linkedinUrl", e.target.value)}
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
                  value={formState.websiteUrl}
                  onChange={(e) => onFieldUpdate("websiteUrl", e.target.value)}
                  placeholder="https://votresite.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formState.isPublic}
                    onChange={(e) =>
                      onFieldUpdate("isPublic", e.target.checked)
                    }
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
                        formState.selectedProjects.includes(project.id)
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => onProjectToggle(project.id)}
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
                  Sélectionnés {formState.selectedProjects.length} sur{" "}
                  {userProjects.length} projets
                </p>
              </div>
            )}
          </div>
        )}

        <div
          className={`flex ${isEdit ? "justify-between" : "justify-center"} items-center space-x-4 pt-8`}
        >
          {isEdit && onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              disabled={formState.isSubmitting}
            >
              Supprimer le Portfolio
            </button>
          )}

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              disabled={formState.isSubmitting}
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={
                (isEdit ? false : !formState.selectedTemplate) ||
                formState.isSubmitting
              }
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {formState.isSubmitting ? "..." : submitButtonText}
            </button>
          </div>
        </div>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">Erreur : {error.message}</p>
        </div>
      )}

      {formState.previewTemplate && (
        <TemplatePreviewDialog
          isOpen={!!formState.previewTemplate}
          onClose={onClosePreview}
          template={formState.previewTemplate}
        />
      )}
    </>
  );
};
