import { FC, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  usePortfolioById,
  useUpdatePortfolio,
  useDeletePortfolio,
} from "../hooks/use-portfolios";
import { useCurrentUser } from "../hooks/use-auth";
import { usePortfolioForm } from "../hooks/use-portfolio-form";
import { PortfolioForm } from "../components/portfolio/PortfolioForm";
import { PortfolioTemplate } from "../types/Portfolio";

export const PortfolioEdit: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: currentUser } = useCurrentUser();
  const { data: portfolio, isLoading, error } = usePortfolioById(id);
  const updatePortfolio = useUpdatePortfolio();
  const deletePortfolio = useDeletePortfolio();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const {
    formState,
    updateField,
    handleAddSkill,
    handleRemoveSkill,
    handleProjectToggle,
    handlePreview,
    closePreview,
    getFormData,
    currentTemplates,
    totalPages,
    nextPage,
    prevPage,
    setPage,
  } = usePortfolioForm(portfolio);

  if (portfolio && portfolio.user.id !== currentUser?.id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Accès non autorisé
          </h1>
          <p className="text-gray-600 mb-6">
            Vous n&apos;avez pas la permission de modifier ce portfolio.
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!portfolio) return;

    updateField("isSubmitting", true);
    try {
      const formData = getFormData();
      await updatePortfolio.mutateAsync({
        id: portfolio.id,
        portfolioData: {
          template: formData.selectedTemplate as PortfolioTemplate,
          title: formData.title || undefined,
          about: formData.about || undefined,
          hook: formData.hook || undefined,
          skills: formData.skills.length > 0 ? formData.skills : undefined,
          projets: formData.selectedProjects.map((id) => ({ id })),
          githubUrl: formData.githubUrl || undefined,
          linkedinUrl: formData.linkedinUrl || undefined,
          websiteUrl: formData.websiteUrl || undefined,
          yearsOfExperience: formData.yearsOfExperience || undefined,
          cvDownloadUrl: formData.cvDownloadUrl || undefined,
          jobTitle: formData.jobTitle || undefined,
          isPublic: formData.isPublic,
        },
      });

      navigate(`/portfolio/${portfolio.id}`);
    } catch (error) {
      console.error("Error updating portfolio:", error);
    } finally {
      updateField("isSubmitting", false);
    }
  };

  const handleDeletePortfolio = async () => {
    if (!portfolio) return;

    try {
      await deletePortfolio.mutateAsync(portfolio.id);
      navigate(`/profil/${currentUser?.id}`);
    } catch (error) {
      console.error("Error deleting portfolio:", error);
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  const handleCancel = () => {
    navigate(`/profil/${currentUser?.id}`);
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
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

        <PortfolioForm
          formState={formState}
          onFieldUpdate={updateField}
          onAddSkill={handleAddSkill}
          onRemoveSkill={handleRemoveSkill}
          onProjectToggle={handleProjectToggle}
          onPreview={handlePreview}
          onClosePreview={closePreview}
          currentTemplates={currentTemplates}
          totalPages={totalPages}
          onNextPage={nextPage}
          onPrevPage={prevPage}
          onSetPage={setPage}
          onSubmit={handleSubmit}
          submitButtonText="Sauvegarder les Modifications"
          isEdit={true}
          onCancel={handleCancel}
          onDelete={handleDelete}
          error={updatePortfolio.error}
        />
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
    </div>
  );
};
