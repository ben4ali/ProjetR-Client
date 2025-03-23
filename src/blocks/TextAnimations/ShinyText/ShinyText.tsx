/*
	Installed from https://reactbits.dev/ts/default/
*/
import React from "react";
import "./ShinyText.css";
import PropTypes from "prop-types";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 5,
  className = "",
}) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={`shiny-text ${disabled ? "disabled" : ""} ${className}`}
      style={{ animationDuration }}
    >
      {text}
    </div>
  );
};
ShinyText.propTypes = {
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  speed: PropTypes.number,
  className: PropTypes.string,
};

export default ShinyText;
