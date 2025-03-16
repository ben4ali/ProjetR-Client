import React from "react";
//import style
import "../styles/style-home.css";
import { HeroParallaxComponent } from "../components/home/HeroParallaxComponent";
import { ClassCards } from "../components/home/ClassCards";
import { Presentation } from "../components/home/Presentation";
import { MembersComponent } from "../components/home/MembersComponent";
export const Home = () => {

    return(
        <div className="home-container">

            <section id="hero-section">
                <HeroParallaxComponent />
            </section>

            <section id="about-section">
                <ClassCards />
            </section>

            <section id="presentation-section">
                 <Presentation/>
            </section>

            <section id="membres-section">
                <MembersComponent/>
            </section>
        </div>
    );
};