import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FilterModal } from "../components/explore/FilterModal";
import { PostList } from "../components/explore/PostList";
import { SearchBar } from "../components/explore/SearchBar";
import { useAllProjects } from "../hooks/use-project";
import { Projet } from "../types/Projet";

export const Explore = () => {
  const { data: allProjets, isLoading, error } = useAllProjects();
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState<Projet[]>([]);
  const [filterResults, setFilterResults] = useState<Projet[]>([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSearchingOrFiltering, setIsSearchingOrFiltering] = useState(false);
  const [initialSearchQuery, setInitialSearchQuery] = useState<string>("");

  useEffect(() => {
    const searchQuery = searchParams.get("search");
    if (searchQuery && searchQuery.trim() !== "") {
      setInitialSearchQuery(searchQuery.trim());
    }
  }, [searchParams]);

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

  const handleSearchResults = useCallback(
    (results: Projet[], searchQuery: string) => {
      setSearchResults(results);
      setFilterResults([]);
      if (searchQuery.trim() === "") {
        setIsSearchingOrFiltering(false);
      } else {
        setIsSearchingOrFiltering(true);
      }
    },
    [],
  );

  const handleFilterResults = useCallback(
    (results: Projet[], isSearching: boolean) => {
      setFilterResults(results);
      setSearchResults([]);
      if (!isSearching) {
        setIsSearchingOrFiltering(false);
      } else {
        setIsSearchingOrFiltering(true);
      }
    },
    [],
  );

  const toggleFilterModal = useCallback(() => {
    setIsFilterModalOpen((prev) => !prev);
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
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
        initialSearchQuery={initialSearchQuery}
      />
      <hr className="w-[90%] border border-slate-800/30" />
      {isLoading ? (
        <div className="mt-6 text-lg text-slate-600">
          Chargement des projets...
        </div>
      ) : error ? (
        <div className="mt-6 text-red-500">
          Erreur: {(error as Error).message}
        </div>
      ) : displayProjects().projects.length === 0 ? (
        <div className="mt-6 text-slate-600">Aucun projet trouvé</div>
      ) : (
        <>
          {displayProjects().type === "all" ? (
            <PostList
              className="flex h-[30rem] w-full flex-wrap gap-4 px-[5%] py-8"
              projets={displayProjects().projects}
            />
          ) : displayProjects().type === "search" ? (
            <PostList
              className="flex w-full flex-col gap-6 px-[5%] py-8"
              fullPost
              projets={displayProjects().projects}
            />
          ) : (
            <PostList
              className="flex w-full flex-col gap-6 px-[5%] py-8"
              fullPost
              projets={displayProjects().projects}
            />
          )}
        </>
      )}
    </div>
  );
};
