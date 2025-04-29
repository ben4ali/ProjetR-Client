const images = [
  "https://github.com/ben4ali/To-Do-App-Ludex/blob/main/previews/Preview1.png?raw=true",
  "https://github.com/ben4ali/Valorant-Weapon-Showcase/blob/master/previews/preview1.png?raw=true",
  "https://github.com/ben4ali/Pokedex/blob/main/previews/preview2.png?raw=true",
  "https://github.com/ben4ali/Genies/blob/main/previews/preview4.png?raw=true",
  "https://github.com/ben4ali/Starway-react/blob/main/previews/preview1.png?raw=true",
  "https://github.com/ben4ali/Netpulse/blob/main/previews/preview2.png?raw=true",
  "https://www.nicholsonrj.com/Picture.84ec4241.webp",
  "https://gitlab.com/DmitriyKim01/blackjack-console-game/-/raw/main/screenshots/playing_stage_2.png?ref_type=heads",
  "https://gitlab.com/DmitriyKim01/room-portfolio/-/raw/main/vite-project/public/screenshots/welcome.png",
  "https://github.com/Jxddiss/msn/blob/main/images-readme/1.png?raw=true",
];

export const BackgroundCarousel = () => {
  const visibleImages = images.slice(0, 8);
  const duplicatedImages = [...visibleImages, ...visibleImages];

  return (
    <div className="path-container">
      <div className="top-path">
        {duplicatedImages.map((src, index) => (
          <div key={`top-${index}`} className="background-card">
            <img src={src} alt={`top-${index}`} />
          </div>
        ))}
      </div>
      <div className="bottom-path">
        {duplicatedImages.map((src, index) => (
          <div key={`bottom-${index}`} className="background-card">
            <img src={src} alt={`bottom-${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BackgroundCarousel;
