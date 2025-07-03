import { useState } from "react";
import default_profil from "../../assets/images/default_profil.png";
import { isLoggedIn, useCurrentUser } from "../../hooks/use-auth";
import {
  useDeleteComment,
  useRepliesToComment,
  useReplyToComment,
} from "../../hooks/use-comments";
import { Comment } from "../../types/Comment";

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

  const formattedDate = new Date(comment.createdAt).toLocaleDateString("fr-FR");

  const replyMutation = useReplyToComment();
  const deleteMutation = useDeleteComment();

  /* ---------- actions ---------- */

  const handleSubmitReply = () => {
    if (!replyText.trim()) return;
    replyMutation.mutate(
      { projetId, text: replyText.trim(), parentComment: comment.id },
      { onSuccess: () => (setReplyText(""), setIsReplying(false)) },
    );
  };

  const handleDeleteComment = () => {
    if (!window.confirm("Supprimer ?")) return;
    deleteMutation.mutate({
      commentId: comment.id,
      projetId,
      parentCommentId: comment.parentComment?.id,
    });
  };

  /* ---------- rendu ---------- */

  return (
    <div className="comment flex w-full flex-shrink-0 justify-start gap-4">
      {/* avatar */}
      <div className="comment-author shrink-0">
        <img
          src={comment.author.avatar || default_profil}
          alt="avatar"
          className="h-12 w-12 rounded-full object-cover"
        />
      </div>

      {/* contenu */}
      <div className="comment-info flex w-full flex-col">
        {/* entête */}
        <div className="comment-header flex items-center justify-between">
          <h4 className="font-medium">
            {comment.author.firstName} {comment.author.lastName}
            <span className="comment-date ml-1 text-sm opacity-50">
              – {formattedDate}
            </span>
          </h4>

          {user?.id === comment.author.id && (
            <button
              onClick={handleDeleteComment}
              className="comment-options-button transition hover:text-red-600"
            >
              <i className="bi bi-x text-xl" />
            </button>
          )}
        </div>

        {/* texte */}
        <p className="mt-1 text-base text-gray-700/80">{comment.text}</p>

        {/* options */}
        <div className="reply-options mt-1 flex items-center gap-4">
          {!comment.parentComment && loggedIn && (
            <button
              onClick={() => setIsReplying(!isReplying)}
              className="reply-button cursor-pointer text-[#5c67cc] transition hover:opacity-50"
            >
              Répondre
            </button>
          )}

          {commentReplies.length > 0 && (
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="show-replies-button text-gray-600"
            >
              {showReplies ? "Cacher réponses" : "Montrer réponses"}
            </button>
          )}
        </div>

        {/* champ de réponse */}
        {isReplying && loggedIn && (
          <div className="reply-input mt-3 flex w-full gap-4">
            <input
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Écrire une réponse…"
              className="w-full rounded border border-black/10 bg-black/5 px-3 py-2 outline-none"
            />
            <button
              onClick={handleSubmitReply}
              className="submit-reply-btn rounded bg-[#444ea5] px-4 py-2 text-white transition hover:bg-[#2d2f46]"
            >
              Soumettre
            </button>
          </div>
        )}

        {/* sous-commentaires */}
        {showReplies && commentReplies.length > 0 && (
          <div className="comment-replies mt-4 flex flex-col gap-8 pl-8">
            <div className="replies-list flex flex-col gap-4">
              {commentReplies.map((reply) => (
                <CommentComponent
                  key={reply.id}
                  comment={reply}
                  projetId={projetId}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
