import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SpotlightCard from "../../blocks/Components/SpotlightCard/SpotlightCard";

gsap.registerPlugin(ScrollTrigger);

export const Presentation = () => {
  const commentsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (commentsRef.current) {
      gsap.to(commentsRef.current, {
        y: -500,
        scrollTrigger: {
          trigger: commentsRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    if (videoRef.current) {
      gsap.fromTo(
        videoRef.current,
        { x: -200, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: videoRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
          },
        }
      );
    }
  }, []);

  return (
    <div className="presentation-container">
      <div className="video-presentation">
        <div className="video-container-presentation" ref={videoRef}>
          <video autoPlay muted loop id="myVideo">
            <source
              src="https://www.aliben.me/artSyncDemo.6f635296.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="comment-container-presentation">
          <div className="comments-holder-presentation" ref={commentsRef}>
            {data.map((comment, index) => (
              <div className="comment-presentation" key={index}>
                <div className="user">
                  <i className="bi bi-person-fill"></i>
                  <p>{comment.user}</p>
                </div>
                <div className="content">
                  <p>{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="features-holder">
        <div className="spotlight-holder">
          <SpotlightCard
            className="custom-spotlight-card"
            spotlightColor="rgba(255, 255, 255, 0.2)"
          >
            <i className="bi bi-send-check"></i>
            <h5>PUBLIER</h5>
            <p>Publier vos projets dont vous êtes fiers.</p>
          </SpotlightCard>
        </div>

        <div className="spotlight-holder">
          <SpotlightCard
            className="custom-spotlight-card"
            spotlightColor="rgba(255, 255, 255, 0.2)"
          >
            <i className="bi bi-share"></i>
            <h5>PARTAGER</h5>
            <p>Partager les projets que vous aimez avec vos amis.</p>
          </SpotlightCard>
        </div>

        <div className="spotlight-holder">
          <SpotlightCard
            className="custom-spotlight-card"
            spotlightColor="rgba(255, 255, 255, 0.2)"
          >
            <i className="bi bi-chat-left-dots"></i>
            <h5>COMMENTER</h5>
            <p>Demander ou donner des conseils sur les projets.</p>
          </SpotlightCard>
        </div>

        <div className="spotlight-holder">
          <SpotlightCard
            className="custom-spotlight-card"
            spotlightColor="rgba(255, 255, 255, 0.2)"
          >
            <i className="bi bi-star"></i>
            <h5>INSPIRER-VOUS</h5>
            <p>Trouver l&apos;inspiration pour vos prochains projets.</p>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
};

const data = [
  {
    user: "Dini",
    content: "C'est super! Beau travail.",
  },
  {
    user: "Ali",
    content: "J'adore!",
  },
  {
    user: "Nicholson",
    content: "C'est incroyable!",
  },
  {
    user: "Teddy",
    content: "Comment avez-vous fait ça?",
  },
  {
    user: "Jamil",
    content: "C'est vraiment cool!",
  },
  {
    user: "Francois",
    content: "C'est vraiment cool!",
  },
  {
    user: "Noor",
    content: "C'est vraiment cool!",
  },
  {
    user: "Yassine",
    content: "Très beau projet!",
  },
  {
    user: "Marie",
    content: "C'est magnifique!",
  },
  {
    user: "Jean",
    content: "Très impressionnant!",
  },
  {
    user: "Luc",
    content: "J'aime beaucoup!",
  },
  {
    user: "Sophie",
    content: "Excellent travail!",
  },
];
