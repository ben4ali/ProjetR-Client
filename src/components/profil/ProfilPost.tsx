import React from "react";
import { Projet } from "../../types/Projet";
import { Link } from "react-router-dom";

interface ProfilPostProps {
  projet : Projet;
}
export const ProfilPost = (
  { projet }: ProfilPostProps
) => {
  return (
  <Link to={`/watch/${projet.id}`} className="profil-post">
    <h1>{projet.title}</h1>
    <video>
      <source src={projet.demoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </Link>
  );
};