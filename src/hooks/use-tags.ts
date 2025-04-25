import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Tag } from "../types/Tag";

const API_URL = import.meta.env.VITE_API_URL;

export function useTags() {
  return useQuery<Tag[], Error>({
    queryKey: ["tags"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/tags`);
      return data;
    },
  });
}
