import React, { useEffect, useState } from "react";
import { CommentComponent } from "./CommentComponent";
import { useAuth } from "../../hooks/useAuth";
import { Comment } from "../../types/Comment";
import {useApi} from "../../hooks/useApi";
import { Projet } from "../../types/Projet";

interface CommentSectionProps {
  projet : Projet | null;
}

export const CommentSection = (
  { projet }: CommentSectionProps
) => {
  const { isLoggedIn, user } = useAuth();
  const [commentText, setCommentText] = useState("");

  const [comments, setComments] = useState<Comment[]>([]);
  const { request } = useApi<Comment[]>();

  useEffect(() => {
    const fetchComments = async () => {
      if (projet) {
        try {
          const data = await request(
            "get",
            `http://localhost:5000/api/v1/comments/projet/${projet.id}`
          );
          setComments(data.filter(comment => !comment.parentComment));
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      }
    }

    fetchComments();
  }, []);

  // const comments = [
  //   { author: "Ali Benkarrouch", text: "Super vidéo !" },
  //   { author: "John Doe", text: "Merci pour le partage !" },
  //   { author: "Jane Smith", text: "Très intéressant, merci !" },
  // ];



  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

  const handleComment = () => {
    if (projet?.id && commentText.trim()) {
      const postComment = async () => {
        try {
          const newComment = await request(
            "post",
            `http://localhost:5000/api/v1/comments`,
            {
              projetId: projet.id,
              text: commentText.trim(),
            }
          );
          setComments((prevComments) => [...prevComments, newComment]);
          setCommentText("");
        } catch (error) {
          console.error("Erreur lors de la création du commentaire :", error);
        }
      };
  
      postComment();
    } else {
      console.error("L'ID du projet est manquant ou le texte du commentaire est vide.");
    }
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
          <CommentComponent key={index} comment={comment} />
        ))}
      </div>
    </div>
  );
};