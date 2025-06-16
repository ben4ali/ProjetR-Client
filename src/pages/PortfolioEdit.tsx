import { FC, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PortfolioForm } from "../components/portfolio/PortfolioForm";
import { useCurrentUser } from "../hooks/use-auth";
import { usePortfolioForm } from "../hooks/use-portfolio-form";
import {
  useDeletePortfolio,
  usePortfolioById,
  useUpdatePortfolio,
} from "../hooks/use-portfolios";
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
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">
            Accès non autorisé
          </h1>
          <p className="mb-6 text-gray-600">
            Vous n&apos;avez pas la permission de modifier ce portfolio.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
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
          customization: formData.customization,
        },
      });

      window.scrollTo(0, 0);
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
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Chargement du portfolio...</p>
        </div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">
            Portfolio non trouvé
          </h1>
          <p className="mb-6 text-gray-600">
            Le portfolio que vous recherchez n&apos;existe pas ou a été
            supprimé.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
      <div className="mx-auto w-[90vw]">
        <div className="mb-12 text-left">
          <h1 className="mb-4 text-4xl font-bold text-[#444ea5]">
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
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur">
          <div className="mx-4 w-full max-w-md rounded bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold text-[#e4003a]">
              Confirmer la suppression
            </h3>
            <p className="mb-6 text-gray-600">
              Êtes-vous sûr de vouloir supprimer ce portfolio ? Cette action est
              irréversible.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="cursor-pointer rounded border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
              >
                Annuler
              </button>
              <button
                onClick={handleDeletePortfolio}
                className="cursor-pointer rounded bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
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
