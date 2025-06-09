import { Projet } from "../../types/Projet";

interface VideoInfoProps {
  projet: Projet | null;
}

export const VideoInfo = ({ projet }: VideoInfoProps) => {
  return (
    <div className="video-info mt-3 flex flex-col items-start">
      <h2 className="text-[1.9rem] font-semibold text-gray-800/90 w-full my-2">
        {projet?.title}
      </h2>

      <ul className="tag-list flex flex-wrap items-center gap-4 mt-2 mb-4">
        {projet?.tags?.map((tag) => (
          <li
            key={tag}
            className="video-tag flex-shrink-0 bg-black/10 px-4 py-2 rounded text-gray-700/80 text-base"
          >
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
};
