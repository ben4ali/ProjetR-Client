import { useMemo, useEffect, useState } from "react";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { Projet } from "../../types/Projet";
import default_profil from "../../assets/images/default_profil.png";
import { useUserByFullName } from "../../hooks/use-users";

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
  const [current, setCurrent] = useState<{ firstName: string; lastName: string } | null>(
    null
  );

  const collaborators = useMemo(() => projet?.collaborators || [], [projet?.collaborators]);
  const { data: userData, isSuccess } = useUserByFullName(current?.firstName, current?.lastName);

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
        setItems((p) => [...p, { id: Number(u.id), name: fullName, image: u.avatar || default_profil }]);
      } else {
        setItems((p) => [...p, { id: -(idx + 1), name: fullName, image: default_profil }]);
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
    <div className="contributors-container flex flex-col mt-6 w-full">
      <div className="contributors-holder flex items-center gap-4 w-full pt-4
                       border-t-2 border-black/10 flex-wrap lg:flex-nowrap">
        {/* Enseignant */}
        {projet?.teacher && (
          <div className="teacher-holder flex flex-col gap-2">
            <h3 className="text-lg text-gray-700/80">Enseignant</h3>
            <a className="teacher-card flex items-center gap-4 h-16 w-full rounded-lg px-4
                           shadow-md bg-black/5 hover:bg-black/10 hover:translate-x-[3px] hover:translate-y-[3px] transition">
              <img
                src={default_profil}
                alt="Profil"
                className="h-12 w-12 rounded-full object-cover hover:scale-105 transition"
              />
              <h4 className="text-[1.2rem] text-gray-700/80">{projet.teacher}</h4>
            </a>
          </div>
        )}

        {/* Contributeurs */}
        {items.length > 0 && (
          <div className="contributor-list-holder flex flex-col gap-2">
            <h3 className="text-lg text-gray-700/80">({items.length}) Contributeurs</h3>
            <div className="contributors-list flex items-center bg-black/5 shadow-md
                             w-full h-16 rounded-lg px-8 hover:bg-black/10 hover:shadow-none
                             hover:translate-x-[3px] hover:translate-y-[3px] transition">
              <div className="inner-container flex items-center w-full">
                <AnimatedTooltip items={items} />
              </div>
            </div>
          </div>
        )}

        {/* Cours et session */}
        {projet && (
          <div className="course-holder flex flex-col lg:ml-auto opacity-80 gap-1">
            <h3 className="text-[1.2rem] text-gray-700/80 px-4">{projet.course ?? ""}</h3>
            <h3 className="text-[1.2rem] text-gray-700/80 px-4">{projet.session ?? ""}</h3>
          </div>
        )}
      </div>
    </div>
  );
};
