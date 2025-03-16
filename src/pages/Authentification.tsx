import React from "react";
import { BackgroundCarousel } from "../components/authentification/BackgroundCarousel";
import { LoginForm } from "../components/authentification/LoginForm";
import "../styles/style-authentification.css";
import Threads from '../blocks/Backgrounds/Threads/Threads';
import { MetallicLogo } from "../components/MetallicLogo";
// import logo from '../assets/logos/LogoBrutNoir.png'

export const Authentification = () => {
  return (
    <div className="authentification-container">
        <div className="logoHolder">
          <MetallicLogo/>
          <h2>DEVHUB</h2>
        </div>
      <LoginForm />
      <BackgroundCarousel />
      <div className="thread-container">
        <Threads  amplitude={4.9} distance={0.8} enableMouseInteraction={false} />
      </div>
    </div>
  );
};
