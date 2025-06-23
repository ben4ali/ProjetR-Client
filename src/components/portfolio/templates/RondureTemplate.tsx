import { FC } from "react";
import type { Portfolio } from "../../../types/Portfolio";
import ChromeSculpture from "./Rondure/ChromeSculpture";

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
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[rgb(0,0,0)] text-white">
      {/* TODO HEADER AFTER */}
      {/* Nav */}
      <nav
        className={`fixed top-5 left-2 z-10 flex w-fit gap-3 rounded-lg bg-[rgba(255,255,255,0.1)] p-4 px-6 text-white shadow-md backdrop-blur-lg sm:left-5`}
      >
        {/* Avatar */}
        <a href="#hero" className="hidden items-center gap-4 sm:flex">
          <img
            src={user.avatar || "/default-avatar.png"}
            alt={`${user.firstName} ${user.lastName}`}
            className="h-6 w-6 rounded-full sm:h-8 sm:w-8"
          />
          <h2 className="border-r pr-3 text-lg font-semibold">
            {user.firstName}{" "}
          </h2>
        </a>
        {/* Links */}
        <ul className="mt-1 flex gap-3">
          <li>
            <a
              href={"#a-propos"}
              className="relative pb-2 text-sm after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full sm:text-base"
            >
              À propos
            </a>
          </li>
          <li>
            <a
              href={"#competences"}
              className="relative pb-2 text-sm after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full sm:text-base"
            >
              Compétences
            </a>
          </li>
          <li>
            <a
              href={"#projets"}
              className="relative pb-2 text-sm after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full sm:text-base"
            >
              Projets
            </a>
          </li>
          <li>
            <a
              href={"#contact"}
              className="relative pb-2 text-sm after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full sm:text-base"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* HERO SECTION */}
      <section className="flex h-[100vh] w-full items-center justify-center">
        <ChromeSculpture />
      </section>

      {/* TODO FOOTER AFTER */}
      <footer></footer>
    </div>
  );
};

export default RondureTemplate;
