import React, { useEffect, useState } from 'react';
import { useProjectsByTagsList } from '../../hooks/use-project';
import { useTags } from '../../hooks/use-tags';
import { Projet } from '../../types/Projet';
import { Tag } from '../../types/Tag';

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
    setSelectedTags(prevTags =>
      prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag]
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
    onFilterResults([], false);
  };

  return (
    <div className="flex w-full gap-4 relative justify-between">
      <div className="flex w-[80%] gap-4 relative md:w-[56.5%]">
        <div className="absolute left-0 top-0 h-full w-[10%] z-10 pointer-events-none rounded bg-gradient-to-l from-transparent to-white"></div>
        <div className="absolute right-0 top-0 h-full w-[10%] z-10 pointer-events-none rounded bg-gradient-to-r from-transparent to-white"></div>
        <div
          className={`flex gap-4 relative pl-8 pr-16 h-full min-h-16 overflow-x-scroll scrollbar-none`}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {tags &&
            tags.map((tag: Tag) => (
              <div
                className={`flex items-center justify-between flex-shrink-0 bg-neutral-100 text-neutral-700/80 px-4 py-2 rounded transition-colors cursor-pointer max-h-12 ${
                  selectedTags.includes(tag.name)
                    ? 'bg-neutral-900 text-white'
                    : ''
                } hover:bg-neutral-900 hover:text-white`}
                key={tag.id}
                onClick={() => handleTagClick(tag.name)}
              >
                <p>{tag.name}</p>
                {selectedTags.includes(tag.name) && (
                  <i className="bi bi-check ml-4"></i>
                )}
              </div>
            ))}
        </div>
      </div>
      <div className="flex gap-4 items-center justify-center w-12 rounded-full bg-neutral-100 cursor-pointer transition-colors hover:bg-neutral-900 hover:text-white md:w-40">
        <button
          className="flex items-center justify-center h-12 rounded-full text-xl w-full gap-4 text-neutral-700 cursor-pointer transition-colors hover:text-white"
          onClick={onOpenFilterModal}
        >
          <i className="bi bi-filter text-xl"></i>
          <span className="hidden md:inline">Filtrer</span>
        </button>
      </div>
    </div>
  );
};
