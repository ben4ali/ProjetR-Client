import React from "react";

export const VideoLinks = () => {
  return (
    <div className="link-holder">
      <div className="git-link">
        <div className="link-header">
          <h3>Lien GitHub</h3>
          <p>Consulter le code source du projet</p>
        </div>
        <a className="github-button">
          <i className="bi bi-github"></i>
          <p>Voir sur GitHub</p>
        </a>
      </div>
      <div className="git-link">
        <div className="link-header">
          <h3>Lien GitLab</h3>
          <p>Consulter le code source du projet</p>
        </div>
        <a className="gitlab-button">
          <i className="bi bi-gitlab"></i>
          <p>Voir sur GitLab</p>
        </a>
      </div>
    </div>
  );
};
