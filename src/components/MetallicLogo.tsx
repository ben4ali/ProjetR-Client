import MetallicPaint, { parseLogoImage } from '../blocks/Animations/MetallicPaint/MetallicPaint';
import { useState, useEffect } from 'react';
import logo from '../assets/logos/LogoRosemont.svg';

export const MetallicLogo = () => {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    async function loadDefaultImage() {
      try {
        const response = await fetch(logo);
        const blob = await response.blob();
        const file = new File([blob], "default.png", { type: blob.type });
        const { imageData } = await parseLogoImage(file);
        setImageData(imageData);
      } catch (err) {
        console.error("Error loading default image:", err);
      }
    }
      
    loadDefaultImage();
  }, []);

  return (
    <div>
      {imageData ? (
        <MetallicPaint 
          imageData={imageData} 
          params={{ edge: 0, patternBlur: 0.005, patternScale: 5, refraction: 0.02, speed: 0.3, liquid: 1 }} 
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}