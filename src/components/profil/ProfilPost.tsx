import { Projet } from "../../types/Projet";
import { Link } from "react-router-dom";

interface ProfilPostProps {
  projet: Projet;
}

export const ProfilPost = ({ projet }: ProfilPostProps) => {
  return (
    <Link
      to={`/watch/${projet.id}`}
      className="group relative flex h-48 cursor-pointer flex-col overflow-hidden rounded-[15px] bg-black shadow-[1px_1px_15px_5px_rgba(0,0,0,0.4)] transition duration-300 hover:-translate-y-1 hover:shadow-[0px_10px_15px_2px_rgba(0,0,0,0.4)] md:h-72"
    >
      <h1 className="absolute right-0 bottom-0 left-0 z-10 p-4 text-sm text-white drop-shadow-lg md:text-base">
        {projet.title}
      </h1>

      <div className="absolute inset-0 z-[5] bg-gradient-to-tr from-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-0" />

      <video className="h-full w-full scale-[1.025] rounded-[15px] object-cover transition-transform duration-300 group-hover:scale-100">
        <source src={projet.demoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Link>
  );
};
