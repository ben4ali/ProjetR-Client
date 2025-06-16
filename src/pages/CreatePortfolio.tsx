import { useNavigate } from "react-router-dom";
import { PortfolioForm } from "../components/portfolio/PortfolioForm";
import { usePortfolioForm } from "../hooks/use-portfolio-form";
import { useCreatePortfolio } from "../hooks/use-portfolios";
import { PortfolioTemplate } from "../types/Portfolio";

export const CreatePortfolio = () => {
  const createPortfolio = useCreatePortfolio();
  const navigate = useNavigate();

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
  } = usePortfolioForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.selectedTemplate) return;

    updateField("isSubmitting", true);
    try {
      const formData = getFormData();
      const newPortfolio = await createPortfolio.mutateAsync({
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
      });

      window.scrollTo(0, 0);
      navigate(`/portfolio/${newPortfolio.id}`, { replace: true });
    } catch (error) {
      console.error("Error creating portfolio:", error);
    } finally {
      updateField("isSubmitting", false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
      <div className="mx-auto max-w-[90vw]">
        <div className="mb-12 text-left">
          <h1 className="mb-4 text-4xl font-bold text-[#444ea5]">
            Créer Votre Portfolio
          </h1>
          <p className="text-xl text-gray-600">
            Choisissez un modèle qui représente le mieux votre style
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
          submitButtonText="Créer le Portfolio"
          onCancel={handleCancel}
          error={createPortfolio.error}
        />
      </div>
    </div>
  );
};
