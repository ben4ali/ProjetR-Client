import React from "react";
import { ProfilPost } from "./ProfilPost";

export const ProfilBody = () => {
  const posts = Array(10).fill(null);

  return (
    <div className="profil-body">
      <div className="profil-post-holder">
        {posts.map((_, index) => (
          <ProfilPost key={index} />
        ))}
      </div>
    </div>
  );
};