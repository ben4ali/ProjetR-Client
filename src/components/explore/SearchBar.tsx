import React from "react";
import { Link } from "react-router-dom";
import { FilterBar } from "./FilterBar";

export const SearchBar = () => {
  return (
    <div className="search-container">
      <div className="explore-search-holder">
        <div className="explore-search">
          <input type="text" placeholder="Rechercher..." />
          <button className="search-btn">
            <i className="bi bi-search"></i>
          </button>
          <button className="voice-btn">
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
      <FilterBar />
    </div>
  );
};