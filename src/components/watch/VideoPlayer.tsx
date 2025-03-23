import React from "react";

export const VideoPlayer = () => {
  return (
    <div className="video-container">
      <video className="video" controls>
        <source src="video.mp4" type="video/mp4" />
      </video>
    </div>
  );
};