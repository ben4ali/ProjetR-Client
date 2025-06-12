import { Projet } from "../../types/Projet";
import { ProfilPost } from "./ProfilPost";

interface ProfilBodyProps {
  projets: Projet[];
}

export const ProfilBody = ({ projets }: ProfilBodyProps) => {
  return (
    <div className="min-h-[10rem] py-8 w-[95%] md:w-[90%] bg-gray-300 rounded-b-lg">
      {projets.length > 0 && (
        <div className="grid gap-4 p-4 [grid-template-columns:repeat(auto-fill,minmax(300px,1fr))] md:[grid-template-columns:repeat(auto-fill,minmax(450px,1fr))]">
          {projets.map((projet, index) => (
            <ProfilPost projet={projet} key={index} />
          ))}
        </div>
      )}
      {projets.length === 0 && (
        <div className="flex items-center justify-center w-full h-full text-center">
          <p className="text-2xl text-black/50">Aucune publication trouvée.</p>
        </div>
      )}
    </div>
  );
};
