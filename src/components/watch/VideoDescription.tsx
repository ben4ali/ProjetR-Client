import { useState } from "react";
import { Projet } from "../../types/Projet";

interface VideoDescriptionProps {
  projet: Projet | null;
}

export const VideoDescription = ({ projet }: VideoDescriptionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const description = projet?.description || "Aucune description disponible.";

  return (
    <div
      className={`video-description relative flex flex-col gap-6 w-full p-4 mt-4 rounded-lg
                  min-h-[10rem] max-h-[15rem] overflow-hidden transition-all
                  ${isExpanded ? "expanded-desc max-h-none overflow-visible" : ""}`}
    >
      <div className="video-description-header flex justify-between items-center font-semibold z-10">
        <p className="text-sm text-gray-600">{projet?.views} Visionnements</p>

        <button
          className="see-more underline text-pink-600 hover:text-pink-400 px-4 py-2"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Voir moins" : "Voir plus"}
        </button>
      </div>

      {description && (
        <div className="description text-lg leading-relaxed relative">
          {!isExpanded && (
            <div className="desc-fade-in absolute bottom-0 left-0 w-full h-32 rounded-lg
                            bg-gradient-to-t from-white to-transparent" />
          )}
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};
