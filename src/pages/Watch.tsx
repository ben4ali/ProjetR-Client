import { useEffect } from "react";
// import "../styles/style-watch.css"; 👉 supprimé
import { useParams } from "react-router-dom";
import { CommentSection } from "../components/watch/CommentSection";
import { Contributors } from "../components/watch/Contributors";
import { VideoDescription } from "../components/watch/VideoDescription";
import { VideoInfo } from "../components/watch/VideoInfo";
import { VideoLinks } from "../components/watch/VideoLinks";
import { VideoOptions } from "../components/watch/VideoOptions";
import { VideoPlayer } from "../components/watch/VideoPlayer";
import { VideoSuggestion } from "../components/watch/VideoSuggestion";
import { useIncrementViewCount, useProjectById } from "../hooks/use-project";

export const Watch = () => {
  const { id } = useParams<{ id: string }>();

  const { data: projet, isLoading, error } = useProjectById(id);
  const incrementViewMutation = useIncrementViewCount();

  useEffect(() => {
    if (id) incrementViewMutation.mutate(id);
  }, [id]);

  if (isLoading) return <p>Chargement en cours…</p>;
  if (error) return <p>Erreur : {error.message}</p>;
  if (!projet) return <p>Projet non trouvé</p>;

  return (
    <div className="watch-container flex flex-col items-center">
      <div
        className="watch-content flex flex-col gap-4  w-[95%] h-auto
                       lg:flex-row mt-10 lg:w-[90%] lg:h-[80vh]"
      >
        <section
          className="video-section-container w-full h-auto
                             lg:w-[70%] lg:h-[100rem]"
        >
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
