import React from "react";
import RotatingText from "../../blocks/TextAnimations/RotatingText/RotatingText";
import Squares from "../../blocks/Backgrounds/Squares/Squares";
import CircularGallery from "../../blocks/Components/CircularGallery/CircularGallery";

export const MembersComponent = () => {
  return (
    <div className="membres-holder">
      <div className="squareBackground">
        <Squares
          speed={0.15}
          squareSize={70}
          direction="diagonal"
          borderColor="rgb(0,0,0,0.2)"
          hoverFillColor="rgb(0,0,0,0.2)"
        />
      </div>
      <div id="titleSection">
        <h2>Des étudiants</h2>
        <RotatingText
          texts={["Intuitifs", "Motivés", "Curieux", "Créatifs"]}
          mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
          staggerFrom={"last"}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.025}
          splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={3000}
        />
      </div>
      <div className="membres-carousel">
        <CircularGallery bend={3} textColor="rgb(0,0,0)" borderRadius={0.015} />
      </div>
    </div>
  );
};
