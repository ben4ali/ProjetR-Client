import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { FC } from "react";
import Squares from "../../../blocks/Backgrounds/Squares/Squares";
import SplitText from "../../../blocks/TextAnimations/SplitText/SplitText";
import type { Portfolio } from "../../../types/Portfolio";
import ChromeSculpture from "./Rondure/ChromeSculpture";
import "./Rondure/style-rondure.css";
interface RondureTemplateProps {
  portfolio: Portfolio;
  isPreview?: boolean;
}

export const RondureTemplate: FC<RondureTemplateProps> = ({
  portfolio,
  isPreview = false,
}) => {
  const {
    user,
    about,
    hook,
    skills = [],
    projets = [],
    githubUrl,
    linkedinUrl,
    yearsOfExperience,
    cvDownloadUrl,
    jobTitle,
    customization,
  } = portfolio;
  const fullName = `${user.firstName} ${user.lastName}`;
  return (
    <div
      className="relative flex min-h-screen flex-col overflow-hidden text-white"
      style={{
        background:
          "radial-gradient(ellipse at top left, rgb(30,30,30) 0%, rgb(10,10,10) 25%, rgb(0,0,0) 60%, rgb(0,0,0) 100%)",
      }}
    >
      {/* TODO HEADER AFTER */}
      {/* Nav */}
      <nav
        className={`fixed top-5 left-1/2 z-11 flex w-[75%] -translate-x-1/2 justify-between gap-3`}
      >
        {/* Avatar */}
        <a
          href="#hero"
          className="hidden h-13 w-13 items-center gap-4 rounded-full sm:flex"
        >
          <img
            src={user.avatar || "/default-avatar.png"}
            alt={`${user.firstName} ${user.lastName}`}
            className="rounded-full p-1"
          />
        </a>
        {/* Links */}
        <ul
          className="mt-1 mr-10 flex gap-3 rounded-full border border-neutral-800 bg-neutral-400/8 p-4 px-6 text-sm text-neutral-400"
          style={{
            boxShadow: "0 0 24px 4px rgba(255,255,255,0.05)",
          }}
        >
          <li>
            <a
              href={"#a-propos"}
              className="relative pb-2 transition-colors duration-300 hover:text-neutral-100"
            >
              À propos
            </a>
          </li>
          <li>
            <a
              href={"#competences"}
              className="relative pb-2 transition-colors duration-300 hover:text-neutral-100"
            >
              Compétences
            </a>
          </li>
          <li>
            <a
              href={"#projets"}
              className="relative pb-2 transition-colors duration-300 hover:text-neutral-100"
            >
              Projets
            </a>
          </li>
          <li>
            <a
              href={"#contact"}
              className="relative pb-2 transition-colors duration-300 hover:text-neutral-100"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* HERO SECTION */}
      <section className="flex h-[100vh] w-full items-center justify-center">
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <Squares
            speed={0.5}
            squareSize={80}
            direction="diagonal" // up, down, left, right, diagonal
            borderColor="rgb(255,255,255,0.015)"
            hoverFillColor="#222"
          />
        </div>

        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse at bottom right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 120%)",
            pointerEvents: "none",
          }}
        />

        <div className="absolute top-[32%] left-[15%] z-12 flex flex-col">
          {/* Radial gradient glow */}
          <div
            className="pointer-events-none absolute left-[-25%] z-[-1]"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.025) 60%, transparent 100%)",
              filter: "blur(40px)",
              width: "150%",
              height: "120%",
            }}
          />
          <SplitText
            text={fullName}
            className="text-[60px]"
            delay={100}
            duration={0.2}
            ease="back.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-200px"
            textAlign="left"
          />
          <motion.p
            className="max-w-[90%] text-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6, ease: "easeOut" }}
          >
            {portfolio.jobTitle}
          </motion.p>
          <motion.a
            className="landing-button group mt-8 w-fit px-6 py-6 text-lg text-neutral-900"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.6, ease: "easeOut" }}
          >
            Découvrir mon portfolio
            <ChevronRight className="ml-2 inline h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.a>
        </div>
        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1,
            duration: 3,
            ease: [0.68, -0.55, 0.27, 1.55],
          }} // back easing
        >
          <ChromeSculpture />
        </motion.div>
      </section>

      {/* TODO FOOTER AFTER */}
      <footer></footer>
    </div>
  );
};

export default RondureTemplate;
