import React from "react";
import { Projet } from "../../types/Projet";

interface VideoLinksProps {
  projet: Projet | null;
}

export const VideoLinks = ({ projet }: VideoLinksProps) => {
  const lienGithub = projet?.githubUrl;
  const lienGitlab = projet?.gitLabUrl;
  console.log(projet);
  return (
    <div className="link-holder">
      {lienGithub && (
        <div className="git-link">
          <div className="link-header">
            <h3>Lien GitHub</h3>
            <p>Consulter le code source du projet</p>
          </div>
          <a target="blank" href={lienGithub} className="github-button">
            <i className="bi bi-github"></i>
            <p>Voir sur GitHub</p>
          </a>
        </div>
      )}

      {lienGitlab && (
        <div className="git-link">
          <div className="link-header">
            <h3>Lien GitLab</h3>
            <p>Consulter le code source du projet</p>
          </div>
          <a target="blank" href={lienGitlab} className="gitlab-button">
            <i className="bi bi-gitlab"></i>
            <p>Voir sur GitLab</p>
          </a>
        </div>
      )}
    </div>
  );
};
