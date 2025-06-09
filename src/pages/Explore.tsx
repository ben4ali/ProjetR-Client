import { useCallback, useState } from 'react';
// import "../styles/style-explore.css"; // Unlink le fichier CSS
import { FilterModal } from '../components/explore/FilterModal';
import { PostList } from '../components/explore/PostList';
import { SearchBar } from '../components/explore/SearchBar';
import { useAllProjects } from '../hooks/use-project';
import { Projet } from '../types/Projet';

export const Explore = () => {
  const { data: allProjets, isLoading, error } = useAllProjects();
  const [searchResults, setSearchResults] = useState<Projet[]>([]);
  const [filterResults, setFilterResults] = useState<Projet[]>([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSearchingOrFiltering, setIsSearchingOrFiltering] = useState(false);

  const displayProjects = () => {
    const result = {
      projects: allProjets || [],
      type: 'all',
    };
    if (searchResults.length > 0) {
      result.projects = searchResults;
      result.type = 'search';
    }
    if (filterResults.length > 0) {
      result.projects = filterResults;
      result.type = 'filter';
    }
    if (
      searchResults.length === 0 &&
      filterResults.length === 0 &&
      isSearchingOrFiltering
    ) {
      result.projects = [];
      result.type = 'none';
    }
    return result;
  };

  const handleSearchResults = useCallback(
    (results: Projet[], searchQuery: string) => {
      setSearchResults(results);
      setFilterResults([]);
      if (searchQuery.trim() === '') {
        setIsSearchingOrFiltering(false);
      } else {
        setIsSearchingOrFiltering(true);
      }
    },
    []
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
    []
  );

  const toggleFilterModal = useCallback(() => {
    setIsFilterModalOpen(prev => !prev);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
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
      <hr className="w-[90%] border border-slate-800/30" />
      {isLoading ? (
        <div className="text-lg text-slate-600 mt-6">
          Chargement des projets...
        </div>
      ) : error ? (
        <div className="text-red-500 mt-6">
          Erreur: {(error as Error).message}
        </div>
      ) : displayProjects().projects.length === 0 ? (
        <div className="text-slate-600 mt-6">Aucun projet trouvé</div>
      ) : (
        <>
          {displayProjects().type === 'all' ? (
            <PostList
              className="flex flex-wrap gap-4 w-full px-[5%] py-8 h-[30rem]"
              projets={displayProjects().projects}
            />
          ) : displayProjects().type === 'search' ? (
            <PostList
              className="flex flex-col w-full px-[5%] py-8 gap-6"
              fullPost
              projets={displayProjects().projects}
            />
          ) : (
            <PostList
              className="flex flex-col w-full px-[5%] py-8 gap-6"
              fullPost
              projets={displayProjects().projects}
            />
          )}
        </>
      )}
    </div>
  );
};
