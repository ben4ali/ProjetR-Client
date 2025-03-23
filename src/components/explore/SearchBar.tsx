import React, { useState } from "react";
import { Link } from "react-router-dom";
import { startVoiceRecognition } from "../../utils/VoiceTranscript";
import { FilterBar } from "./FilterBar";

export const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState("");
  const [isListening, setIsListening] = useState(false); // État pour le bouton actif

  const handleVoiceInput = () => {
    setIsListening(true); // Active le bouton
    startVoiceRecognition(
      (transcript) => {
        setSearchText(transcript); // Met à jour la barre de recherche avec le texte transcrit
        setError(""); // Réinitialise les erreurs
        setIsListening(false); // Désactive le bouton après la transcription
      },
      (error) => {
        setError(error); // Affiche une erreur si la reconnaissance échoue
        setIsListening(false); // Désactive le bouton en cas d'erreur
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
            className={`voice-btn ${isListening ? "active" : ""}`} // Ajoute une classe active
            onClick={handleVoiceInput}
            disabled={isListening} // Désactive le bouton pendant l'écoute
          >
            <i className="bi bi-mic"></i>
          </button>
        </div>
        <div className="create-post">
          <Link to="/explore" className="create-post-btn">
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