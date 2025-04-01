"use client";

import React from "react";
import moon from "../../assets/images/moon.jpg"
import { AnimatedTooltip } from "../ui/animated-tooltip";

export const Contributors = () => {
    const teacher = {
        name: "Dini Ahamada",
        image: moon,
    }
    const contributors = [
        {
            id: 1,
            name: "Ali Benkarrouch",
            image: moon,
        },
        {
            id: 2,
            name: "Nicholson Rainville Jacques",
            image: moon,
        },
        {
            id: 3,
            name: "Jonmar Corpuz",
            image: moon,
        },
        {
            id: 4,
            name: "Teddy Cabrel Tekeu",
            image: moon,
        },
        {
            id: 5,
            name: "Michaël Bouchard",
            image: moon,
        }
    ];

    const cours = {
        name: "Application web 2",
        session: "Hiver 2025",
    }

    return (
        <div className="contributors-container">
        <div className="contributors-holder">
            {teacher && (
                <div className="teacher-holder">
                    <h3>Enseignant</h3>
                    <a href="#" className="teacher-card">
                        <img src={teacher.image} alt={teacher.name} />
                        <h4>{teacher.name}</h4>
                    </a>
                </div>
            )}

            {contributors.length > 0 && (
                <div className="contributor-list-holder">
                    <h3>({contributors.length}) Contributeurs</h3>
                    <div className="contributors-list">
                        <div className="inner-container">
                            <AnimatedTooltip items={contributors} />
                        </div>
                    </div>
                </div>
            )}
            {cours && (
                <div className="course-holder">
                    <h3>{cours.name}</h3>
                    <h3>{cours.session}</h3>
                </div>
            )}

        </div>
        </div>
    );
}