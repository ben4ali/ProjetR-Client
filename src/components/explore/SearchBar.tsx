import React, { useState } from "react";
import { Link } from "react-router-dom";
import { startVoiceRecognition } from "../../utils/VoiceTranscript";
import { FilterBar } from "./FilterBar";
import { useProjectsByTitle } from "../../hooks/use-project";
import { Projet } from "../../types/Projet";
interface SearchBarProps {
  onSearchResults: (projects: Projet[]) => void;
  onFilterResults: (projects: Projet[]) => void;
  onOpenFilterModal: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearchResults, 
  onFilterResults,
  onOpenFilterModal
}) => {
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);
  const [error, setError] = useState("");
  const [isListening, setIsListening] = useState(false);

  const { data: searchResults, isLoading } = useProjectsByTitle(searchQuery);
  React.useEffect(() => {
    if (searchResults && !isLoading) {
      onSearchResults(searchResults);
    }
  }, [searchResults, isLoading, onSearchResults]);

  const handleSearch = () => {
    if (searchText.trim()) {
      setSearchQuery(searchText.trim());
    } else {
      setSearchQuery(undefined);
      onSearchResults([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
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
      }
    );
  };

  return (
    <div className="search-container">
      <div className="explore-search-holder">
        <div className="explore-search">
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button 
            className="search-btn" 
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
            className={`voice-btn ${isListening ? "active" : ""}`}
            onClick={handleVoiceInput}
            disabled={isListening || isLoading}
          >
            <i className="bi bi-mic"></i>
          </button>
        </div>
        <div className="create-post">
          <Link to="/publish" className="create-post-btn">
            <i className="bi bi-plus"></i>
            <p>Publier un projet</p>
          </Link>
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
      <FilterBar 
        onFilterResults={onFilterResults} 
        onOpenFilterModal={onOpenFilterModal}
      />
    </div>
  );
};