import { Projet } from "../../types/Projet";

export const ProfilStats = ({ projets }: { projets: Projet[] }) => {
  const nbPublications = projets.length;
  const nbVues = projets.reduce((acc, p) => acc + (p.views || 0), 0);
  const nbLikes = projets.reduce((acc, p) => acc + (p.likes || 0), 0);
  return (
    <div className="mt-6 mb-8 ml-10 flex items-center gap-4 md:mb-0 md:gap-8">
      <p className="m-0 text-base opacity-40 md:text-lg">
        {nbPublications} PUBLICATIONS
      </p>
      <p className="m-0 text-base opacity-40 md:text-lg">{nbVues} VUES</p>
      <p className="m-0 text-base opacity-40 md:text-lg">
        {nbLikes} J&apos;AIMES
      </p>
    </div>
  );
};
