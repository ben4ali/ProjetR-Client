import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { FC } from "react";
import Squares from "../../../../blocks/Backgrounds/Squares/Squares";
import SplitText from "../../../../blocks/TextAnimations/SplitText/SplitText";
import ChromeSculpture from "./ChromeSculpture";

interface HeroSectionProps {
  fullName: string;
  jobTitle: string;
}

export const HeroSection: FC<HeroSectionProps> = ({ fullName, jobTitle }) => {
  return (
    <section className="relative flex h-[100vh] w-full items-center justify-center">
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <Squares
          speed={0.5}
          squareSize={80}
          direction="diagonal"
          borderColor="rgb(255,255,255,0.035)"
          hoverFillColor="#222"
        />
      </div>

      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at bottom right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.75) 50%, rgba(0,0,0,0) 100%)",
          pointerEvents: "none",
        }}
      />

      <div className="absolute top-[32%] left-[15%] z-12 flex flex-col">
        <div
          className="pointer-events-none absolute top-[-35%] left-[-25%] z-[-1]"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.025) 60%, transparent 100%)",
            filter: "blur(40px)",
            width: "150%",
            height: "175%",
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
          {jobTitle}
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 2,
          duration: 3,
          ease: [0.68, -0.55, 0.27, 1.55],
        }}
      >
        <ChromeSculpture />
      </motion.div>
    </section>
  );
};

export default HeroSection;
