import { Projet } from "./Projet";
import { User } from "./User";

export const PORTFOLIO_TEMPLATES = {
  CLASSIC: "classic",
  CUPERTINO: "cupertino",
  MATRIX: "matrix",
  MINIMALIST: "minimalist",
  RONDURE: "rondure",
  SILK: "silk",
} as const;

export type PortfolioTemplate =
  (typeof PORTFOLIO_TEMPLATES)[keyof typeof PORTFOLIO_TEMPLATES];

export interface Skill {
  name: string;
  level: number; // 0 to 100
}

export interface Portfolio {
  id: number;
  template: PortfolioTemplate;
  status: "active" | "deleted" | "archived";
  title?: string;
  about?: string;
  hook?: string;
  skills?: Skill[];
  isPublic: boolean;
  githubUrl?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  projectIds?: number[];
  customDomain?: string;
  customization?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
  yearsOfExperience?: number;
  cvDownloadUrl?: string;
  jobTitle?: string;
  user: User;
  projets?: Projet[];
}

export interface CreatePortfolioData {
  template: PortfolioTemplate;
  title?: string;
  about?: string;
  hook?: string;
  skills?: Skill[];
  isPublic?: boolean;
  githubUrl?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  projets?: Partial<Projet>[];
  customization?: Record<string, unknown>;
  yearsOfExperience?: number;
  cvDownloadUrl?: string;
  jobTitle?: string;
}

export interface UpdatePortfolioData extends Partial<CreatePortfolioData> {
  status?: "active" | "deleted" | "archived";
}

export const isValidTemplate = (
  template: string,
): template is PortfolioTemplate => {
  return Object.values(PORTFOLIO_TEMPLATES).includes(
    template as PortfolioTemplate,
  );
};

export const createMockPortfolio = (
  user: User,
  template: PortfolioTemplate,
  projects: Projet[] = [],
): Portfolio => ({
  id: 0,
  template,
  status: "active",
  title: `${user.firstName} ${user.lastName} - Portfolio`,
  about:
    "Je suis un développeur passionné avec une expertise dans les technologies web modernes. J'aime créer des solutions innovantes et donner vie aux idées grâce au code.",
  hook: "Créateur d'expériences numériques innovantes",
  skills: [
    { name: "JavaScript", level: 90 },
    { name: "React", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "CSS", level: 75 },
    { name: "HTML", level: 80 },
    { name: "TypeScript", level: 70 },
    { name: "GraphQL", level: 65 },
    { name: "Docker", level: 60 },
    { name: "AWS", level: 55 },
    { name: "CI/CD", level: 50 },
  ],
  isPublic: true,
  githubUrl: `https://github.com/${user.username}`,
  linkedinUrl: `https://linkedin.com/in/${user.username}`,
  websiteUrl: `https://${user.username}.dev`,
  projectIds: projects.map((p) => p.id),
  customDomain: undefined,
  customization: {},
  yearsOfExperience: 5,
  cvDownloadUrl: `/cv/${user.username}.pdf`,
  jobTitle: "Développeur Full Stack",
  createdAt: new Date(),
  updatedAt: new Date(),
  user,
  projets: projects,
});
