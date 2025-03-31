import React from "react";
import { ProfilStats } from "./ProfilStats";

interface ProfilContentProps {
  firstName: string;
  lastName: string;
  pseudo: string;
}

export const ProfilContent : React.FC<ProfilContentProps> = ({
  firstName,
  lastName,
  pseudo,
}) => {
  return (
    <div className="profil-content">
      <div className="profil-info">
        <h1>{firstName} {lastName}</h1>
        <p>@{pseudo}</p>
      </div>
      <ProfilStats />
    </div>
  );
};