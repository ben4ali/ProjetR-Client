import React from "react";
import { Comment } from "./Comment";

export const CommentSection = () => {
  const comments = [
    { author: "Ali Benkarrouch", text: "Super vidéo !" },
    { author: "Ali Benkarrouch", text: "Super vidéo !" },
    { author: "Ali Benkarrouch", text: "Super vidéo !" },
  ];

  return (
    <div className="comment-container">
      <h3>{comments.length} commentaires</h3>
      <div className="comment-form">
        <img src="https://wallpapercave.com/wp/wp4877950.jpg" alt="autheur" />
        <div className="comment-input">
          <input type="text" placeholder="Ajouter un commentaire..." />
          <div className="comment-options">
            <button>Annuler</button>
            <button>Commenter</button>
          </div>
        </div>
      </div>
      <div className="comment-holder">
        {comments.map((comment, index) => (
          <Comment key={index} author={comment.author} text={comment.text} />
        ))}
      </div>
    </div>
  );
};