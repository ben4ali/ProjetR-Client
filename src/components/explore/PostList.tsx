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
    {
      title: "Understanding the Cosmos",
      author: "astrofan",
      views: "1.2M",
      date: "2025-04-10",
      image: "https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain",
      profileImage: "https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain",
      duration: "12:30",
    },
    {
      title: "The Art of Minimalism",
      author: "designguru",
      views: "850k",
      date: "2025-02-15",
      image: "https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain",
      profileImage: "https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain",
      duration: "9:45",
    },
    {
      title: "Mastering TypeScript",
      author: "codewizard",
      views: "500k",
      date: "2025-01-20",
      image: "https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain",
      profileImage: "https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain",
      duration: "15:00",
    },
    {
      title: "Exploring the Deep Sea",
      author: "oceanlover",
      views: "1.8M",
      date: "2025-03-05",
      image: "https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain",
      profileImage: "https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain",
      duration: "20:10",
    },
    {
      title: "The Future of AI",
      author: "techgeek",
      views: "2.5M",
      date: "2025-05-01",
      image: "https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain",
      profileImage: "https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain",
      duration: "18:00",
    },
    {
      title: "Cooking with Passion",
      author: "chefmaster",
      views: "300k",
      date: "2025-04-18",
      image: "https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain",
      profileImage: "https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain",
      duration: "10:25",
    },
    {
      title: "The History of Space Travel",
      author: "spacenerd",
      views: "1.1M",
      date: "2025-03-30",
      image: "https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain",
      profileImage: "https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain",
      duration: "22:15",
    },
    {
      title: "Fitness for Everyone",
      author: "fitguru",
      views: "750k",
      date: "2025-02-28",
      image: "https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain",
      profileImage: "https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain",
      duration: "8:40",
    },
    {
      title: "The Beauty of Nature",
      author: "naturefan",
      views: "1.4M",
      date: "2025-03-12",
      image: "https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain",
      profileImage: "https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain",
      duration: "14:20",
    },
    {
      title: "The Evolution of Gaming",
      author: "gamerlife",
      views: "2.2M",
      date: "2025-04-05",
      image: "https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain",
      profileImage: "https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain",
      duration: "19:35",
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