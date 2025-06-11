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
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearchResults,
  onFilterResults,
  onOpenFilterModal,
}) => {
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);
  const [error, setError] = useState("");
  const [isListening, setIsListening] = useState(false);

  const { data: searchResults, isLoading } = useProjectsByTitle(searchQuery);
  React.useEffect(() => {
    if (searchResults && !isLoading) {
      onSearchResults(searchResults, searchQuery || "");
    }
  }, [searchResults, isLoading, onSearchResults]);

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
    <div className="w-full flex flex-col mt-25 h-auto justify-center gap-4 mb-4 relative md:w-[90%] md:mt-30 md:h-32">
      <div className="flex  gap-2 w-full justify-center items-stretch relative md:flex-row md:gap-4 md:items-center">
        <div className="flex relative w-[80%] gap-4 items-center">
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full h-12 text-[25px] px-4 rounded-full border-2 border-slate-800/30 outline-none bg-transparent text-slate-700 md:w-[70%] md:text-[20px]"
          />
          <button
            className="hidden md:flex absolute md:right-[30.1%] md:h-[93%] md:items-center md:justify-center md:w-24 md:rounded-r-full md:bg-slate-100 md:text-slate-700/70 md:text-xl md:cursor-pointer md:transition-colors md:hover:bg-neutral-900 md:hover:text-white
              right-[10%] w-20 text-[1.1rem] h-12 items-center justify-center rounded-full bg-slate-100 text-slate-700/70 cursor-pointer transition-colors hover:bg-neutral-900 hover:text-white"
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
            className={`hidden md:flex ml-2 text-2xl bg-slate-100 rounded-full h-12 w-12 items-center justify-center cursor-pointer transition-colors ${
              isListening
                ? "bg-blue-400 text-white animate-pulse"
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
            className="w-12 h-12 p-0 rounded-full flex justify-center items-center text-[1.1rem] bg-blue-500 text-white text-xl cursor-pointer transition-colors hover:bg-neutral-900 hover:text-white md:w-auto md:px-8 md:rounded-full md:text-xl"
          >
            <i className="bi bi-plus text-2xl mr-0 md:mr-2"></i>
            <p className="hidden md:block">Publier un projet</p>
          </Link>
        </div>
      </div>
      {error && (
        <p className="absolute text-red-500 text-sm left-2 top-0">{error}</p>
      )}
      <FilterBar
        onFilterResults={onFilterResults}
        onOpenFilterModal={onOpenFilterModal}
      />
    </div>
  );
};
