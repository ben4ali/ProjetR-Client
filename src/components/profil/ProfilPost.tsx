import { Projet } from "../../types/Projet";
import { Link } from "react-router-dom";

interface ProfilPostProps {
  projet: Projet;
}

export const ProfilPost = ({ projet }: ProfilPostProps) => {
  return (
    <Link
      to={`/watch/${projet.id}`}
      className="relative flex flex-col h-48 md:h-72 bg-black rounded-[15px] overflow-hidden cursor-pointer transition duration-300 shadow-[1px_1px_15px_5px_rgba(0,0,0,0.4)] hover:-translate-y-1 hover:shadow-[0px_10px_15px_2px_rgba(0,0,0,0.4)] group"
    >
      <h1 className="absolute bottom-0 left-0 right-0 text-white text-sm md:text-base p-4 drop-shadow-lg z-10">
        {projet.title}
      </h1>

      <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-0 z-[5]" />

      <video className="w-full h-full object-cover rounded-[15px] scale-[1.025] transition-transform duration-300 group-hover:scale-100">
        <source src={projet.demoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Link>
  );
};
