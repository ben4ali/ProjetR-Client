import { User } from "./User";
import { Projet } from "./Projet";

export const PORTFOLIO_TEMPLATES = {
  MODERN: "modern",
  CLASSIC: "classic",
  CREATIVE: "creative",
  MINIMALIST: "minimalist",
  DEVELOPER: "developer",
  DESIGNER: "designer",
} as const;

export type PortfolioTemplate =
  (typeof PORTFOLIO_TEMPLATES)[keyof typeof PORTFOLIO_TEMPLATES];

export interface Portfolio {
  id: number;
  template: PortfolioTemplate;
  status: "active" | "deleted" | "archived";
  title?: string;
  about?: string;
  skills?: string[];
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
  skills?: string[];
  isPublic?: boolean;
  githubUrl?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  projectIds?: number[];
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
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "PostgreSQL",
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
