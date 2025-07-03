import { Projet } from "../../types/Projet";

interface VideoLinksProps {
  projet: Projet | null;
}

export const VideoLinks = ({ projet }: VideoLinksProps) => {
  const github = projet?.githubUrl;
  const gitlab = projet?.gitLabUrl;

  return (
    <div className="link-holder mt-8 flex w-full flex-col gap-4">
      {github && (
        <div className="git-link flex h-24 w-full items-center justify-between gap-4 rounded-lg bg-black/5 px-4">
          <div className="link-header flex flex-col justify-between">
            <h3 className="text-[1.3rem] font-semibold text-neutral-900/90">
              Lien GitHub
            </h3>
            <p className="text-sm text-gray-600">
              Consulter le code source du projet
            </p>
          </div>

          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="github-button flex items-center gap-2 rounded bg-black px-4 py-3 text-lg text-white transition hover:bg-black/80"
          >
            <i className="bi bi-github" />
            <p>Voir sur GitHub</p>
          </a>
        </div>
      )}

      {gitlab && (
        <div className="git-link flex h-24 w-full items-center justify-between gap-4 rounded-lg bg-black/5 px-4">
          <div className="link-header flex flex-col justify-between">
            <h3 className="text-[1.3rem] font-semibold text-neutral-900/90">
              Lien GitLab
            </h3>
            <p className="text-sm text-gray-600">
              Consulter le code source du projet
            </p>
          </div>

          <a
            href={gitlab}
            target="_blank"
            rel="noreferrer"
            className="gitlab-button flex items-center gap-2 rounded bg-[#ff6d41] px-4 py-3 text-lg text-white transition hover:bg-[#ff6d41cc]"
          >
            <i className="bi bi-gitlab" />
            <p>Voir sur GitLab</p>
          </a>
        </div>
      )}
    </div>
  );
};
