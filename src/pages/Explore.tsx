import React from "react";
import "../styles/style-explore.css";
import { SearchBar } from "../components/explore/SearchBar";
import { PostList } from "../components/explore/PostList";
import { useAllProjects } from "../hooks/use-project";
import { Projet } from "../types/Projet";

export const Explore = () => {
  const { data: projets, isLoading, error } = useAllProjects();

  return (
    <div className="explore-container">
      <SearchBar />
      <hr />
      {isLoading ? (
        <div className="loading">Chargement des projets...</div>
      ) : error ? (
        <div className="error">Erreur: {(error as Error).message}</div>
      ) : (
        <PostList projets={projets || []} />
      )}
    </div>
  );
};