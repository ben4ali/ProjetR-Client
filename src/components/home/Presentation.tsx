import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
            gsap.fromTo(videoRef.current, 
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
            <div className='video-container' ref={videoRef}>
                <video autoPlay muted loop id="myVideo">
                    <source src="https://www.aliben.me/artSyncDemo.6f635296.mp4" type="video/mp4" />
                </video>
            </div>
            <div className='comment-container'>
                <div className="comments-holder" ref={commentsRef}>
                    {data.map((comment, index) => (
                        <div className='comment' key={index}>
                            <div className='user'>
                                <i className="bi bi-person-fill"></i>
                                <p>{comment.user}</p>
                            </div>
                            <div className='content'>
                                <p>{comment.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const data = [
    {
        user: "Dini",
        content: "C'est super! Beau travail."
    },
    {
        user: "Ali",
        content: "J'adore!"
    },
    {
        user: "Nicholson",
        content: "C'est incroyable!"
    },
    {
        user: "Teddy",
        content: "Comment avez-vous fait ça?"
    },
    {
        user: "Jamil",
        content: "C'est vraiment cool!"
    },
    {
        user: "Francois",
        content: "C'est vraiment cool!"
    },
    {
        user: "Noor",
        content: "C'est vraiment cool!"
    },
    {
        user: "Yassine",
        content: "Très beau projet!"
    },
    {
        user: "Marie",
        content: "C'est magnifique!"
    },
    {
        user: "Jean",
        content: "Très impressionnant!"
    },
    {
        user: "Luc",
        content: "J'aime beaucoup!"
    },
    {
        user: "Sophie",
        content: "Excellent travail!"
    }
];