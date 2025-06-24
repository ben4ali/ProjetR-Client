import { ChevronRight, Download } from "lucide-react";
import { FC } from "react";
import GradientText from "../../../../blocks/TextAnimations/GradientText/GradientText";
import type { Skill } from "../../../../types/Portfolio";
import type { Projet } from "../../../../types/Projet";

interface AboutSectionProps {
  about: string;
  projets: Projet[];
  skills: Skill[];
  yearsOfExperience: number;
  cvDownloadUrl?: string;
}

export const AboutSection: FC<AboutSectionProps> = ({
  about,
  projets,
  skills,
  yearsOfExperience,
  cvDownloadUrl,
}) => {
  return (
    <section
      id="a-propos"
      className="relative flex w-full items-center justify-center"
      style={{
        background: "linear-gradient(180deg, rgb(2,2,2) 0%, rgb(6,6,6) 100%)",
        paddingBlock: "10rem",
      }}
    >
      <div className="mx-auto flex w-[65%] flex-col">
        <div className="mb-15 flex flex-col items-center">
          <GradientText
            variant="rondure"
            text="Qui je suis, en quelques mots."
            className="text-center text-5xl font-bold!"
          />

          <p className="mt-4 text-center text-xl text-neutral-400">
            Tout ce qu'il faut savoir sur moi, mon parcours et mes intérêts.
          </p>
        </div>
        <div className="mx-auto mb-10 flex w-[75%] items-center justify-center">
          <div className="w-full rounded-2xl p-8 text-center shadow-lg backdrop-blur-md">
            <p className="text-xl leading-relaxed text-neutral-300">{about}</p>
            <div
              className="absolute top-0 left-1/2 h-[0.05rem] w-full -translate-x-1/2"
              style={{
                background:
                  "linear-gradient(to right, rgba(255,255,255,0), rgb(255,255,255,0.5), rgba(255,255,255,0))",
              }}
            ></div>
          </div>
        </div>

        <div className="flex h-[35rem] w-full justify-center gap-5">
          <div className="flex w-[43%] flex-col justify-between gap-5">
            <div className="relative flex h-[45%] items-end rounded-2xl border border-neutral-800">
              <div className="absolute bottom-5 left-5 flex flex-col p-5">
                <span className="text-7xl font-semibold text-neutral-400">
                  <GradientText
                    text={projets.length + "+"}
                    variant="rondure"
                    className="mx-0! text-left text-7xl font-semibold text-neutral-400"
                  />
                </span>
                <span className="mt-2 text-4xl font-semibold text-white">
                  Projets réalisés
                </span>
                <span className="mt-1 text-neutral-600">
                  Conçu avec passion et créativité
                </span>
              </div>
            </div>
            <div className="relative h-[55%] rounded-2xl border border-neutral-800">
              <div className="absolute bottom-5 left-5 flex flex-col p-5">
                <GradientText
                  text={yearsOfExperience + "+"}
                  variant="rondure"
                  className="mx-0! text-left text-7xl font-semibold text-neutral-400"
                />

                <span className="mt-2 text-4xl font-semibold text-white">
                  Années d'expérience
                </span>
                <span className="mt-1 text-neutral-600">
                  Expertise dans plusieurs domaines
                </span>
              </div>
            </div>
          </div>
          <div className="relative w-[43%] rounded-2xl border border-neutral-800">
            {/* skills */}
            <div className="absolute bottom-5 left-5 flex flex-col p-5">
              <GradientText
                text={skills.length + "+"}
                variant="rondure"
                className="mx-0! text-left text-7xl font-semibold text-neutral-400"
              />

              <span className="mt-2 text-4xl font-semibold text-white">
                Compétences
              </span>
              <span className="mt-1 text-neutral-600">
                Maîtrise de plusieurs technologies
              </span>
            </div>
          </div>
        </div>
        <div className="bg-red mx-auto flex w-[88%] gap-2">
          <a
            className="landing-button group mt-8 w-fit px-6 py-4 text-lg text-neutral-900"
            href={cvDownloadUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            Télécharger mon CV
            <Download className="ml-2 inline h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          {/* CONTACT BUTTON */}
          <a
            className="mt-8 ml-4 w-fit rounded-full border border-neutral-600 px-6 py-4 text-lg text-neutral-300"
            href="#contact"
          >
            Me contacter
            <ChevronRight className="ml-2 inline h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
