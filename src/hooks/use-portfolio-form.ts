import { useState, useEffect } from "react";
import { PortfolioTemplate, PORTFOLIO_TEMPLATES } from "../types/Portfolio";

export interface PortfolioFormData {
  selectedTemplate: PortfolioTemplate | "";
  title: string;
  about: string;
  skills: string[];
  selectedProjects: number[];
  githubUrl: string;
  linkedinUrl: string;
  websiteUrl: string;
  yearsOfExperience: number | "";
  cvDownloadUrl: string;
  jobTitle: string;
  isPublic: boolean;
}

export interface PortfolioFormState extends PortfolioFormData {
  currentSkill: string;
  currentPage: number;
  previewTemplate: PortfolioTemplate | null;
  isSubmitting: boolean;
}

interface Portfolio {
  id: number;
  template: PortfolioTemplate;
  title?: string;
  about?: string;
  skills?: string[];
  projectIds?: number[];
  githubUrl?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  yearsOfExperience?: number;
  cvDownloadUrl?: string;
  jobTitle?: string;
  isPublic: boolean;
  user: { id: string };
}

export const usePortfolioForm = (initialData?: Portfolio) => {
  const [formState, setFormState] = useState<PortfolioFormState>({
    selectedTemplate: initialData?.template || "",
    title: initialData?.title || "",
    about: initialData?.about || "",
    skills: initialData?.skills || [],
    selectedProjects: initialData?.projectIds || [],
    githubUrl: initialData?.githubUrl || "",
    linkedinUrl: initialData?.linkedinUrl || "",
    websiteUrl: initialData?.websiteUrl || "",
    yearsOfExperience: initialData?.yearsOfExperience || "",
    cvDownloadUrl: initialData?.cvDownloadUrl || "",
    jobTitle: initialData?.jobTitle || "",
    isPublic: initialData?.isPublic ?? true,
    currentSkill: "",
    currentPage: 0,
    previewTemplate: null,
    isSubmitting: false,
  });

  // Reset form data when initialData changes (for edit mode)
  useEffect(() => {
    if (initialData) {
      setFormState((prev) => ({
        ...prev,
        selectedTemplate: initialData.template,
        title: initialData.title || "",
        about: initialData.about || "",
        skills: initialData.skills || [],
        selectedProjects: initialData.projectIds || [],
        githubUrl: initialData.githubUrl || "",
        linkedinUrl: initialData.linkedinUrl || "",
        websiteUrl: initialData.websiteUrl || "",
        yearsOfExperience: initialData.yearsOfExperience || "",
        cvDownloadUrl: initialData.cvDownloadUrl || "",
        jobTitle: initialData.jobTitle || "",
        isPublic: initialData.isPublic,
      }));
    }
  }, [initialData]);

  const updateField = <K extends keyof PortfolioFormState>(
    field: K,
    value: PortfolioFormState[K],
  ) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddSkill = () => {
    if (
      formState.currentSkill.trim() &&
      !formState.skills.includes(formState.currentSkill.trim())
    ) {
      setFormState((prev) => ({
        ...prev,
        skills: [...prev.skills, prev.currentSkill.trim()],
        currentSkill: "",
      }));
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormState((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleProjectToggle = (projectId: number) => {
    setFormState((prev) => ({
      ...prev,
      selectedProjects: prev.selectedProjects.includes(projectId)
        ? prev.selectedProjects.filter((id) => id !== projectId)
        : [...prev.selectedProjects, projectId],
    }));
  };

  const handlePreview = (template: PortfolioTemplate) => {
    setFormState((prev) => ({ ...prev, previewTemplate: template }));
  };

  const closePreview = () => {
    setFormState((prev) => ({ ...prev, previewTemplate: null }));
  };

  // Pagination logic
  const TEMPLATES_PER_PAGE = 6;
  const templateEntries = Object.entries(PORTFOLIO_TEMPLATES);
  const totalPages = Math.ceil(templateEntries.length / TEMPLATES_PER_PAGE);
  const currentTemplates = templateEntries.slice(
    formState.currentPage * TEMPLATES_PER_PAGE,
    (formState.currentPage + 1) * TEMPLATES_PER_PAGE,
  );

  const nextPage = () => {
    setFormState((prev) => ({
      ...prev,
      currentPage: Math.min(totalPages - 1, prev.currentPage + 1),
    }));
  };

  const prevPage = () => {
    setFormState((prev) => ({
      ...prev,
      currentPage: Math.max(0, prev.currentPage - 1),
    }));
  };

  const setPage = (page: number) => {
    setFormState((prev) => ({ ...prev, currentPage: page }));
  };
  const getFormData = (): PortfolioFormData => {
    return {
      selectedTemplate: formState.selectedTemplate,
      title: formState.title,
      about: formState.about,
      skills: formState.skills,
      selectedProjects: formState.selectedProjects,
      githubUrl: formState.githubUrl,
      linkedinUrl: formState.linkedinUrl,
      websiteUrl: formState.websiteUrl,
      yearsOfExperience: formState.yearsOfExperience,
      cvDownloadUrl: formState.cvDownloadUrl,
      jobTitle: formState.jobTitle,
      isPublic: formState.isPublic,
    };
  };

  return {
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
  };
};
