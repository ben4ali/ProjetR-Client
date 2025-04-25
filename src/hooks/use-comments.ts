import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Comment } from "../types/Comment";

const API_URL = import.meta.env.VITE_API_URL;

// Récupérer tous les commentaires d'un projet
export function useCommentsByProject(projetId?: string | number) {
  return useQuery<Comment[], Error>({
    queryKey: ["comments", "project", projetId],
    queryFn: async () => {
      const { data } = await axios.get(
        `${API_URL}/comments/projet/${projetId}`
      );
      return data;
    },
    enabled: !!projetId,
  });
}

// Créer un nouveau commentaire
export function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      projetId,
      text,
      parentComment,
    }: {
      projetId: number | string;
      text: string;
      parentComment?: number | string;
    }) => {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        `${API_URL}/comments`,
        {
          projetId,
          text,
          parentComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", "project", variables.projetId],
      });
    },
  });
}

// Récupèer les réponses d'un commentaire
export function useRepliesToComment(commentId?: string | number) {
  return useQuery<Comment[], Error>({
    queryKey: ["comments", "replies", commentId],
    queryFn: async () => {
      const { data } = await axios.get(
        `${API_URL}/comments/replies/${commentId}`
      );
      return data;
    },
    enabled: !!commentId,
  });
}

// Répondre à un commentaire (cas spécifique de la création)
export function useReplyToComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      projetId,
      text,
      parentComment,
    }: {
      projetId: number | string;
      text: string;
      parentComment: number | string;
    }) => {
      const token = localStorage.getItem("token");
      console.log("Envoi de réponse avec parent ID:", parentComment);

      const { data } = await axios.post(
        `${API_URL}/comments`,
        {
          projetId,
          text,
          parentComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", "replies", variables.parentComment],
      });
      queryClient.invalidateQueries({
        queryKey: ["comments", "project", variables.projetId],
      });
    },
  });
}

// Supprimer un commentaire
// Supprimer un commentaire
export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      commentId,
    }: {
      commentId: number | string;
      projetId: number | string;
      parentCommentId?: number | string;
    }) => {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return commentId;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", "project", variables.projetId],
      });
      if (variables.parentCommentId) {
        queryClient.invalidateQueries({
          queryKey: ["comments", "replies", variables.parentCommentId],
        });
      }
    },
  });
}
