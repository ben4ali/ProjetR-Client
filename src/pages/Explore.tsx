import React, { useState } from "react";
import "../styles/style-explore.css";
import { SearchBar } from "../components/explore/SearchBar";
import { PostList } from "../components/explore/PostList";
import { useAllProjects } from "../hooks/use-project";
import { Projet } from "../types/Projet";
import { FilterModal } from "../components/explore/FilterModal";

export const Explore = () => {
  const { data: allProjets, isLoading, error } = useAllProjects();
  const [searchResults, setSearchResults] = useState<Projet[]>([]);
  const [filterResults, setFilterResults] = useState<Projet[]>([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  
  const displayProjects = () => {
    if (searchResults.length > 0) {
      return searchResults;
    }
    if (filterResults.length > 0) {
      return filterResults;
    }
    return allProjets || [];
  };

  const handleSearchResults = (results: Projet[]) => {
    setSearchResults(results);
    setFilterResults([]);
  };

  const handleFilterResults = (results: Projet[]) => {
    setFilterResults(results);
    setSearchResults([]);
  };

  const toggleFilterModal = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
  };

  return (
    <div className="explore-container">
      {isFilterModalOpen && (
        <FilterModal 
          onClose={toggleFilterModal} 
          onApplyFilters={handleFilterResults}
        />
      )}
      <SearchBar 
        onSearchResults={handleSearchResults} 
        onFilterResults={handleFilterResults}
        onOpenFilterModal={toggleFilterModal}
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