import React from "react";
import "../styles/style-watch.css";
import { VideoPlayer } from "../components/watch/VideoPlayer";
import { VideoInfo } from "../components/watch/VideoInfo";
import { VideoOptions } from "../components/watch/VideoOptions";
import { VideoDescription } from "../components/watch/VideoDescription";
import { CommentSection } from "../components/watch/CommentSection";
import { VideoSuggestion } from "../components/watch/VideoSuggestion";
import { VideoLinks } from "../components/watch/VideoLinks";
import { Contributors } from "../components/watch/Contributors";

export const Watch = () => {
  return (
    <div className="watch-container">
      <div className="watch-content">
        <section className="video-section-container">
          <VideoPlayer />
          <VideoInfo />
          <VideoOptions />
          <VideoDescription />
          <Contributors />
          <VideoLinks />
          <CommentSection />
        </section>
        <VideoSuggestion />
      </div>
    </div>
  );
};
