import React, { useMemo, useEffect, useState } from "react";
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
  const [contributorItems, setContributorItems] = useState<ContributorItem[]>(
    []
  );
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentContributor, setCurrentContributor] = useState<{
    firstName: string;
    lastName: string;
  } | null>(null);

  const collaborators = useMemo(() => {
    return projet?.collaborators || [];
  }, [projet?.collaborators]);

  const { data: userData, isSuccess } = useUserByFullName(
    currentContributor?.firstName,
    currentContributor?.lastName
  );

  useEffect(() => {
    if (collaborators.length > 0) {
      setContributorItems([]);
      setCurrentIndex(0);

      if (collaborators[0]) {
        const [firstName, lastName] = collaborators[0].split(" ");
        if (firstName && lastName) {
          setCurrentContributor({ firstName, lastName });
        }
      }
    }
  }, [collaborators]);

  useEffect(() => {
    if (
      isSuccess &&
      currentContributor &&
      currentIndex < collaborators.length
    ) {
      const fullName = `${currentContributor.firstName} ${currentContributor.lastName}`;

      if (userData && userData.length > 0) {
        const user = userData[0];
        setContributorItems((prev) => [
          ...prev,
          {
            id: user.id,
            name: fullName,
            image: user.avatar || default_profil,
          },
        ]);
      } else {
        setContributorItems((prev) => [
          ...prev,
          {
            id: -(currentIndex + 1),
            name: fullName,
            image: default_profil,
          },
        ]);
      }

      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);

      if (nextIndex < collaborators.length) {
        const [firstName, lastName] = collaborators[nextIndex].split(" ");
        if (firstName && lastName) {
          setCurrentContributor({ firstName, lastName });
        } else {
          setCurrentContributor(null);
        }
      } else {
        setCurrentContributor(null);
      }
    }
  }, [userData, isSuccess, currentContributor, currentIndex, collaborators]);

  return (
    <div className="contributors-container">
      <div className="contributors-holder">
        {projet?.teacher && (
          <div className="teacher-holder">
            <h3>Enseignant</h3>
            <a className="teacher-card">
              <img src={default_profil} alt="Profil picture" />
              <h4>{projet?.teacher}</h4>
            </a>
          </div>
        )}

        {contributorItems.length > 0 && (
          <div className="contributor-list-holder">
            <h3>({contributorItems.length}) Contributeurs</h3>
            <div className="contributors-list">
              <div className="inner-container">
                <AnimatedTooltip items={contributorItems} />
              </div>
            </div>
          </div>
        )}

        {projet && (
          <div className="course-holder">
            <h3>{projet?.course ?? ""}</h3>
            <h3>{projet?.session ?? ""}</h3>
          </div>
        )}
      </div>
    </div>
  );
};
