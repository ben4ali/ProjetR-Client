import React, { useState, useEffect } from "react";
import { useProjectsByTagsList } from "../../hooks/use-project";
import { Projet } from "../../types/Projet";
import { useTags } from "../../hooks/use-tags";
import { Tag } from "../../types/Tag";

interface FilterBarProps {
  onFilterResults: (projects: Projet[], isSearching: boolean) => void;
  onOpenFilterModal: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  onFilterResults,
  onOpenFilterModal,
}) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const { data: tags, isLoading: isLoadingTags } = useTags();

  const { data: filteredProjects, isLoading } =
    useProjectsByTagsList(selectedTags);

  useEffect(() => {
    if (isLoading) return;

    if (selectedTags.length === 0) {
      onFilterResults([], false);
    } else if (filteredProjects) {
      onFilterResults(filteredProjects, true);
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
    onFilterResults([], false);
  };

  return (
    <div className="filter-content">
      <div className="filter-holder">
        <div className="filterOverlayBegin"></div>
        <div className="filterOverlay"></div>
        <div
          className={`filter-scroller ${isHovering ? "hovering" : ""}`}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {tags &&
            tags.map((tag: Tag) => (
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
        <button className="filter-btn" onClick={onOpenFilterModal}>
          <i className="bi bi-filter"></i>
          <p>Filtrer</p>
        </button>
      </div>
    </div>
  );
};
