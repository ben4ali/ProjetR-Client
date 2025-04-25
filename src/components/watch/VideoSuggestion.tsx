import React from "react";
import { Link } from "react-router-dom";
import { Projet } from "../../types/Projet";
import { useRecommendedProjects } from "../../hooks/use-project";

interface VideoSuggestionProps {
  projet: Projet | null;
}

export const VideoSuggestion = ({ projet }: VideoSuggestionProps) => {
  const { data: recommendedProjects, isLoading } = useRecommendedProjects(projet?.tags);
  
  // Filtrer le projet actuel des recommandations
  const filteredProjects = recommendedProjects?.filter(
    (p: Projet) => p.id !== projet?.id
  ).slice(0, 10); // Limiter à 10 recommandations

  if (isLoading) return <div className="video-suggestion-holder">Chargement des recommandations...</div>;
  
  if (!filteredProjects || filteredProjects.length === 0) {
    return (
      <div className="video-suggestion-holder">
        <div className="no-recommendations">
          Aucune recommandation disponible pour le moment.
        </div>
      </div>
    );
  }

  return (
    <div className="video-suggestion-holder">
      {filteredProjects.map((recommendedProject: Projet) => {
        const formattedDate = new Date(recommendedProject.createdAt).toLocaleDateString("fr-CA");
        
        return (
          <Link 
            key={recommendedProject.id} 
            to={`/watch/${recommendedProject.id}`} 
            className="video-suggestion"
          >
            <video 
              src={recommendedProject.demoUrl || "https://wallpapercave.com/wp/wp4877950.jpg"} 
              alt={recommendedProject.title} 
            />
            <div className="video-suggestion-info">
              <h4>{recommendedProject.title}</h4>
              <p>{recommendedProject.author.username}</p>
              <div className="video-suggestion-data">
                <p>{recommendedProject.views} Visionnements</p>
                <p>{formattedDate}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};