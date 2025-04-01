import React, {useState} from "react";

export const VideoDescription = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const description = `Lorem, ipsum dolor sit amet consectetur 
  adipisicing elit. Eius non
  quas, aperiam autem excepturi dolorum molestiae aspernatur? Obcaecati
  quidem commodi odit eveniet laboriosam, placeat, odio, eaque tempora
  maxime expedita quo.
  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius non
  quas, aperiam autem excepturi dolorum molestiae aspernatur? Obcaecati
  quidem commodi odit eveniet laboriosam, placeat, odio, eaque tempora
  maxime expedita quo.maxime expedita quo.
  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius non
  quas, aperiam autem excepturi dolorum molestiae aspernatur? Obcaecati
  quidem commodi odit eveniet laboriosam, placeat, odio, eaque tempora
  maxime expedita quomaxime expedita quo.
  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius non
  quas, aperiam autem excepturi dolorum molestiae aspernatur? Obcaecati
  quidem commodi odit eveniet laboriosam, placeat, odio, eaque tempora
  maxime expedita quoquidem commodi odit eveniet laboriosam, placeat, odio, eaque tempora
  maxime expedita quo.
  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius non
  quas, aperiam autem excepturi dolorum molestiae aspernatur? Obcaecati
  quidem commodi odit eveniet laboriosam, placeat, odio, eaque tempora
  maxime expedita quo.maxime expedita quo.
  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius non
  quas, aperiam autem excepturi dolorum molestiae aspernatur? Obcaecati
  quidem commodi odit eveniet laboriosam, placeat, odio, eaque tempora
  maxime expedita quomaxime expedita quo.
  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius non
  quas, aperiam autem excepturi dolorum molestiae aspernatur? Obcaecati
  quidem commodi odit eveniet laboriosam, placeat, odio, eaque tempora
  maxime expedita quoquidem commodi odit eveniet laboriosam, placeat, odio, eaque tempora
  maxime expedita quo.
  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius non
  quas, aperiam autem excepturi dolorum molestiae aspernatur? Obcaecati
  quidem commodi odit eveniet laboriosam, placeat, odio, eaque tempora
  maxime expedita quo.maxime expedita quo.
  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius non
  quas, aperiam autem excepturi dolorum molestiae aspernatur? Obcaecati
  quidem commodi odit eveniet laboriosam, placeat, odio, eaque tempora
  maxime expedita quomaxime expedita quo.
  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius non
  quas, aperiam autem excepturi dolorum molestiae aspernatur? Obcaecati
  quidem commodi odit eveniet laboriosam, placeat, odio, eaque tempora
  maxime expedita quoquidem commodi odit eveniet laboriosam, placeat, odio, eaque tempora
  maxime expedita quo.
  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius non
  quas, aperiam autem excepturi dolorum molestiae aspernatur? Obcaecati
  quidem commodi odit eveniet laboriosam, placeat, odio, eaque tempora
  maxime expedita quo.maxime expedita quo.
  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius non
  quas, aperiam autem excepturi dolorum molestiae aspernatur? Obcaecati
  quidem commodi odit eveniet laboriosam, placeat, odio, eaque tempora
  maxime expedita quomaxime expedita quo.
  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius non
  quas, aperiam autem excepturi dolorum molestiae aspernatur? Obcaecati
  quidem commodi odit eveniet laboriosam, placeat, odio, eaque tempora
  maxime expedita quo`
  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className={`video-description ${isExpanded ? "expanded-desc" : ""}`}>
      <div className="video-description-header">
        <p>256k Visionnements</p>
        <button className="see-more" onClick={toggleDescription}>
          {isExpanded ? "Voir moins" : "Voir plus"}
        </button>
      </div>
      {description && (
        <div className="description">
          <div className="desc-fade-in"></div>
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};