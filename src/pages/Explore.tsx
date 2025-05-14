import { useCallback, useState } from "react";
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
  const [isSearchingOrFiltering, setIsSearchingOrFiltering] = useState(false);

  const displayProjects = () => {
    const result = {
      projects: allProjets || [],
      type: "all",
    };
    if (searchResults.length > 0) {
      result.projects = searchResults;
      result.type = "search";
    }
    if (filterResults.length > 0) {
      result.projects = filterResults;
      result.type = "filter";
    }
    if (
      searchResults.length === 0 &&
      filterResults.length === 0 &&
      isSearchingOrFiltering
    ) {
      result.projects = [];
      result.type = "none";
    }
    return result;
  };

  const handleSearchResults = useCallback((results: Projet[], searchQuery: string) => {
    setSearchResults(results);
    setFilterResults([]);
    if(searchQuery.trim() === "") {
      setIsSearchingOrFiltering(false);
    } else {
      setIsSearchingOrFiltering(true);
    }
  }, []);

  const handleFilterResults = useCallback((results: Projet[], isSearching: boolean ) => {
    setFilterResults(results);
    setSearchResults([]);
    if(!isSearching) {
      setIsSearchingOrFiltering(false);
    }else{
      setIsSearchingOrFiltering(true);
    }
  }, []);

  const toggleFilterModal = useCallback(() => {
    setIsFilterModalOpen(!isFilterModalOpen);
  }, []);

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
      ) : displayProjects().projects.length === 0 ? (
        <div className="text-slate-600 mt-6">Aucun projet trouvé</div>
      ) : (
        <>
          {displayProjects().type === "all" ? (
            <PostList
              className="post-holder"
              projets={displayProjects().projects}
            />
          ) : displayProjects().type === "search" ? (
            <PostList
              className="full-post-holder gap-6"
              fullPost
              projets={displayProjects().projects}
            />
          ) : (
            <PostList
              className="full-post-holder gap-6"
              fullPost
              projets={displayProjects().projects}
            />
          )}
        </>
      )}
    </div>
  );
};
