import React, { useState } from "react";
import { BackgroundCarousel } from "../components/authentification/BackgroundCarousel";
import { LoginForm } from "../components/authentification/LoginForm";
import "../styles/style-authentification.css";
import Threads from '../blocks/Backgrounds/Threads/Threads';
import { MetallicLogo } from "../components/ui/MetallicLogo";
import { Signup } from "../components/authentification/SignUpForm";

export const Authentification = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="authentification-container">
      {/* <div className="logoHolder">
        <MetallicLogo />
        <h2>DEVHUB</h2>
      </div> */}
      {isLogin ? (
        <LoginForm toggleForm={toggleForm} />
      ) : (
        <Signup toggleForm={toggleForm} />
      )}
      <BackgroundCarousel />
      <div className="thread-container">
        <Threads amplitude={4.9} distance={0.8} enableMouseInteraction={false} />
      </div>
    </div>
  );
};