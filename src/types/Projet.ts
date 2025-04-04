import { User } from "./User";

export interface Projet {
    id: number;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    teacher: string;
    course: string;
    likes: number;
    views: number;
    author: User;
    collaborators: string[];
    tags: string[];
    previewImageUrl: string;
    comments: string[];
    githubUrl: string;
    gitLabUrl: string;
    liveUrl: string;
    demoUrl: string;
    session: string;
}