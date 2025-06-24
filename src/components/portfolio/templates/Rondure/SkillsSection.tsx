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
          <div
            key={circle}
            className={`h-4 w-4 rounded-full border-2 transition-all duration-300 ${
              circle <= filledCircles
                ? "border-white bg-white shadow-lg shadow-white/20"
                : "border-neutral-600 bg-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export const SkillsSection: FC<SkillsSectionProps> = ({ skills }) => {
  return (
    <section
      id="competences"
      className="relative flex w-full items-center justify-center"
      style={{
        background: "linear-gradient(180deg, rgb(6,6,6) 0%, rgb(2,2,2) 100%)",
        paddingBlock: "8rem",
      }}
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
        <div className="mb-16 flex flex-col items-center">
          <GradientText
            colors={[
              "rgb(204,204,204)",
              "rgb(70,70,100)",
              "rgb(230,230,250)",
              "rgb(64,64,94)",
              "rgb(205,205,255)",
            ]}
            animationSpeed={0}
            showBorder={false}
            className="text-center text-5xl font-bold!"
          >
            Mes compétences
          </GradientText>
          <p className="mt-4 text-center text-xl text-neutral-400">
            Technologies et outils que je maîtrise
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-neutral-800 bg-neutral-900/20 p-6 backdrop-blur-sm transition-all duration-300 hover:border-neutral-600 hover:bg-neutral-800/30"
            >
              <div
                className="absolute top-0 left-1/2 h-[0.05rem] w-full -translate-x-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(to right, rgba(255,255,255,0), rgb(255,255,255,0.3), rgba(255,255,255,0))",
                }}
              />
              <SkillCircle skill={skill} />
            </div>
          ))}
        </div>

        {skills.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-xl text-neutral-400">
              Aucune compétence n'a été ajoutée pour le moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;
