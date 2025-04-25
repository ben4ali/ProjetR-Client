import React, { useEffect } from "react";
import "../styles/style-watch.css";
import { VideoPlayer } from "../components/watch/VideoPlayer";
import { VideoInfo } from "../components/watch/VideoInfo";
import { VideoOptions } from "../components/watch/VideoOptions";
import { VideoDescription } from "../components/watch/VideoDescription";
import { CommentSection } from "../components/watch/CommentSection";
import { VideoSuggestion } from "../components/watch/VideoSuggestion";
import { VideoLinks } from "../components/watch/VideoLinks";
import { Contributors } from "../components/watch/Contributors";
import { useProjectById, useIncrementViewCount } from "../hooks/use-project";
import { useParams } from "react-router-dom";

export const Watch = () => {
  const { id } = useParams<{ id: string }>();

  const { data: projet, isLoading, error } = useProjectById(id);

  const incrementViewMutation = useIncrementViewCount();

  useEffect(() => {
    if (id) {
      incrementViewMutation.mutate(id);
    }
  }, [id]);

  if (isLoading) return <p>Chargement en cours...</p>;
  if (error) return <p>Erreur de chargement: {error.message}</p>;
  if (!projet) return <p>Projet non trouvé</p>;

  return (
    <div className="watch-container">
      <div className="watch-content">
        <section className="video-section-container">
          <VideoPlayer projet={projet} />
          <VideoInfo projet={projet} />
          <VideoOptions projet={projet} />
          <VideoDescription projet={projet} />
          <Contributors projet={projet} />
          <VideoLinks projet={projet} />
          <CommentSection projet={projet} />
        </section>
        <VideoSuggestion projet={projet} />
      </div>
    </div>
  );
};
