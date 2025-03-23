import React from "react";
import { ProfilStats } from "./ProfilStats";

export const ProfilContent = () => {
  return (
    <div className="profil-content">
      <div className="profil-info">
        <h1>Ali Benkarrouch</h1>
        <p>@ben4ali</p>
      </div>
      <ProfilStats />
    </div>
  );
};