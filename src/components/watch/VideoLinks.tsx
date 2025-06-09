import { Projet } from "../../types/Projet";

interface VideoLinksProps {
  projet: Projet | null;
}

export const VideoLinks = ({ projet }: VideoLinksProps) => {
  const github = projet?.githubUrl;
  const gitlab = projet?.gitLabUrl;

  return (
    <div className="link-holder flex flex-col gap-4 mt-8 w-full">
      {github && (
        <div className="git-link flex items-center justify-between gap-4 h-24 w-full
                         bg-black/5 rounded-lg px-4">
          <div className="link-header flex flex-col justify-between">
            <h3 className="text-[1.3rem] font-semibold text-neutral-900/90">Lien GitHub</h3>
            <p className="text-sm text-gray-600">Consulter le code source du projet</p>
          </div>

          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="github-button flex items-center gap-2 text-lg bg-black text-white
                       px-4 py-3 rounded hover:bg-black/80 transition"
          >
            <i className="bi bi-github" />
            <p>Voir sur GitHub</p>
          </a>
        </div>
      )}

      {gitlab && (
        <div className="git-link flex items-center justify-between gap-4 h-24 w-full
                         bg-black/5 rounded-lg px-4">
          <div className="link-header flex flex-col justify-between">
            <h3 className="text-[1.3rem] font-semibold text-neutral-900/90">Lien GitLab</h3>
            <p className="text-sm text-gray-600">Consulter le code source du projet</p>
          </div>

          <a
            href={gitlab}
            target="_blank"
            rel="noreferrer"
            className="gitlab-button flex items-center gap-2 text-lg bg-[#ff6d41] text-white
                       px-4 py-3 rounded hover:bg-[#ff6d41cc] transition"
          >
            <i className="bi bi-gitlab" />
            <p>Voir sur GitLab</p>
          </a>
        </div>
      )}
    </div>
  );
};
