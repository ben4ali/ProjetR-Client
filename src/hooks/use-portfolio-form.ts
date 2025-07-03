import { useState, useEffect } from "react";
import {
  PortfolioTemplate,
  PORTFOLIO_TEMPLATES,
  Skill,
} from "../types/Portfolio";
import { Projet } from "../types/Projet";

export interface PortfolioFormData {
  selectedTemplate: PortfolioTemplate | "";
  title: string;
  about: string;
  hook: string;
  skills: Skill[];
  selectedProjects: number[];
  githubUrl: string;
  linkedinUrl: string;
  websiteUrl: string;
  yearsOfExperience: number | "";
  cvDownloadUrl: string;
  jobTitle: string;
  isPublic: boolean;
  customization?: Record<string, unknown>;
}

export interface PortfolioFormState extends PortfolioFormData {
  currentSkill: Skill;
  currentPage: number;
  previewTemplate: PortfolioTemplate | null;
  isSubmitting: boolean;
}

interface Portfolio {
  id: number;
  template: PortfolioTemplate;
  title?: string;
  about?: string;
  hook?: string;
  skills?: Skill[];
  projets?: Projet[];
  githubUrl?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  yearsOfExperience?: number;
  cvDownloadUrl?: string;
  jobTitle?: string;
  isPublic: boolean;
  user: { id: string };
  customization?: Record<string, unknown>;
}

export const usePortfolioForm = (initialData?: Portfolio) => {
  const [formState, setFormState] = useState<PortfolioFormState>({
    selectedTemplate: initialData?.template || "",
    title: initialData?.title || "",
    about: initialData?.about || "",
    hook: initialData?.hook || "",
    skills: initialData?.skills || [],
    selectedProjects: initialData?.projets?.map((proj) => proj.id) || [],
    githubUrl: initialData?.githubUrl || "",
    linkedinUrl: initialData?.linkedinUrl || "",
    websiteUrl: initialData?.websiteUrl || "",
    yearsOfExperience: initialData?.yearsOfExperience || "",
    cvDownloadUrl: initialData?.cvDownloadUrl || "",
    jobTitle: initialData?.jobTitle || "",
    isPublic: initialData?.isPublic ?? true,
    currentSkill: {
      name: "",
      level: 50,
    },
    currentPage: 0,
    previewTemplate: null,
    isSubmitting: false,
    customization: initialData?.customization,
  });

  useEffect(() => {
    if (initialData) {
      setFormState((prev) => ({
        ...prev,
        selectedTemplate: initialData.template,
        title: initialData.title || "",
        about: initialData.about || "",
        hook: initialData.hook || "",
        skills: initialData.skills || [],
        selectedProjects: initialData.projets?.map((proj) => proj.id) || [],
        githubUrl: initialData.githubUrl || "",
        linkedinUrl: initialData.linkedinUrl || "",
        websiteUrl: initialData.websiteUrl || "",
        yearsOfExperience: initialData.yearsOfExperience || "",
        cvDownloadUrl: initialData.cvDownloadUrl || "",
        jobTitle: initialData.jobTitle || "",
        isPublic: initialData.isPublic,
        customization: initialData.customization,
      }));
    }
  }, [initialData]);

  useEffect(() => {
    if (formState.selectedTemplate) {
      const templateEntries = Object.entries(PORTFOLIO_TEMPLATES);
      const templateIndex = templateEntries.findIndex(
        ([, value]) => value === formState.selectedTemplate,
      );

      if (templateIndex !== -1) {
        const TEMPLATES_PER_PAGE = 6;
        const targetPage = Math.floor(templateIndex / TEMPLATES_PER_PAGE);

        if (formState.currentPage !== targetPage) {
          setFormState((prev) => ({
            ...prev,
            currentPage: targetPage,
          }));
        }
      }
    }
  }, [formState.selectedTemplate]);

  const updateField = <K extends keyof PortfolioFormState>(
    field: K,
    value: PortfolioFormState[K],
  ) => {
    console.log(`Updating field: ${field}, value: ${value}`);
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddSkill = () => {
    if (
      formState.currentSkill.name.trim() &&
      formState.currentSkill.level >= 0 &&
      formState.currentSkill.level <= 100 &&
      !formState.skills.some(
        (skill) =>
          skill.name.toLowerCase() ===
          formState.currentSkill.name.toLowerCase(),
      )
    ) {
      setFormState((prev) => ({
        ...prev,
        skills: [...prev.skills, prev.currentSkill],
        currentSkill: { name: "", level: 50 },
      }));
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormState((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.name !== skillToRemove),
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
      hook: formState.hook,
      skills: formState.skills,
      selectedProjects: formState.selectedProjects,
      githubUrl: formState.githubUrl,
      linkedinUrl: formState.linkedinUrl,
      websiteUrl: formState.websiteUrl,
      yearsOfExperience: formState.yearsOfExperience,
      cvDownloadUrl: formState.cvDownloadUrl,
      jobTitle: formState.jobTitle,
      isPublic: formState.isPublic,
      customization: formState.customization,
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
