import React from "react";
import { ProfilPost } from "./ProfilPost";
import { Projet } from "../../types/Projet";

interface ProfilBodyProps {
  projets: Projet[];
}

export const ProfilBody = ({ projets }: ProfilBodyProps) => {
  return (
    <div className="profil-body">
      {projets.length > 0 && (
        <div className="profil-post-holder">
          {projets.map((projet, index) => (
            <ProfilPost projet={projet} key={index} />
          ))}
        </div>
      )}
      {projets.length === 0 && (
        <div className="no-posts">
          <p>Aucune publication trouvée.</p>
        </div>
      )}
    </div>
  );
};
