import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Course } from "../types/Course";

const API_URL = import.meta.env.VITE_API_URL;

export function useCourses() {
  return useQuery<Course[], Error>({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/courses`);
      return data;
    },
  });
}
