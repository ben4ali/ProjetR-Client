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
import { useApi } from "../hooks/useApi";
import { useAuth } from "../hooks/useAuth";
import { User } from "../types/User";
import { Projet } from "../types/Projet";

export const Watch = () => {
  const url = window.location.href;
  const id = url.substring(url.lastIndexOf("/") + 1);

  //projet
  const { data: projet, isLoading: isProjetLoading, request: fetchProjet } = useApi<Projet>();
  const { request: incrementViewCount } = useApi<void>();

  useEffect(() => {
    if (id) {
      fetchProjet("get", `http://localhost:5000/api/v1/projects/${id}`);
      incrementViewCount("put", `http://localhost:5000/api/v1/projects/view/${id}`).catch((err) => {
        console.error("Failed to increment view count:", err);
      });
    }
  }, [id]);

  if (isProjetLoading) return <p>Loading...</p>;
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
