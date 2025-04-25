import React from "react";
import { Post } from "./Post";
import { Projet } from "../../types/Projet";

interface PostListProps {
  projets?: Projet[];
}

export const PostList: React.FC<PostListProps> = ({ projets }) => {
  // Utiliser les données mockées si aucun projet n'est passé
  if (!projets || projets.length === 0) {
    // Données mockées existantes
    const posts = [
      {
        title: "L'infinie complexité d'un jeu simpliste",
        author: "ben4ali",
        views: "275k",
        date: "2025-03-22",
        image:
          "https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain",
        profileImage:
          "https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain",
        duration: "18:50",
      },
      // ...existing code...
    ];

    return (
      <div className="post-holder">
        {posts.map((post, index) => (
          <Post
            key={index}
            title={post.title}
            author={post.author}
            views={post.views}
            date={post.date}
            image={post.image}
            profileImage={post.profileImage}
            duration={post.duration}
          />
        ))}
      </div>
    );
  }

  // Formatter les données de l'API pour correspondre au format attendu par Post
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