import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LoginForm } from "../components/authentification/LoginForm";
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
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1.1,

          duration: 0.4,
          ease: "back.out(1.7)",
        },
      ).to(signupRef.current, {
        scale: 1,
        duration: 0.2,
        ease: "power1.out",
      });
    } else {
      tl.to(signupRef.current, {
        opacity: 0,
        scale: 0.8,

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
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1.1,

          duration: 0.4,
          ease: "back.out(1.7)",
        },
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
        display: "block",
      });
      gsap.set(signupRef.current, { opacity: 0, display: "none" });
    } else {
      gsap.set(signupRef.current, {
        opacity: 1,
        display: "block",
      });
      gsap.set(loginRef.current, { opacity: 0, display: "none" });
    }
  }, [isLogin]);

  return (
    <div className="authentification-container relative flex min-h-screen min-w-screen items-center justify-center overflow-hidden bg-stone-200">
      <Link
        to="/"
        className="absolute top-4 right-4 z-5 ml-4 transform rounded-full border border-[#e4003a] px-6 py-2 font-semibold text-[#e4003a] transition-all duration-300 hover:bg-[#e4003a] hover:text-white"
      >
        Retourner à l'accueil
      </Link>
      <div
        ref={loginRef}
        className="form-wrapper relative z-10 transition-all duration-500 ease-in-out"
        style={{
          display: isLogin ? "block" : "none",
        }}
      >
        <LoginForm toggleForm={toggleForm} />
      </div>
      <div
        ref={signupRef}
        className="form-wrapper relative z-10 transition-all duration-500 ease-in-out"
        style={{ display: !isLogin ? "block" : "none" }}
      >
        <Signup toggleForm={toggleForm} />
      </div>
      <div className="pointer-events-none absolute inset-0 h-full w-full">
        <img src="/V_rosemont.svg" className="h-[40vw]" />
        <img
          src="/V_rosemont.svg"
          className="absolute right-0 bottom-0 h-[40vw] rotate-180"
        />
      </div>
    </div>
  );
};
