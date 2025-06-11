import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

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

const visibleImages = images.slice(0, 8);
const duplicatedImages = [...visibleImages, ...visibleImages];

const sliderSettings = (rtl = false) => ({
  infinite: true,
  speed: 8000,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 0,
  cssEase: "linear",
  arrows: false,
  pauseOnHover: false,
  swipe: false,
  draggable: false,
  rtl,
  variableWidth: true,
});

export const BackgroundCarousel = () => {
  return (
    <div className="path-container absolute w-screen z-[2] overflow-x-hidden overflow-y-visible flex flex-col pointer-events-none">
      <div className="top-path w-fit h-fit flex items-center overflow-hidden whitespace-nowrap">
        <Slider {...sliderSettings(true)}>
          {duplicatedImages.map((src, index) => (
            <div key={`top-${index}`} className="pr-8">
              <div className="background-card h-[22vh] w-[19vw] bg-neutral-900 rounded-[12px] overflow-hidden shadow-[5px_3px_10px_2px_rgba(0,0,0,0.25)] min-w-[200px]">
                <img
                  src={src}
                  alt={`top-${index}`}
                  className="object-cover h-full w-full"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="bottom-path w-fit mt-4 h-fit flex items-center overflow-hidden whitespace-nowrap">
        <Slider {...sliderSettings(false)}>
          {duplicatedImages.map((src, index) => (
            <div key={`bottom-${index}`} className="pr-8">
              <div className="background-card h-[22vh] w-[19vw] bg-neutral-900 rounded-[12px] overflow-hidden shadow-[5px_3px_10px_2px_rgba(0,0,0,0.25)] min-w-[200px]">
                <img
                  src={src}
                  alt={`bottom-${index}`}
                  className="object-cover h-full w-full"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BackgroundCarousel;
