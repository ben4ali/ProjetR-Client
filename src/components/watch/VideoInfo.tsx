import { Projet } from "../../types/Projet";

interface VideoInfoProps {
  projet: Projet | null;
}

export const VideoInfo = ({ projet }: VideoInfoProps) => {
  return (
    <div className="video-info mt-3 flex flex-col items-start">
      <h2 className="my-2 w-full text-[1.9rem] font-semibold text-gray-800/90">
        {projet?.title}
      </h2>

      <ul className="tag-list mt-2 mb-4 flex flex-wrap items-center gap-4">
        {projet?.tags?.map((tag) => (
          <li
            key={tag}
            className="video-tag flex-shrink-0 rounded bg-[rgba(53,60,124,0.9)] px-4 py-2 text-base text-white"
          >
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
};
