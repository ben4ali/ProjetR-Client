import React from "react";

export const FilterBar = () => {
  const filters = [
    "Programmation",
    "Développement Web",
    "Application Mobile",
    "Application Native",
    "Jeux vidéos",
    "Objet connecté",
    "Java",
    "Python",
  ];

  return (
    <div className="filter-content">
      <div className="filter-holder">
        <div className="filterOverlayBegin"></div>
        <div className="filterOverlay"></div>
        <div className="filter-scroller">
          {filters.map((filter, index) => (
            <div className="filter" key={index}>
              <p>{filter}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="filter-control">
        <button className="filter-btn">
          <i className="bi bi-filter"></i>
          <p>Filtrer</p>
        </button>
      </div>
    </div>
  );
};
