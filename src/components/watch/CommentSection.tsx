import { useState } from "react";
import { CommentComponent } from "./CommentComponent";
import { isLoggedIn, useCurrentUser } from "../../hooks/use-auth";
import { Projet } from "../../types/Projet";
import { useCommentsByProject, useCreateComment } from "../../hooks/use-comments";

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
  } = useCommentsByProject(projet.id);

  const comments = allComments.filter((c) => !c.parentComment);
  const createCommentMutation = useCreateComment();

  const handleComment = () => {
    if (!commentText.trim()) return;
    createCommentMutation.mutate(
      { projetId: projet.id, text: commentText.trim() },
      { onSuccess: () => setCommentText("") }
    );
  };

  if (isLoading) return <p>Chargement des commentaires…</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <div className="comment-container flex flex-col w-full mt-12">
      <h3 className="text-2xl text-gray-700/80">{comments.length} commentaires</h3>

      {loggedIn && (
        <div className="comment-form flex gap-4 mt-4 w-full">
          <img
            src={`${user?.avatar || "https://robohash.org/default.png"}?t=${Date.now()}`}
            alt="avatar"
            crossOrigin="anonymous"
            className="h-12 w-12 rounded-full object-cover"
          />
          <div className="comment-input flex flex-col w-full">
            <input
              type="text"
              placeholder="Ajouter un commentaire…"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full bg-black/5 border border-black/10 rounded-[15px] px-4 py-3
                         outline-none focus:bg-blue-100/20 focus:border-blue-300 transition"
            />

            <div className="comment-options flex gap-4 justify-end mt-4">
              <button
                onClick={() => setCommentText("")}
                className="px-4 py-2 rounded-full hover:bg-black/10 transition"
              >
                Annuler
              </button>

              <button
                disabled={!commentText.trim() || createCommentMutation.isPending}
                onClick={handleComment}
                className={`px-4 py-2 rounded-full text-white
                            ${commentText.trim() ? "bg-black hover:bg-neutral-700" : "bg-gray-500 cursor-not-allowed"}`}
              >
                {createCommentMutation.isPending ? "En cours…" : "Commenter"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="comment-holder flex flex-col gap-8 mt-8 pt-12 pb-16 border-t border-black/20">
        {comments.map((comment) => (
          <CommentComponent key={comment.id} comment={comment} projetId={projet.id} />
        ))}
      </div>
    </div>
  );
};
