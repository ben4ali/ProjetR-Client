import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Favorite } from '../types/Favorite';

const API_URL = import.meta.env.VITE_API_URL;

export function useFavoritesByUser(userId?: string | number) {
  return useQuery<Favorite[], Error>({
    queryKey: ['favorites', 'user', userId],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/favorites/user`, {
        params: { userId },
      });
      return data;
    },
    enabled: !!userId,
  });
}

export function useAddFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (projectId: number | string) => {
      const token = localStorage.getItem('token');
      const { data } = await axios.post(
        `${API_URL}/favorites`,
        { projectId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });
}

export function useRemoveFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (projectId: number | string) => {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/favorites`, {
        data: { projectId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });
}

export function useIsProjectFavoritedByUser(projectId?: number | string) {
  return useQuery<boolean, Error>({
    queryKey: ['favorites', 'check', projectId],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(
        `${API_URL}/favorites/is-favorited?projectId=${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data.isFavorited;
    },
    enabled: !!projectId,
  });
}
