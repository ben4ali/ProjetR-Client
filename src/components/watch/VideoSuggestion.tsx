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
    <div
      className="video-suggestion-holder flex flex-col gap-2 w-full mt-8
                 lg:w-[30%] lg:mt-0 lg:h-[100rem]"
    >
      {filteredProjects.map((p: Projet) => {
        const date = new Date(p.createdAt).toLocaleDateString("fr-CA");

        return (
          <Link
            key={p.id}
            to={`/watch/${p.id}`}
            className="video-suggestion flex flex-col items-start p-1 rounded-lg
                       hover:bg-black/10 transition
                       lg:flex-row"
          >
            <video
              src={p.demoUrl || "https://wallpapercave.com/wp/wp4877950.jpg"}
              className="h-28 w-full object-cover rounded-lg
                         lg:w-48 lg:mr-4"
            />

            <div
              className="video-suggestion-info flex flex-col gap-2 pt-2
                         lg:pt-1 w-full"
            >
              <h4 className="text-[1.35rem] text-gray-700/80">{p.title}</h4>
              <p className="text-gray-600">{p.author.username}</p>

              <div className="video-suggestion-data flex items-center gap-2 text-sm opacity-70 mt-auto mb-2 lg:mb-0">
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
