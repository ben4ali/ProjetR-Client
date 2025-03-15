import React from 'react';

import boreal from '../../assets/images/boreal.jpg';
import desert from '../../assets/images/desert.jpg';
import flower from '../../assets/images/flower.jpg';
import fuji from '../../assets/images/fuji.jpg';
import mountain from '../../assets/images/mountains.jpg';
import volcano from '../../assets/images/volcano.png';
import plains from '../../assets/images/plains.jpg';
import sunset from '../../assets/images/sunset.jpg';
import moon from '../../assets/images/moon.jpg';
import earth from '../../assets/images/earth.jpg';

const images = [
  boreal,
  desert,
  flower,
  fuji,
  mountain,
  volcano,
  plains,
  sunset,
  moon,
  earth
];

export const BackgroundCarousel = () => {
  return (
    <div className="path-container">
      <div className="top-path">
        {images.slice(0, 8).map((src, index) => (
          <div
            key={`top-${index}`}
            className="background-card"
            style={{ "--i": index + 1 }}
          >
            <img src={src} alt={`top-${index}`} />
          </div>
        ))}
      </div>
      <div className="bottom-path">
        {images.slice(0, 8).map((src, index) => (
          <div
            key={`bottom-${index}`}
            className="background-card"
            style={{ "--i": index + 1 }}
          >
            <img src={src} alt={`bottom-${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BackgroundCarousel;
