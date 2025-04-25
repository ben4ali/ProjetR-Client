import React, { useState } from "react";
import { Comment } from "../../types/Comment";
import { isLoggedIn, useCurrentUser } from "../../hooks/use-auth";
import {
  useReplyToComment,
  useRepliesToComment,
  useDeleteComment,
} from "../../hooks/use-comments";
import default_profil from "../../assets/images/default_profil.png";

interface CommentComponentProps {
  comment: Comment;
  projetId: number | string;
}

export const CommentComponent = ({
  comment,
  projetId,
}: CommentComponentProps) => {
  const loggedIn = isLoggedIn();
  const { data: user } = useCurrentUser();
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showReplies, setShowReplies] = useState(false);

  const { data: commentReplies = [] } = useRepliesToComment(comment.id);
  const [commentDate, setCommentDate] = useState(new Date(comment.createdAt));
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return date.toLocaleDateString("fr-FR", options);
  };
  const formattedDate = formatDate(commentDate);
  const replyMutation = useReplyToComment();

  const handleReply = () => {
    setIsReplying(!isReplying);
  };

  const handleSubmitReply = () => {
    if (replyText.trim() && comment.id) {
      replyMutation.mutate(
        {
          projetId,
          text: replyText.trim(),
          parentComment: comment.id,
        },
        {
          onSuccess: () => {
            setReplyText("");
            setIsReplying(false);
          },
          onError: (error) => {
            console.error("Erreur lors de la réponse au commentaire :", error);
          },
        }
      );
    }
  };

  const deleteCommentMutation = useDeleteComment();

  const handleDeleteComment = () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce commentaire ?")) {
      deleteCommentMutation.mutate(
        {
          commentId: comment.id,
          projetId,
          parentCommentId: comment.parentComment,
        },
        {
          onSuccess: () => {
            console.log("Commentaire supprimé avec succès");
          },
          onError: (error) => {
            console.error(
              "Erreur lors de la suppression du commentaire :",
              error
            );
          },
        }
      );
    }
  };

  return (
    <div className="comment">
      <div className="comment-author">
        <img src={comment.author.avatar || default_profil} alt="autheur" />
      </div>
      <div className="comment-info">
        <div className="comment-header">
          <h4>
            {comment.author?.firstName} {comment.author?.lastName}{" "}
            <span className="comment-date"> - {formattedDate} </span>
          </h4>
          {user?.id === comment.author.id && (
            <button
              className="comment-options-button"
              onClick={handleDeleteComment}
            >
              <i className="bi bi-x"></i>
            </button>
          )}
        </div>
        <p>{comment.text}</p>

        <div className="reply-options">
          {!comment.parentComment && loggedIn && (
            <button className="reply-button" onClick={handleReply}>
              Répondre
            </button>
          )}
          {commentReplies.length > 0 && (
            <button
              className="show-replies-button"
              onClick={() => setShowReplies(!showReplies)}
            >
              {showReplies ? "Cacher réponses" : "Montrer réponses"}
            </button>
          )}
        </div>

        {isReplying && isLoggedIn && (
          <div className="reply-input">
            <input
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Écrire une réponse..."
            />
            <button className="submit-reply-btn" onClick={handleSubmitReply}>
              Soumettre
            </button>
          </div>
        )}
        {commentReplies.length > 0 && (
          <div className="comment-replies">
            {showReplies && (
              <div className="replies-list">
                {commentReplies.map((reply) => (
                  // Afficher chaque réponse
                  <CommentComponent
                    key={reply.id}
                    comment={reply}
                    projetId={projetId}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
