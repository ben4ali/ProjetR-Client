import React, { useState } from "react";
import { Link } from "react-router-dom";
import { startVoiceRecognition } from "../../utils/VoiceTranscript";
import { FilterBar } from "./FilterBar";

export const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState("");
  const [isListening, setIsListening] = useState(false);

  const handleVoiceInput = () => {
    setIsListening(true);
    startVoiceRecognition(
      (transcript) => {
        setSearchText(transcript);
        setError("");
        setIsListening(false);
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
          />
          <button className="search-btn">
            <i className="bi bi-search"></i>
          </button>
          <button
            className={`voice-btn ${isListening ? "active" : ""}`}
            onClick={handleVoiceInput}
            disabled={isListening}
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
      <FilterBar />
    </div>
  );
};