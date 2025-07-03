import React from "react";
import { Projet } from "../../types/Projet";
import { Post } from "./Post";

interface PostListProps {
  projets: Projet[];
  fullPost?: boolean;
  className?: string;
}

export const PostList: React.FC<PostListProps> = ({
  projets,
  fullPost = false,
  className = "",
}) => {
  return (
    <div
      className={
        className ||
        (fullPost
          ? "flex w-full flex-col gap-6 px-[5%] py-8"
          : "flex h-[30rem] w-full flex-wrap gap-4 px-[5%] py-8")
      }
    >
      {projets.map((projet) => (
        <Post key={projet.id} project={projet} fullPost={fullPost} />
      ))}
    </div>
  );
};
