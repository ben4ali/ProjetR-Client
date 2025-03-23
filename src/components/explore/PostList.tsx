import React from "react";
import { Post } from "./Post";

export const PostList = () => {
  const posts = [
    {
      title: "L'infinie complexité d'un jeu simpliste",
      author: "ben4ali",
      views: "275k",
      date: "2025-03-22",
      image: "https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain",
      profileImage: "https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain",
      duration: "18:50",
    },
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
};