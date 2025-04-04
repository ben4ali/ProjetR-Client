import React, { useState, useEffect } from "react";
import { User } from "../../types/User";
import { useAuth } from "../../hooks/useAuth";
import { useApi } from "../../hooks/useApi";
import default_profil from "../../assets/images/default_profil.png";
import { Comment } from "../../types/Comment";

interface CommentComponentProps {
  comment: Comment;
}

export const CommentComponent: React.FC<CommentComponentProps> = ({ comment }) => {
  const { isLoggedIn, user } = useAuth();
  const { request } = useApi();
  const [isDeleted, setIsDeleted] = useState(false);
  const { author, text, id: commentId } = comment;
  const [commentReplies, setCommentReplies] = useState<Comment[]>([]);
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    const fetchCommentReplies = async () => {
      if (comment) {
        try {
          const data = await request(
            "get",
            `http://localhost:5000/api/v1/comments/replies/${comment.id}`
          );
          setCommentReplies(data);

          console.log("Replies fetched:", data);
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      }
    };

    fetchCommentReplies();
  }, [comment]);

  const handleDeleteComment = async () => {
    try {
      await request("delete", `http://localhost:5000/api/v1/comments/${commentId}`);
      console.log("Commentaire supprimé avec succès");
      setIsDeleted(true);
    } catch (error) {
      console.error("Erreur lors de la suppression du commentaire :", error);
    }
  };

  const handleReplySubmit = async () => {
    if (!replyText.trim()) return;

    try {
      const newReply = await request("post", `http://localhost:5000/api/v1/comments`, {
        parentComment: commentId,
        projetId: comment.projet.id,
        text: replyText.trim(),
      });
      setCommentReplies((prevReplies) => [...prevReplies, newReply]);
      setReplyText("");
      setShowReplyInput(false);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la réponse :", error);
    }
  };

  if (isDeleted) {
    return null;
  }

  return (
    <div className="comment">

      <div className="comment-author">
        <img src={author.avatar || default_profil} alt="autheur" />
      </div>
      <div className="comment-info">
        <div className="comment-header">
          <h4>{author.username}</h4>
          {user?.id === author.id && (
            <button
              className="comment-options-button"
              onClick={handleDeleteComment}
            >
              <i className="bi bi-x"></i>
            </button>
          )}
        </div>
        <p>{text}</p>
        <div className="reply-options">
          {!comment.parentComment && isLoggedIn && (
   
            <button
              className="reply-button"
              onClick={() => setShowReplyInput(!showReplyInput)}
            >
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
        {showReplyInput && isLoggedIn && (
            <div className="reply-input">
              <input
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Écrire une réponse..."
              />
              <button className="submit-reply-btn" onClick={handleReplySubmit}>Soumettre</button>
            </div>
         )}
        {commentReplies.length > 0 && (
          <div className="comment-replies">

            {showReplies && (
              <div className="replies-list">
                {commentReplies.map((reply) => (
                  <CommentComponent key={reply.id} comment={reply} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};