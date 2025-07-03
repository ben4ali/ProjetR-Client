import { Projet } from "../../../types/Projet";

export const MOCK_PROJECTS: Projet[] = [
  {
    id: 1,
    title: "App Météo iOS",
    description:
      "Application météo intuitive avec mises à jour en temps réel et belles animations.",
    createdAt: new Date("2024-09-15"),
    updatedAt: new Date("2024-12-10"),
    teacher: "Marie Dubois",
    course: "Développement Mobile iOS",
    likes: 42,
    views: 156,
    author: {
      id: "1",
      email: "alex.martin@example.com",
      username: "alexmartin",
      firstName: "Alex",
      lastName: "Martin",
      avatar:
        "https://artsync-minio.5lbdho.easypanel.host/devhub/avatar-alex.jpg",
      banner: null,
    },
    collaborators: ["Sarah Johnson", "Pierre Lemieux"],
    tags: ["Swift", "CoreAnimation", "UIKit", "APIs"],
    previewImageUrl:
      "https://artsync-minio.5lbdho.easypanel.host/devhub/weather-app-preview.jpg",
    comments: [
      "Excellent travail sur les animations!",
      "Interface très intuitive",
      "Code bien structuré",
    ],
    githubUrl: "https://github.com/alexmartin/weather-app-ios",
    gitLabUrl: "",
    liveUrl: "",
    demoUrl:
      "https://artsync-minio.5lbdho.easypanel.host/devhub/UniBank-1744056894981",
    session: "Automne 2024",
  },
  {
    id: 2,
    title: "Suite Productivité macOS",
    description:
      "Suite d'applications macOS natives conçue pour les professionnels créatifs.",
    createdAt: new Date("2024-10-20"),
    updatedAt: new Date("2024-12-05"),
    teacher: "Jean-François Roy",
    course: "Développement Desktop",
    likes: 38,
    views: 124,
    author: {
      id: "2",
      email: "emilie.tremblay@example.com",
      username: "emilietremblay",
      firstName: "Émilie",
      lastName: "Tremblay",
      avatar:
        "https://artsync-minio.5lbdho.easypanel.host/devhub/avatar-emilie.jpg",
      banner:
        "https://artsync-minio.5lbdho.easypanel.host/devhub/banner-emilie.jpg",
    },
    collaborators: ["Marc Dupuis", "Lisa Wong"],
    tags: ["SwiftUI", "AppKit", "Core Data", "CloudKit"],
    previewImageUrl:
      "https://artsync-minio.5lbdho.easypanel.host/devhub/productivity-suite-preview.jpg",
    comments: [
      "Intégration CloudKit impressionnante",
      "Design très professionnel",
    ],
    githubUrl: "https://github.com/emilietremblay/macos-productivity-suite",
    gitLabUrl: "",
    liveUrl: "",
    demoUrl:
      "https://artsync-minio.5lbdho.easypanel.host/devhub/UniBank-1744056894981",
    session: "Automne 2024",
  },
  {
    id: 3,
    title: "Bibliothèque Système Design",
    description: "Système de design complet avec composants et directives.",
    createdAt: new Date("2024-11-01"),
    updatedAt: new Date("2024-12-12"),
    teacher: "Sophie Lavoie",
    course: "Design d'Interface Utilisateur",
    likes: 65,
    views: 203,
    author: {
      id: "3",
      email: "thomas.chen@example.com",
      username: "thomaschen",
      firstName: "Thomas",
      lastName: "Chen",
      avatar: null,
      banner:
        "https://artsync-minio.5lbdho.easypanel.host/devhub/banner-thomas.jpg",
    },
    collaborators: ["Isabelle Gagnon", "David Kim", "Ana Rodriguez"],
    tags: ["Figma", "React", "TypeScript", "Storybook"],
    previewImageUrl:
      "https://artsync-minio.5lbdho.easypanel.host/devhub/design-system-preview.jpg",
    comments: [
      "Documentation excellente",
      "Composants très réutilisables",
      "Parfait pour notre équipe",
    ],
    githubUrl: "https://github.com/thomaschen/design-system-library",
    gitLabUrl: "https://gitlab.com/thomaschen/design-system-library",
    liveUrl: "https://design-system.thomaschen.dev",
    demoUrl:
      "https://artsync-minio.5lbdho.easypanel.host/devhub/UniBank-1744056894981",
    session: "Automne 2024",
  },
];
