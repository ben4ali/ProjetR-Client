import React from "react";
import { Post } from "./Post";
import { Projet } from "../../types/Projet";

interface PostListProps {
  projets?: Projet[];
  className?: string;
  fullPost?: boolean;
}

export const PostList: React.FC<PostListProps> = ({ projets, className, fullPost }) => {
  if (!projets || projets.length === 0) {
    return <div className="no-results">Aucun projet trouvé</div>;
  }

  return (
    <div className={`${className}`}>
      {projets.map((projet) => (
        <Post
          key={projet.id}
          project={projet}
          fullPost={fullPost}
        />
      ))}
    </div>
  );
};