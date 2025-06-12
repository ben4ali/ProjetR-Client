import { Projet } from '../../types/Projet';

export const ProfilStats = ({ projets }: { projets: Projet[] }) => {
  const nbPublications = projets.length;
  const nbVues = projets.reduce((acc, p) => acc + (p.views || 0), 0);
  const nbLikes = projets.reduce((acc, p) => acc + (p.likes || 0), 0);
  return (
    <div className="mt-6 flex items-center gap-4 md:gap-8 mb-8 md:mb-0">
      <p className="text-base md:text-lg opacity-40 m-0">
        {nbPublications} PUBLICATIONS
      </p>
      <p className="text-base md:text-lg opacity-40 m-0">{nbVues} VUES</p>
      <p className="text-base md:text-lg opacity-40 m-0">
        {nbLikes} J&apos;AIMES
      </p>
    </div>
  );
};
