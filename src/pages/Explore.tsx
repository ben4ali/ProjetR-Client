import React, { useState } from "react";
import "../styles/style-explore.css";
import { SearchBar } from "../components/explore/SearchBar";
import { PostList } from "../components/explore/PostList";
import { useAllProjects } from "../hooks/use-project";
import { Projet } from "../types/Projet";

export const Explore = () => {
  const { data: allProjets, isLoading, error } = useAllProjects();
  const [searchResults, setSearchResults] = useState<Projet[]>([]);
  const [filterResults, setFilterResults] = useState<Projet[]>([]);
  
  // Déterminer quels projets afficher avec une logique de priorité
  const displayProjects = () => {
    // 1. Si des résultats de recherche existent, les afficher
    if (searchResults.length > 0) {
      return searchResults;
    }
    // 2. Si des résultats de filtrage existent, les afficher
    if (filterResults.length > 0) {
      return filterResults;
    }
    // 3. Sinon, afficher tous les projets
    return allProjets || [];
  };

  const handleSearchResults = (results: Projet[]) => {
    setSearchResults(results);
    // Réinitialiser les filtres quand on fait une recherche
    setFilterResults([]);
  };

  const handleFilterResults = (results: Projet[]) => {
    setFilterResults(results);
    // Réinitialiser la recherche quand on applique des filtres
    setSearchResults([]);
  };

  return (
    <div className="explore-container">
      <SearchBar 
        onSearchResults={handleSearchResults} 
        onFilterResults={handleFilterResults}
      />
      <hr />
      {isLoading ? (
        <div className="loading">Chargement des projets...</div>
      ) : error ? (
        <div className="error">Erreur: {(error as Error).message}</div>
      ) : displayProjects().length === 0 ? (
        <div className="no-results">Aucun projet trouvé</div>
      ) : (
        <PostList projets={displayProjects()} />
      )}
    </div>
  );
};