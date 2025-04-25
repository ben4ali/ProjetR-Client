import React, { useState, useEffect } from "react";
import { useProjectsByTagsList } from "../../hooks/use-project";
import { Projet } from "../../types/Projet";
import { useTags } from "../../hooks/use-tags";
import { Tag } from "../../types/Tag";
import { useAllProjects } from "../../hooks/use-project";

interface FilterBarProps {
  onFilterResults: (projects: Projet[]) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ onFilterResults }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { data: allProjects } = useAllProjects();
  const { data: tags, isLoading: isLoadingTags } = useTags();

  const { data: filteredProjects, isLoading } =
    useProjectsByTagsList(selectedTags);

  useEffect(() => {
    if (isLoading) return;

    if (selectedTags.length === 0) {
      onFilterResults([]);
    } else if (filteredProjects) {
      onFilterResults(filteredProjects);
    }
  }, [filteredProjects, isLoading, selectedTags]);

  const handleTagClick = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
    onFilterResults([]);
  };

  return (
    <div className="filter-content">
      <div className="filter-holder">
        <div className="filterOverlayBegin"></div>
        <div className="filterOverlay"></div>
        <div className="filter-scroller">
          {tags &&
            tags.map((tag: Tag, index) => (
              <div
                className={`filter ${
                  selectedTags.includes(tag.name) ? "tagSelectedExplore" : ""
                }`}
                key={tag.id}
                onClick={() => handleTagClick(tag.name)}
              >
                <p>{tag.name}</p>
                {selectedTags.includes(tag.name) && (
                  <i className="bi bi-check"></i>
                )}
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
