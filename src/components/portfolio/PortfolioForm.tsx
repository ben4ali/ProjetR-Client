import React, { FC } from 'react';
import { useCurrentUser } from '../../hooks/use-auth';
import { PortfolioFormState } from '../../hooks/use-portfolio-form';
import { useProjectsByCollaborator } from '../../hooks/use-project';
import '../../styles/portfolio-templates.css';
import { PORTFOLIO_TEMPLATES, PortfolioTemplate } from '../../types/Portfolio';
import { TemplatePreviewDialog } from './TemplatePreviewDialog';

interface PortfolioFormProps {
  formState: PortfolioFormState;
  onFieldUpdate: <K extends keyof PortfolioFormState>(
    field: K,
    value: PortfolioFormState[K]
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
  const { data: userProjects = [] } = useProjectsByCollaborator(
    currentUser?.firstName
  );
  const templateDescriptions: Record<PortfolioTemplate, string> = {
    [PORTFOLIO_TEMPLATES.MODERN]:
      'Design moderne et contemporain avec des animations fluides',
    [PORTFOLIO_TEMPLATES.CLASSIC]:
      'Mise en page intemporelle et élégante avec un style traditionnel',
    [PORTFOLIO_TEMPLATES.CREATIVE]:
      'Design audacieux et artistique avec des mises en page uniques',
    [PORTFOLIO_TEMPLATES.MINIMALIST]:
      'Simple et épuré avec un focus sur le contenu',
    [PORTFOLIO_TEMPLATES.DEVELOPER]:
      'Template technique parfait pour les développeurs',
    [PORTFOLIO_TEMPLATES.DESIGNER]:
      'Template visuel pour mettre en valeur le travail de design',
    [PORTFOLIO_TEMPLATES.NEURAL]:
      'Réseau neuronal interactif avec animations 3D et effets futuristes',
    [PORTFOLIO_TEMPLATES.PRISM]:
      'Design glassmorphique avec effets de prisme et animations GSAP',
    [PORTFOLIO_TEMPLATES.CUPERTINO]:
      'Style Apple minimaliste avec animations élégantes et attention aux détails',
    [PORTFOLIO_TEMPLATES.QUANTUM]:
      'Expérience quantique immersive avec particules ThreeJS et effets holographiques',
    [PORTFOLIO_TEMPLATES.METEOR]:
      'Design cosmique avec pluie de météores et animations GSAP dynamiques',
    [PORTFOLIO_TEMPLATES.HOLOGRAM]:
      'Interface holographique futuriste avec effets de glitch et animations cyber',
    [PORTFOLIO_TEMPLATES.SAMURAI]:
      'Design inspiré du Japon avec animations sakura et esthétique samouraï',
    [PORTFOLIO_TEMPLATES.MATRIX]:
      'Interface Matrix avec code vert, effets glitch et animations cyberpunk',
    [PORTFOLIO_TEMPLATES.CARTOON]:
      'Style Adventure Time coloré et ludique avec animations rebondissantes',
    [PORTFOLIO_TEMPLATES.PIXEL]:
      'Univers rétro gaming avec esthétique 8-bit et animations pixel art',
  };

  const templatePreviewImages: Record<PortfolioTemplate, string> = {
    [PORTFOLIO_TEMPLATES.MODERN]: `/templates/${PORTFOLIO_TEMPLATES.MODERN}.png`,
    [PORTFOLIO_TEMPLATES.CLASSIC]: `/templates/${PORTFOLIO_TEMPLATES.CLASSIC}.png`,
    [PORTFOLIO_TEMPLATES.CREATIVE]: `/templates/${PORTFOLIO_TEMPLATES.CREATIVE}.png`,
    [PORTFOLIO_TEMPLATES.MINIMALIST]: `/templates/${PORTFOLIO_TEMPLATES.MINIMALIST}.png`,
    [PORTFOLIO_TEMPLATES.DEVELOPER]: `/templates/${PORTFOLIO_TEMPLATES.DEVELOPER}.png`,
    [PORTFOLIO_TEMPLATES.DESIGNER]: `/templates/${PORTFOLIO_TEMPLATES.DESIGNER}.png`,
    [PORTFOLIO_TEMPLATES.NEURAL]: `/templates/${PORTFOLIO_TEMPLATES.NEURAL}.png`,
    [PORTFOLIO_TEMPLATES.PRISM]: `/templates/${PORTFOLIO_TEMPLATES.PRISM}.png`,
    [PORTFOLIO_TEMPLATES.CUPERTINO]: `/templates/${PORTFOLIO_TEMPLATES.CUPERTINO}.png`,
    [PORTFOLIO_TEMPLATES.QUANTUM]: `/templates/${PORTFOLIO_TEMPLATES.QUANTUM}.png`,
    [PORTFOLIO_TEMPLATES.METEOR]: `/templates/${PORTFOLIO_TEMPLATES.METEOR}.png`,
    [PORTFOLIO_TEMPLATES.HOLOGRAM]: `/templates/${PORTFOLIO_TEMPLATES.HOLOGRAM}.png`,
    [PORTFOLIO_TEMPLATES.SAMURAI]: `/templates/${PORTFOLIO_TEMPLATES.SAMURAI}.png`,
    [PORTFOLIO_TEMPLATES.MATRIX]: `/templates/${PORTFOLIO_TEMPLATES.MATRIX}.png`,
    [PORTFOLIO_TEMPLATES.CARTOON]: `/templates/${PORTFOLIO_TEMPLATES.CARTOON}.png`,
    [PORTFOLIO_TEMPLATES.PIXEL]: `/templates/${PORTFOLIO_TEMPLATES.PIXEL}.png`,
  };

  return (
    <div className="w-full">
      <div className="relative w-full flex flex-col lg:flex-row-reverse gap-5">
        <div className="lg:sticky lg:top-25 w-full lg:w-[50%] h-fit">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {currentTemplates.map(([key, value]) => (
              <div
                key={key}
                className={`relative border-2 rounded-xl p-4 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 group ${
                  formState.selectedTemplate === value
                    ? 'border-blue-500 bg-blue-50 shadow-lg ring-2 ring-blue-200'
                    : 'border-gray-200 bg-white hover:border-blue-300'
                }`}
              >
                {/* Round checkbox in top-right corner - visible on hover or when selected */}
                <div className="absolute top-3 right-3 z-10">
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      if (formState.selectedTemplate === value) {
                        // Unselect if already selected
                        onFieldUpdate('selectedTemplate', '');
                      } else {
                        // Select if not selected
                        onFieldUpdate('selectedTemplate', value);
                      }
                    }}
                    className={`w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center cursor-pointer ${
                      formState.selectedTemplate === value
                        ? 'bg-blue-500 border-blue-500 opacity-100'
                        : 'bg-white border-gray-300 opacity-0 group-hover:opacity-100 hover:border-blue-400'
                    }`}
                  >
                    {formState.selectedTemplate === value && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                </div>

                <div
                  className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-md mb-4 flex items-center justify-center cursor-pointer hover:from-gray-200 hover:to-gray-300 transition-colors overflow-hidden relative group"
                  onClick={() => onPreview(value)}
                >
                  <img
                    src={templatePreviewImages[value]}
                    alt={`${value} template preview`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
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
                    onClick={() => {
                      if (formState.selectedTemplate === value) {
                        onFieldUpdate('selectedTemplate', '');
                      } else {
                        onFieldUpdate('selectedTemplate', value);
                      }
                    }}
                    className={`cursor-pointer flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      formState.selectedTemplate === value
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700'
                    }`}
                  >
                    {formState.selectedTemplate === value
                      ? '✓ Sélectionné'
                      : 'Sélectionner'}
                  </button>
                </div>
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
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
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

        <form onSubmit={onSubmit} className="w-full lg:flex-1">
          <div className="bg-white rounded-lg p-8 shadow-lg">
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
                  onChange={e => onFieldUpdate('title', e.target.value)}
                  placeholder={`${currentUser?.firstName} ${currentUser?.lastName} - Portfolio`}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    !formState.selectedTemplate
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60'
                      : ''
                  }`}
                  disabled={!formState.selectedTemplate}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre du Poste
                </label>
                <input
                  type="text"
                  value={formState.jobTitle}
                  onChange={e => onFieldUpdate('jobTitle', e.target.value)}
                  placeholder="Développeur Full Stack, Designer UI/UX, etc."
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    !formState.selectedTemplate
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60'
                      : ''
                  }`}
                  disabled={!formState.selectedTemplate}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Années d&apos;Expérience
                </label>
                <input
                  type="number"
                  value={formState.yearsOfExperience}
                  onChange={e =>
                    onFieldUpdate(
                      'yearsOfExperience',
                      e.target.value ? parseInt(e.target.value) : ''
                    )
                  }
                  placeholder="5"
                  min="0"
                  max="50"
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    !formState.selectedTemplate
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60'
                      : ''
                  }`}
                  disabled={!formState.selectedTemplate}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  À Propos de Moi
                </label>
                <textarea
                  value={formState.about}
                  onChange={e => onFieldUpdate('about', e.target.value)}
                  placeholder="Parlez de vous, de votre expérience et de ce qui vous motive..."
                  rows={4}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    !formState.selectedTemplate
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60'
                      : ''
                  }`}
                  disabled={!formState.selectedTemplate}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Accroche Personnelle
                </label>
                <input
                  type="text"
                  value={formState.hook}
                  onChange={e => onFieldUpdate('hook', e.target.value)}
                  placeholder="Une phrase d'accroche qui vous définit (ex: 'Créateur d'expériences numériques innovantes')"
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    !formState.selectedTemplate
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60'
                      : ''
                  }`}
                  disabled={!formState.selectedTemplate}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Cette accroche apparaîtra dans la section héro de votre
                  portfolio pour créer un impact immédiat
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lien de Téléchargement CV
                </label>
                <input
                  type="url"
                  value={formState.cvDownloadUrl}
                  onChange={e => onFieldUpdate('cvDownloadUrl', e.target.value)}
                  placeholder="https://example.com/mon-cv.pdf"
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    !formState.selectedTemplate
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60'
                      : ''
                  }`}
                  disabled={!formState.selectedTemplate}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Compétences & Niveaux d'Expertise
                </label>

                {/* Skill suggestions */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-3">
                    Suggestions populaires :
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'React',
                      'TypeScript',
                      'JavaScript',
                      'Python',
                      'Node.js',
                      'CSS',
                      'HTML',
                      'Vue.js',
                      'Angular',
                      'Java',
                      'C#',
                      'UI/UX Design',
                      'Figma',
                      'Photoshop',
                      'Git',
                      'Docker',
                    ].map(suggestion => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() =>
                          onFieldUpdate('currentSkill', {
                            ...formState.currentSkill,
                            name: suggestion,
                          })
                        }
                        className="cursor-pointer px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add new skill card */}
                <div className="bg-gray-50 rounded-xl p-6 mb-6 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
                  <div className="space-y-4">
                    <div>
                      <input
                        type="text"
                        value={formState.currentSkill.name}
                        onChange={e =>
                          onFieldUpdate('currentSkill', {
                            ...formState.currentSkill,
                            name: e.target.value,
                          })
                        }
                        onKeyPress={e =>
                          e.key === 'Enter' &&
                          (e.preventDefault(), onAddSkill())
                        }
                        placeholder="Nom de la compétence (ex: React, TypeScript, Design UI/UX...)"
                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          !formState.selectedTemplate
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60'
                            : ''
                        }`}
                        disabled={!formState.selectedTemplate}
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">
                          Niveau d'expertise
                        </span>
                        <span className="text-sm font-bold text-blue-600">
                          {formState.currentSkill.level}%
                        </span>
                      </div>

                      {/* Tailwind range slider */}
                      <div className="relative">
                        <div className="relative h-2 bg-gray-200 rounded-lg">
                          <div
                            className="absolute h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg transition-all duration-200"
                            style={{
                              width: `${formState.currentSkill.level}%`,
                            }}
                          ></div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="5"
                            value={formState.currentSkill.level}
                            onChange={e =>
                              onFieldUpdate('currentSkill', {
                                ...formState.currentSkill,
                                level: parseInt(e.target.value),
                              })
                            }
                            className={`absolute inset-0 w-full h-2 bg-transparent appearance-none cursor-pointer focus:outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md hover:[&::-webkit-slider-thumb]:bg-blue-700 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-blue-600 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-track]:bg-transparent ${
                              !formState.selectedTemplate
                                ? 'opacity-60 cursor-not-allowed'
                                : ''
                            }`}
                            disabled={!formState.selectedTemplate}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Débutant</span>
                          <span>Intermédiaire</span>
                          <span>Avancé</span>
                          <span>Expert</span>
                        </div>
                      </div>

                      {/* Level description */}
                      <div className="text-xs text-gray-600 italic">
                        {formState.currentSkill.level <= 25 &&
                          '🌱 Notions de base, en apprentissage'}
                        {formState.currentSkill.level > 25 &&
                          formState.currentSkill.level <= 50 &&
                          '📚 Connaissances solides, expérience pratique'}
                        {formState.currentSkill.level > 50 &&
                          formState.currentSkill.level <= 75 &&
                          '⚡ Compétences avancées, projets complexes'}
                        {formState.currentSkill.level > 75 &&
                          "🏆 Expertise reconnue, mentor d'autres"}
                      </div>
                    </div>

                    {/* Show validation message */}
                    {formState.currentSkill.name.trim() &&
                      formState.skills.some(
                        skill =>
                          skill.name.toLowerCase() ===
                          formState.currentSkill.name.toLowerCase()
                      ) && (
                        <div className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-center">
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"
                            />
                          </svg>
                          Cette compétence a déjà été ajoutée
                        </div>
                      )}

                    <button
                      type="button"
                      onClick={onAddSkill}
                      disabled={
                        !formState.currentSkill.name.trim() ||
                        formState.skills.some(
                          skill =>
                            skill.name.toLowerCase() ===
                            formState.currentSkill.name.toLowerCase()
                        )
                      }
                      className="cursor-pointer w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      Ajouter cette compétence
                    </button>
                  </div>
                </div>

                {/* Skills list with scroll */}
                {formState.skills.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Compétences ajoutées ({formState.skills.length})
                    </h4>
                    <div className="max-h-64 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                      {formState.skills.map((skill, index) => (
                        <div
                          key={index}
                          className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-gray-900 text-sm">
                              {skill.name}
                            </span>
                            <button
                              type="button"
                              onClick={() => onRemoveSkill(skill.name)}
                              className="cursor-pointer text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full p-1 transition-colors"
                              title="Supprimer cette compétence"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-600">
                                Niveau d'expertise
                              </span>
                              <span className="text-xs font-bold text-blue-600">
                                {skill.level}%
                              </span>
                            </div>

                            {/* Progress bar */}
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-blue-600 h-1.5 rounded-full transition-all duration-300"
                                style={{ width: `${skill.level}%` }}
                              ></div>
                            </div>

                            <div className="text-xs text-gray-500">
                              {skill.level <= 25 && '🌱 Débutant'}
                              {skill.level > 25 &&
                                skill.level <= 50 &&
                                '📚 Intermédiaire'}
                              {skill.level > 50 &&
                                skill.level <= 75 &&
                                '⚡ Avancé'}
                              {skill.level > 75 && '🏆 Expert'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {formState.skills.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <svg
                      className="w-12 h-12 mx-auto mb-3 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                    <p className="text-sm">
                      Aucune compétence ajoutée pour le moment
                    </p>
                    <p className="text-xs text-gray-400">
                      Ajoutez vos compétences pour enrichir votre portfolio
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL GitHub
                </label>
                <input
                  type="url"
                  value={formState.githubUrl}
                  onChange={e => onFieldUpdate('githubUrl', e.target.value)}
                  placeholder="https://github.com/votrenom"
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    !formState.selectedTemplate
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60'
                      : ''
                  }`}
                  disabled={!formState.selectedTemplate}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL LinkedIn
                </label>
                <input
                  type="url"
                  value={formState.linkedinUrl}
                  onChange={e => onFieldUpdate('linkedinUrl', e.target.value)}
                  placeholder="https://linkedin.com/in/votrenom"
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    !formState.selectedTemplate
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60'
                      : ''
                  }`}
                  disabled={!formState.selectedTemplate}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL du Site Web
                </label>
                <input
                  type="url"
                  value={formState.websiteUrl}
                  onChange={e => onFieldUpdate('websiteUrl', e.target.value)}
                  placeholder="https://votresite.com"
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    !formState.selectedTemplate
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60'
                      : ''
                  }`}
                  disabled={!formState.selectedTemplate}
                />
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formState.isPublic}
                    onChange={e => onFieldUpdate('isPublic', e.target.checked)}
                    className={`mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${
                      !formState.selectedTemplate
                        ? 'bg-gray-100 cursor-not-allowed opacity-60'
                        : ''
                    }`}
                    disabled={!formState.selectedTemplate}
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userProjects.map(project => (
                    <div
                      key={project.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        formState.selectedProjects.includes(project.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
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
                  Sélectionnés {formState.selectedProjects.length} sur{' '}
                  {userProjects.length} projets
                </p>
              </div>
            )}
          </div>

          <div
            className={`flex ${
              isEdit ? 'justify-between' : 'justify-center'
            } items-center space-x-4 pt-8`}
          >
            {isEdit && onDelete && (
              <button
                type="button"
                onClick={onDelete}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
                disabled={formState.isSubmitting}
              >
                Supprimer le Portfolio
              </button>
            )}

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                disabled={formState.isSubmitting}
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={!formState.selectedTemplate || formState.isSubmitting}
                className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
                  !formState.selectedTemplate || formState.isSubmitting
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
                    : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                }`}
              >
                {formState.isSubmitting ? '...' : submitButtonText}
              </button>
            </div>
          </div>
        </form>
      </div>

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
    </div>
  );
};
