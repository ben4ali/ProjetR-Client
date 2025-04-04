import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { BackgroundCarousel } from "../components/authentification/BackgroundCarousel";
import { LoginForm } from "../components/authentification/LoginForm";
import "../styles/style-authentification.css";
import Threads from "../blocks/Backgrounds/Threads/Threads";
import { Signup } from "../components/authentification/SignUpForm";

export const Authentification = () => {
  const [isLogin, setIsLogin] = useState(true);
  const loginRef = useRef<HTMLDivElement>(null);
  const signupRef = useRef<HTMLDivElement>(null);

  const toggleForm = () => {
    const tl = gsap.timeline();

    if (isLogin) {
      tl.to(loginRef.current, {
        opacity: 0,
        scale: 0.8,
        filter: "blur(10px)",
        duration: 0.3,
        ease: "power1.in",
        onComplete: () => {
          gsap.set(loginRef.current, { display: "none" });
          setIsLogin(false);
          gsap.set(signupRef.current, { display: "block" });
        },
      });

      tl.fromTo(
        signupRef.current,
        { opacity: 0, scale: 0.8, filter: "blur(10px)" },
        {
          opacity: 1,
          scale: 1.1,
          filter: "blur(0px)",
          duration: 0.4,
          ease: "back.out(1.7)",
        }
      ).to(signupRef.current, {
        scale: 1,
        duration: 0.2,
        ease: "power1.out",
      });
    } else {
      tl.to(signupRef.current, {
        opacity: 0,
        scale: 0.8,
        filter: "blur(10px)",
        duration: 0.3,
        ease: "power1.in",
        onComplete: () => {
          gsap.set(signupRef.current, { display: "none" });
          setIsLogin(true);
          gsap.set(loginRef.current, { display: "block" });
        },
      });

      tl.fromTo(
        loginRef.current,
        { opacity: 0, scale: 0.8, filter: "blur(10px)" },
        {
          opacity: 1,
          scale: 1.1,
          filter: "blur(0px)",
          duration: 0.4,
          ease: "back.out(1.7)",
        }
      ).to(loginRef.current, {
        scale: 1,
        duration: 0.2,
        ease: "power1.out",
      });
    }
  };

  useEffect(() => {
    if (isLogin) {
      gsap.set(loginRef.current, {
        opacity: 1,
        filter: "blur(0px)",
        display: "block",
      });
      gsap.set(signupRef.current, { opacity: 0, display: "none" });
    } else {
      gsap.set(signupRef.current, {
        opacity: 1,
        filter: "blur(0px)",
        display: "block",
      });
      gsap.set(loginRef.current, { opacity: 0, display: "none" });
    }
  }, [isLogin]);

  return (
    <div className="authentification-container">
      <div
        ref={loginRef}
        className="form-wrapper"
        style={{
          display: isLogin ? "block" : "none",
        }}
      >
        <LoginForm toggleForm={toggleForm} />
      </div>
      <div
        ref={signupRef}
        className="form-wrapper"
        style={{ display: !isLogin ? "block" : "none" }}
      >
        <Signup toggleForm={toggleForm} />
      </div>
      <BackgroundCarousel />
      <div className="thread-container">
        <Threads
          amplitude={4.9}
          distance={0.8}
          enableMouseInteraction={false}
        />
      </div>
    </div>
  );
};
