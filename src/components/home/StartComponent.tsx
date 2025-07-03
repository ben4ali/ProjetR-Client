import { Link } from "react-router-dom";
import { useRef } from "react";
import VariableProximity from "../../blocks/TextAnimations/VariableProximity/VariableProximity";

export const StartComponent = () => {
  const containerRef = useRef(null);
  return (
    <div ref={containerRef} className="start-container">
      <h2>
        <VariableProximity
          label={"COMMENCER DÈS MAINTENANT."}
          className={"variable-proximity-demo"}
          fromFontVariationSettings="'wght' 400, 'opsz' 9"
          toFontVariationSettings="'wght' 1000, 'opsz' 40"
          containerRef={containerRef}
          radius={100}
          falloff="linear"
        />
      </h2>
      <Link to="/authentification" className="start-btn">
        COMMENCER
      </Link>
    </div>
  );
};
