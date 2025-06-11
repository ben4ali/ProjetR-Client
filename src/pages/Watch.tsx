import { useEffect } from "react";
// import "../styles/style-watch.css"; 👉 supprimé
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
    if (id) incrementViewMutation.mutate(id);
  }, [id]);

  if (isLoading) return <p>Chargement en cours…</p>;
  if (error) return <p>Erreur : {error.message}</p>;
  if (!projet) return <p>Projet non trouvé</p>;

  return (
    <div className="watch-container flex flex-col items-center">
      <div
        className="watch-content flex flex-col gap-4 mt-[25%] w-[95%] h-auto
                       lg:flex-row lg:mt-[7%] lg:w-[90%] lg:h-[80vh]"
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
