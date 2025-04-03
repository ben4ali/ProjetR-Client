import React, { useState } from "react";
import { Comment } from "./Comment";
import { useAuth } from "../../hooks/useAuth";
import { Projet } from "../../types/Projet";

interface CommentSectionProps {
  projet : Projet | null;
}

export const CommentSection = (
  { projet }: CommentSectionProps
) => {
  const { isLoggedIn, user } = useAuth();
  const [commentText, setCommentText] = useState("");

  const comments = [
    { author: "Ali Benkarrouch", text: "Super vidéo !" },
    { author: "John Doe", text: "Merci pour le partage !" },
    { author: "Jane Smith", text: "Très intéressant, merci !" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

  const handleComment = () => {
    // TODO: logique pour comment
    console.log("Comment submitted:", commentText);
    setCommentText("");
  };

  return (
    <div className="comment-container">
      <h3>{comments.length} commentaires</h3>
      {isLoggedIn && (
        <div className="comment-form">
          <img
            src={user?.avatar || "https://robohash.org/default.png"}
            alt="Auteur du commentaire"
            crossOrigin="anonymous"
          />
          <div className="comment-input">
            <input
              type="text"
              placeholder="Ajouter un commentaire..."
              value={commentText}
              onChange={handleInputChange}
            />
            <div className="comment-options">
              <button onClick={() => setCommentText("")}>Annuler</button>
                <button
                className={commentText.trim() ? "commenter" : ""}
                onClick={handleComment}
                disabled={!commentText.trim()}
                >
                Commenter
                </button>
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