import { useEffect, useState } from 'react';
import logo from '../../assets/logos/Rosemont-SVG.svg';
import logoBrute from '../../assets/logos/RosemontLogoBrute.png';
import MetallicPaint, {
  parseLogoImage,
} from '../../blocks/Animations/MetallicPaint/MetallicPaint';

export const MetallicLogo = () => {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    async function loadDefaultImage() {
      try {
        const response = await fetch(logo);
        const blob = await response.blob();
        const file = new File([blob], 'default.png', { type: blob.type });
        const { imageData } = await parseLogoImage(file);
        setImageData(imageData);
      } catch (err) {
        console.error('Error loading default image:', err);
      }
    }

    loadDefaultImage();
  }, []);

  return (
    <div>
      {imageData ? (
        <MetallicPaint
          imageData={imageData}
          params={{
            edge: 0,
            patternBlur: 0.005,
            patternScale: 5,
            refraction: 0.02,
            speed: 0.3,
            liquid: 1,
          }}
        />
      ) : (
        <img
          style={{
            height: '17rem',
            scale: '1.05',
            zIndex: 5,
            position: 'relative',
          }}
          src={logoBrute}
          alt="logo"
        />
      )}
      <div className="absolute -inset-75 z-0 rounded-full bg-radial-[at_50%_50%] from-[#5a62a7d0] via-transparent to-transparent" />
    </div>
  );
};
