import { Projet } from "./Projet";
import { User } from "./User";

export interface Comment {
  id: number;
  author: User;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  projet: Projet;
  replies: Comment[];
  parentComment: Comment | null;
}
