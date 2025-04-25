import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Projet } from "../types/Projet";

const API_URL = import.meta.env.VITE_API_URL;

export function useProjectsByUserId(userId?: string | number) {
  return useQuery<Projet[], Error>({
    queryKey: ["projects", "user", userId],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/projects/user/${userId}`);
      return data;
    },
    enabled: !!userId,
  });
}

export function useProjectById(id?: string | number) {
  return useQuery<Projet, Error>({
    queryKey: ["project", id],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/projects/${id}`);
      return data;
    },
    enabled: !!id,
  });
}

export function useAllProjects() {
  return useQuery<Projet[], Error>({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/projects`);
      return data;
    },
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      projectData,
      video,
    }: {
      projectData: {
        title: string;
        description: string;
        githubUrl?: string;
        gitLabUrl?: string;
        tags?: string[];
        collaborators?: string[];
        course?: string;
        teacher?: string;
        session?: string;
      };
      video: File | null;
    }) => {
      const formData = new FormData();
      if (video) {
        formData.append("video", video);
      }
      formData.append("projet", JSON.stringify(projectData));

      const token = localStorage.getItem("token");
      const { data } = await axios.post(`${API_URL}/projects`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useIncrementViewCount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (projectId: string) => {
      const { data } = await axios.put(`${API_URL}/projects/view/${projectId}`);
      return data;
    },
    onSuccess: (_, projectId) => {
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
    },
  });
}

export function useLikeProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (projectId: string | number) => {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        `${API_URL}/projects/like/${projectId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    onSuccess: (_, projectId) => {
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useDislikeProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (projectId: string | number) => {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        `${API_URL}/projects/dislike/${projectId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    onSuccess: (_, projectId) => {
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export const useRecommendedProjects = (tags: string[] | undefined) => {
  return useQuery({
    queryKey: ['recommendedProjects', tags],
    queryFn: async () => {
      if (!tags || tags.length === 0) {
        const response = await axios.get(`${API_URL}/projects`);
        return response.data;
      }

      const tagsString = tags.join(',');
      const response = await axios.get(`${API_URL}/projects/recommended?tags=${tagsString}`);
      return response.data;
    },
    enabled: !!tags,
    staleTime: 60000,
  });
};