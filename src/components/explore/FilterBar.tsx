import React, { useEffect, useState } from "react";
import { useProjectsByTagsList } from "../../hooks/use-project";
import { useTags } from "../../hooks/use-tags";
import { Projet } from "../../types/Projet";
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
  const [, setIsHovering] = useState(false);
  const { data: tags } = useTags();

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
        : [...prevTags, tag],
    );
  };

  return (
    <div className="relative flex w-full justify-between gap-4">
      <div className="relative flex w-[80%] gap-4 md:w-[56.5%]">
        <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-[10%] rounded bg-gradient-to-l from-transparent to-white"></div>
        <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-[10%] rounded bg-gradient-to-r from-transparent to-white"></div>
        <div
          className={`scrollbar-none relative flex h-full min-h-16 gap-4 overflow-x-scroll pr-16 pl-8`}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {tags &&
            tags.map((tag: Tag) => (
              <div
                className={`flex max-h-12 flex-shrink-0 cursor-pointer items-center justify-between rounded px-4 py-2 text-neutral-700/80 transition-colors ${
                  selectedTags.includes(tag.name)
                    ? "bg-[#3b4494] text-white"
                    : "bg-neutral-100"
                } hover:bg-[#3b4494] hover:text-white`}
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
      <div className="flex max-h-11 w-12 cursor-pointer items-center justify-center gap-4 rounded-full border border-[#e4003a] transition-colors hover:bg-[#e4003a] hover:text-white md:w-40">
        <button
          className="flex w-full cursor-pointer items-center justify-center gap-4 rounded-full py-2 text-xl text-[#e4003a] transition-colors hover:text-white"
          onClick={onOpenFilterModal}
        >
          <i className="bi bi-filter shrink-0 text-xl"></i>
          <span className="hidden md:inline">Filtrer</span>
        </button>
      </div>
    </div>
  );
};
