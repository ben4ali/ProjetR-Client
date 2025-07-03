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
      className={`video-description relative mt-4 flex max-h-[15rem] min-h-[10rem] w-full flex-col gap-6 overflow-hidden rounded-lg p-4 transition-all ${isExpanded ? "expanded-desc max-h-none overflow-visible" : ""}`}
    >
      <div className="video-description-header z-10 flex items-center justify-between font-semibold">
        <p className="text-sm text-gray-600">{projet?.views} Visionnements</p>

        <button
          className="see-more px-4 py-2 text-pink-600 underline hover:text-pink-400"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Voir moins" : "Voir plus"}
        </button>
      </div>

      {description && (
        <div className="description relative text-lg leading-relaxed">
          {!isExpanded && (
            <div className="desc-fade-in absolute bottom-0 left-0 h-32 w-full rounded-lg bg-gradient-to-t from-white to-transparent" />
          )}
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};
