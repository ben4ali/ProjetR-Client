import { useEffect, useMemo, useState } from "react";
import default_profil from "../../assets/images/default_profil.png";
import { useUserByFullName } from "../../hooks/use-users";
import { Projet } from "../../types/Projet";
import { AnimatedTooltip } from "../ui/animated-tooltip";

interface ContributorsProps {
  projet: Projet | null;
}

interface ContributorItem {
  id: number;
  name: string;
  image: string;
}

export const Contributors = ({ projet }: ContributorsProps) => {
  const [items, setItems] = useState<ContributorItem[]>([]);
  const [idx, setIdx] = useState(0);
  const [current, setCurrent] = useState<{
    firstName: string;
    lastName: string;
  } | null>(null);

  const collaborators = useMemo(
    () => projet?.collaborators || [],
    [projet?.collaborators],
  );
  const { data: userData, isSuccess } = useUserByFullName(
    current?.firstName,
    current?.lastName,
  );

  /* Boucle pour récupérer chaque collaborateur */
  useEffect(() => {
    if (collaborators.length) {
      setItems([]);
      setIdx(0);
      const [firstName, lastName] = collaborators[0].split(" ");
      if (firstName && lastName) setCurrent({ firstName, lastName });
    }
  }, [collaborators]);

  useEffect(() => {
    if (isSuccess && current && idx < collaborators.length) {
      const fullName = `${current.firstName} ${current.lastName}`;
      if (userData?.[0]) {
        const u = userData[0];
        setItems((p) => [
          ...p,
          {
            id: Number(u.id),
            name: fullName,
            image: u.avatar || default_profil,
          },
        ]);
      } else {
        setItems((p) => [
          ...p,
          { id: -(idx + 1), name: fullName, image: default_profil },
        ]);
      }

      const next = idx + 1;
      setIdx(next);
      if (next < collaborators.length) {
        const [fn, ln] = collaborators[next].split(" ");
        if (fn && ln) {
          setCurrent({ firstName: fn, lastName: ln });
        } else {
          setCurrent(null);
        }
      } else setCurrent(null);
    }
  }, [userData, isSuccess, current, idx, collaborators]);

  return (
    <div className="contributors-container mt-6 flex w-full flex-col">
      <div className="contributors-holder flex w-full flex-wrap items-center gap-4 border-t-2 border-black/10 pt-4 lg:flex-nowrap">
        {/* Enseignant */}
        {projet?.teacher && (
          <div className="teacher-holder flex flex-col gap-2">
            <h3 className="text-lg text-gray-700/80">Enseignant</h3>
            <a className="teacher-card flex h-16 w-full items-center gap-4 rounded-lg border border-[#e4003950] bg-black/5 px-4 shadow-md transition hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-black/10">
              <img
                src={default_profil}
                alt="Profil"
                className="h-12 w-12 rounded-full object-cover transition hover:scale-105"
              />
              <h4 className="text-[1.2rem] text-gray-700/80">
                {projet.teacher}
              </h4>
            </a>
          </div>
        )}

        {/* Contributeurs */}
        {items.length > 0 && (
          <div className="contributor-list-holder flex flex-col gap-2">
            <h3 className="text-lg text-gray-700/80">
              ({items.length}) Contributeurs
            </h3>
            <div className="contributors-list flex h-16 w-full items-center rounded-lg border border-[#e4003950] bg-black/5 px-8 shadow-md transition hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-black/10 hover:shadow-none">
              <div className="inner-container flex w-full items-center">
                <AnimatedTooltip items={items} />
              </div>
            </div>
          </div>
        )}

        {/* Cours et session */}
        {projet && (
          <div className="course-holder flex flex-col gap-1 opacity-80 lg:ml-auto">
            <h3 className="px-4 text-[1.2rem] text-gray-700/80">
              {projet.course ?? ""}
            </h3>
            <h3 className="px-4 text-[1.2rem] text-gray-700/80">
              {projet.session ?? ""}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};
