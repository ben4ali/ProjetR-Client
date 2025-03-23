import React from "react";
import "../styles/style-profil.css";
import { ProfilHeader } from "../components/profil/ProfilHeader";
import { ProfilBody } from "../components/profil/ProfilBody";

export const Profil = () => {
  return (
    <div className="profil-container">
      <ProfilHeader />
      <ProfilBody />
    </div>
  );
};