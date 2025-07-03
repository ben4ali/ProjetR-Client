import { Link } from "react-router-dom";
import { Projet } from "../../types/Projet";
import { useRecommendedProjects } from "../../hooks/use-project";

interface VideoSuggestionProps {
  projet: Projet | null;
}

export const VideoSuggestion = ({ projet }: VideoSuggestionProps) => {
  const { data: recommendedProjects, isLoading } = useRecommendedProjects(
    projet?.tags,
  );

  // Filtrer le projet courant
  const filteredProjects = recommendedProjects
    ?.filter((p: Projet) => p.id !== projet?.id)
    .slice(0, 10); // max 10 recommandations

  if (isLoading)
    return (
      <div className="video-suggestion-holder">
        Chargement des recommandations…
      </div>
    );

  if (!filteredProjects?.length)
    return (
      <div className="video-suggestion-holder">
        <div className="no-recommendations">
          Aucune recommandation disponible pour le moment.
        </div>
      </div>
    );

  return (
    <div className="video-suggestion-holder mt-8 flex w-full flex-col gap-2 lg:mt-0 lg:h-[100rem] lg:w-[30%]">
      {filteredProjects.map((p: Projet) => {
        const date = new Date(p.createdAt).toLocaleDateString("fr-CA");

        return (
          <Link
            key={p.id}
            to={`/watch/${p.id}`}
            className="video-suggestion flex flex-col items-start rounded-lg p-1 transition hover:bg-black/10 lg:flex-row"
          >
            <video
              src={p.demoUrl || "https://wallpapercave.com/wp/wp4877950.jpg"}
              className="h-28 w-full rounded-lg object-cover lg:mr-4 lg:w-48"
            />

            <div className="video-suggestion-info flex w-full flex-col gap-2 pt-2 lg:pt-1">
              <h4 className="text-[1.35rem] text-gray-700/80">{p.title}</h4>
              <p className="text-gray-600">{p.author.username}</p>

              <div className="video-suggestion-data mt-auto mb-2 flex items-center gap-2 text-sm opacity-70 lg:mb-0">
                <p>{p.views} Visionnements</p>
                <p>{date}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
