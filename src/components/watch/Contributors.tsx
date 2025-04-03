"use client";

import React, { useEffect, useState } from "react";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { Projet } from "../../types/Projet";
import default_profil from "../../assets/images/default_profil.png";

import { useApi } from "../../hooks/useApi";

interface ContributorsProps {
  projet: Projet | null;
}

interface ContributorItem {
  id: number;
  name: string;
  image: string;
}

export const Contributors = ({ projet }: ContributorsProps) => {
  const [contributors, setContributors] = useState<ContributorItem[]>([]);
  const { request } = useApi<unknown[]>();

  useEffect(() => {
    const fetchContributors = async () => {
      if (projet?.collaborators) {

        const contributorPromises = projet.collaborators.map(async (contributor) => {
          const [contributorFirstName, contributorLastName] = contributor.split(" ");

          try {
            console.log(`Fetching contributor: ${contributorFirstName} ${contributorLastName}`);
            const data = await request(
              "get",
              `http://localhost:5000/api/v1/users/name/${contributorFirstName}/${contributorLastName}`
            );

            if (data && data.length > 0) {
              const user = data[0];
              return {
                id: user.id,
                name: `${user.firstName} ${user.lastName}`,
                image: user.avatar || default_profil,
              } as ContributorItem;
            } else {
                return {
                  id: -projet.collaborators.indexOf(contributor) - 1,
                  name: `${contributorFirstName} ${contributorLastName}`,
                  image: default_profil,
                } as ContributorItem;
            }
          } catch (error) {
            console.error("Error fetching contributor data:", error);
          }
          return null;
        });

        const contributorsData = await Promise.all(contributorPromises);
        const filteredContributors = contributorsData.filter((contributor) => contributor !== null) as ContributorItem[];
        setContributors(filteredContributors);
      } else {
        console.log("No contributors to fetch.");
      }
    };

    fetchContributors();
  }, [projet]);

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

        {contributors.length > 0 && (
          <div className="contributor-list-holder">
            <h3>({contributors.length}) Contributeurs</h3>
            <div className="contributors-list">
              <div className="inner-container">
                <AnimatedTooltip items={contributors} />
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