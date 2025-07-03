import { Projet } from "../../types/Projet";
import { ProfilPost } from "./ProfilPost";

interface ProfilBodyProps {
  projets: Projet[];
}

export const ProfilBody = ({ projets }: ProfilBodyProps) => {
  return (
    <div className="min-h-[10rem] w-[95%] rounded-b-lg bg-gray-300 py-8 md:w-[90%]">
      {projets.length > 0 && (
        <div className="grid [grid-template-columns:repeat(auto-fill,minmax(300px,1fr))] gap-4 p-4 md:[grid-template-columns:repeat(auto-fill,minmax(450px,1fr))]">
          {projets.map((projet, index) => (
            <ProfilPost projet={projet} key={index} />
          ))}
        </div>
      )}
      {projets.length === 0 && (
        <div className="flex h-full w-full items-center justify-center text-center">
          <p className="text-2xl text-black/50">Aucune publication trouvée.</p>
        </div>
      )}
    </div>
  );
};
