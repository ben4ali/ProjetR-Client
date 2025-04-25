import React from "react";
import { Post } from "./Post";
import { Projet } from "../../types/Projet";

interface PostListProps {
  projets?: Projet[];
}

export const PostList: React.FC<PostListProps> = ({ projets }) => {
  if (!projets || projets.length === 0) {
    return <div className="no-results">Aucun projet trouvé</div>;
  }

  return (
    <div className="post-holder">
      {projets.map((projet) => (
        <Post
          key={projet.id}
          project={projet}
        />
      ))}
    </div>
  );
};