"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ClassCards() {
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.fromTo(
      cardRefs.current,
      { y: 200, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease:"sine",
        scrollTrigger: {
          trigger: ".classCardHolder",
          start: "top 80%",
          end: "top 30%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div className="about-content">
      <h2 className="cool-heading">Explorez Nos Projets Diversifiés</h2>
      <div className="classCardHolder">
        {data.map((item, index) => (
          <div
            key={index}
            className="classCard"
            ref={(el) => (cardRefs.current[index] = el!)}
          >
            <div className="classCard-overlay"></div>
            <div className="classCard-img">
              <img src={item.src} alt="" />
            </div>
            <div className="classCard-content">
              <h3>{item.category}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const data = [
  {
    category: "Développement Web",
    src: "https://hr-gazette.com/wp-content/uploads/2023/03/software-developer-g1372d020e_1280.jpg",
  },
  {
    category: "Application Native",
    src: "https://images.unsplash.com/photo-1599202860130-f600f4948364?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    category: "Jeu vidéo",
    src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    category: "Objet connecté",
    src: "https://media.istockphoto.com/id/1385982565/photo/smart-speaker-on-the-table-in-the-living-room.jpg?s=612x612&w=0&k=20&c=eyYoifRvM3-1SfmZ2a202SG1DuMUWnjGHQAPWRwT0F8=",
  },
];