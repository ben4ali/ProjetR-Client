import React from "react";
import { Link } from "react-router-dom";

export const Post = ({
  title,
  author,
  views,
  date,
  image,
  profileImage,
  duration,
}: {
  title: string;
  author: string;
  views: string;
  date: string;
  image: string;
  profileImage: string;
  duration: string;
}) => {
  return (
    <Link to="/watch/1" className="post">
      <div className="image-holder">
        <div className="post-overlay"></div>
        <img src={image} alt="post" />
        <p className="temps">{duration}</p>
      </div>
      <div className="post-footer">
        <div className="post-author">
          <img src={profileImage} alt="Photo de profil" />
        </div>
        <div className="post-info">
          <h2>{title}</h2>
          <p>{author}</p>
          <p>{views} Visionnements - {date}</p>
        </div>
      </div>
    </Link>
  );
};