import React from "react";
import { Comment } from "./Comment";
import { useAuth } from "../../hooks/useAuth";

export const CommentSection = () => {
  const { isLoggedIn, user } = useAuth();

  const comments = [
    { author: "Ali Benkarrouch", text: "Super vidéo !" },
    { author: "John Doe", text: "Merci pour le partage !" },
    { author: "Jane Smith", text: "Très intéressant, merci !" },
  ];

  return (
    <div className="comment-container">
      <h3>{comments.length} commentaires</h3>
      {isLoggedIn && (
        <div className="comment-form">
          <img
            src={user?.avatar || "https://robohash.org/default.png"}
            alt="Auteur du commentaire"
          />
          <div className="comment-input">
            <input type="text" placeholder="Ajouter un commentaire..." />
            <div className="comment-options">
              <button>Annuler</button>
              <button>Commenter</button>
            </div>
          </div>
        </div>
      )}

      <div className="comment-holder">
        {comments.map((comment, index) => (
          <Comment key={index} author={comment.author} text={comment.text} />
        ))}
      </div>
    </div>
  );
};