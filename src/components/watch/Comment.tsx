import React from "react";

export const Comment = ({ author, text }: { author: string; text: string }) => {
  return (
    <div className="comment">
      <div className="comment-author">
        <img src="https://wallpapercave.com/wp/wp4877950.jpg" alt="autheur" />
      </div>
      <div className="comment-info">
        <h4>{author}</h4>
        <p>{text}</p>
      </div>
    </div>
  );
};