import React, { useState } from "react";
import { CommentComponent } from "./CommentComponent";
import { isLoggedIn, useCurrentUser } from "../../hooks/use-auth";
import { Comment } from "../../types/Comment";
import { Projet } from "../../types/Projet";
import {
  useCommentsByProject,
  useCreateComment,
} from "../../hooks/use-comments";

interface CommentSectionProps {
  projet: Projet;
}

export const CommentSection = ({ projet }: CommentSectionProps) => {
  const loggedIn = isLoggedIn();
  const { data: user } = useCurrentUser();

  const [commentText, setCommentText] = useState("");
  const {
    data: allComments = [],
    isLoading,
    error,
  } = useCommentsByProject(projet?.id);
  const comments = allComments.filter((comment) => !comment.parentComment);
  const createCommentMutation = useCreateComment();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

  const handleComment = () => {
    if (projet?.id && commentText.trim()) {
      createCommentMutation.mutate(
        {
          projetId: projet.id,
          text: commentText.trim(),
        },
        {
          onSuccess: () => {
            setCommentText("");
          },
          onError: (error) => {
            console.error("Erreur lors de la création du commentaire :", error);
          },
        }
      );
    }
  };

  if (isLoading) return <div>Chargement des commentaires...</div>;
  if (error)
    return (
      <div>Erreur lors du chargement des commentaires: {error.message}</div>
    );

  return (
    <div className="comment-container">
      <h3>{comments.length} commentaires</h3>
      {loggedIn && (
        <div className="comment-form">
          <img
            src={`${
              user?.avatar || "https://robohash.org/default.png"
            }?t=${new Date().getTime()}`}
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
                disabled={
                  !commentText.trim() || createCommentMutation.isPending
                }
              >
                {createCommentMutation.isPending ? "En cours..." : "Commenter"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="comment-holder">
        {comments.map((comment) => (
          <CommentComponent
            key={comment.id}
            comment={comment}
            allComments={allComments}
            projetId={projet.id}
            parentComment={null}
          />
        ))}
      </div>
    </div>
  );
};
