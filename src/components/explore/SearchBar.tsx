import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useProjectsByTitle } from "../../hooks/use-project";
import { Projet } from "../../types/Projet";
import { startVoiceRecognition } from "../../utils/VoiceTranscript";
import { FilterBar } from "./FilterBar";

interface SearchBarProps {
  onSearchResults: (projects: Projet[], searchQuery: string) => void;
  onFilterResults: (projects: Projet[], isSearching: boolean) => void;
  onOpenFilterModal: () => void;
  initialSearchQuery?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearchResults,
  onFilterResults,
  onOpenFilterModal,
  initialSearchQuery,
}) => {
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);
  const [error, setError] = useState("");
  const [isListening, setIsListening] = useState(false);

  const { data: searchResults, isLoading } = useProjectsByTitle(searchQuery);

  // Gérer la recherche initiale depuis l'URL
  React.useEffect(() => {
    if (initialSearchQuery && initialSearchQuery.trim() !== "") {
      setSearchText(initialSearchQuery);
      setSearchQuery(initialSearchQuery.trim());
    }
  }, [initialSearchQuery]);

  React.useEffect(() => {
    if (searchResults && !isLoading) {
      onSearchResults(searchResults, searchQuery || "");
    }
  }, [searchResults, isLoading, onSearchResults, searchQuery]);

  const handleSearch = () => {
    if (searchText.trim()) {
      setSearchQuery(searchText.trim());
    } else {
      setSearchQuery(undefined);
      onSearchResults([], "");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleVoiceInput = () => {
    setIsListening(true);
    startVoiceRecognition(
      (transcript) => {
        setSearchText(transcript);
        setError("");
        setIsListening(false);
        setSearchQuery(transcript);
      },
      (error) => {
        setError(error);
        setIsListening(false);
      },
    );
  };

  return (
    <div className="relative mt-15 mb-4 flex h-auto w-full flex-col justify-center gap-4 md:h-32 md:w-[90%]">
      <div className="relative flex w-full items-stretch justify-center gap-2 md:flex-row md:items-center md:gap-4">
        <div className="relative flex w-[80%] items-center gap-4">
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-12 w-full rounded border border-[#ddddec] bg-transparent px-4 text-[25px] text-slate-700 outline-none md:w-[70%] md:text-[20px]"
          />
          <button
            className="absolute right-[10%] hidden h-12 w-20 cursor-pointer items-center justify-center bg-slate-100 text-[1.1rem] text-slate-700/70 transition-colors hover:bg-[#444ea5] hover:text-white md:right-[30.1%] md:flex md:h-[93%] md:w-24 md:cursor-pointer md:items-center md:justify-center md:rounded-r md:bg-slate-100 md:text-xl md:text-slate-700/70 md:transition-colors md:hover:text-white"
            onClick={handleSearch}
            disabled={isLoading}
          >
            {isLoading ? (
              <i className="bi bi-hourglass-split"></i>
            ) : (
              <i className="bi bi-search"></i>
            )}
          </button>
          <button
            className={`ml-2 hidden h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#3b4494] text-2xl text-white transition-colors md:flex ${
              isListening
                ? "animate-pulse bg-blue-400 text-white"
                : "text-slate-700/80"
            }`}
            onClick={handleVoiceInput}
            disabled={isListening || isLoading}
          >
            <i className="bi bi-mic"></i>
          </button>
        </div>
        <div className="flex w-auto justify-center md:w-[25rem] md:justify-end">
          <Link
            to="/publish"
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#3b4494] p-0 text-xl text-[1.1rem] text-white transition-colors hover:bg-neutral-900 hover:text-white md:w-auto md:rounded-full md:px-8 md:text-xl"
          >
            <i className="bi bi-plus mr-0 text-2xl md:mr-2"></i>
            <p className="hidden md:block">Publier un projet</p>
          </Link>
        </div>
      </div>

      {error && (
        <p className="absolute -top-5 left-2 text-sm text-red-500">{error}</p>
      )}

      <FilterBar
        onFilterResults={onFilterResults}
        onOpenFilterModal={onOpenFilterModal}
      />
    </div>
  );
};
