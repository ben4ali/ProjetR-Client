import { motion } from "framer-motion";
import { FC } from "react";
import GradientText from "../../../../blocks/TextAnimations/GradientText/GradientText";
import type { Skill } from "../../../../types/Portfolio";

interface SkillsSectionProps {
  skills: Skill[];
}

const SkillCircle: FC<{ skill: Skill }> = ({ skill }) => {
  const filledCircles = Math.ceil(skill.level / 20);

  return (
    <div className="flex flex-col gap-3 px-4 py-1">
      <span className="text-left text-lg font-medium text-neutral-200">
        {skill.name}
      </span>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((circle) => (
          <motion.div
            key={circle}
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              backgroundColor:
                circle <= filledCircles ? "rgb(255, 255, 255)" : "transparent",
            }}
            transition={{
              delay: circle * 0.1,
              duration: 0.3,
              type: "spring",
            }}
            className={`h-4 w-4 rounded-full border-2 transition-all duration-300 ${
              circle <= filledCircles
                ? "border-white shadow-lg shadow-white/20"
                : "border-neutral-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export const SkillsSection: FC<SkillsSectionProps> = ({ skills }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 12,
      },
    },
  };

  return (
    <motion.section
      id="competences"
      className="relative flex w-full items-center justify-center"
      style={{
        background: "linear-gradient(180deg, rgb(6,6,6) 0%, rgb(2,2,2) 100%)",
        paddingBlock: "8rem",
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(255,255,255,0.02) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(255,255,255,0.02) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.02) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.02) 75%)
          `,
          backgroundSize: "80px 80px",
          backgroundPosition: "0 0, 0 40px, 40px -40px, -40px 0px",
        }}
      />
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(255,255,255,0.015) 50%, transparent 50%),
            linear-gradient(0deg, rgba(255,255,255,0.015) 50%, transparent 50%)
          `,
          backgroundSize: "160px 160px",
        }}
      />
      <div className="relative z-10 mx-auto flex w-[65%] flex-col">
        {" "}
        <motion.div
          className="items-left mb-16 flex flex-col"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <GradientText
            text="Compétences"
            variant="rondure"
            className="text-left text-5xl font-bold!"
          />
          <motion.p
            className="mt-4 text-left text-xl text-neutral-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Technologies et outils que je maîtrise
          </motion.p>
        </motion.div>
        <motion.div
          className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          variants={containerVariants}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="group relative rounded-2xl border border-neutral-800 bg-neutral-900/20 p-6 backdrop-blur-sm transition-all duration-300 hover:border-neutral-600 hover:bg-neutral-800/30"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className="absolute top-0 left-1/2 h-[0.05rem] w-full -translate-x-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(to right, rgba(255,255,255,0), rgb(255,255,255,0.3), rgba(255,255,255,0))",
                }}
              />
              <SkillCircle skill={skill} />
            </motion.div>
          ))}
        </motion.div>
        {skills.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-xl text-neutral-400">
              Aucune compétence n'a été ajoutée pour le moment.
            </p>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default SkillsSection;
