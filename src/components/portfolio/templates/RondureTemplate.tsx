import { FC } from "react";
import type { Portfolio } from "../../../types/Portfolio";
import AboutSection from "./Rondure/AboutSection";
import ContactSection from "./Rondure/ContactSection";
import Header from "./Rondure/Header";
import HeroSection from "./Rondure/HeroSection";
import ProjectsSection from "./Rondure/ProjectsSection";
import SkillsSection from "./Rondure/SkillsSection";
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
    skills = [],
    projets = [],
    yearsOfExperience,
    cvDownloadUrl,
    jobTitle,
    githubUrl,
    linkedinUrl,
    websiteUrl,
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
      {" "}
      <Header user={user} />
      <HeroSection fullName={fullName} jobTitle={jobTitle || ""} />
      <AboutSection
        about={about || ""}
        projets={projets}
        skills={skills}
        yearsOfExperience={yearsOfExperience || 0}
        cvDownloadUrl={cvDownloadUrl}
      />{" "}
      <SkillsSection skills={skills} />
      <ProjectsSection projets={projets} />
      <ContactSection
        user={user}
        githubUrl={githubUrl}
        linkedinUrl={linkedinUrl}
        websiteUrl={websiteUrl}
      />
      <footer></footer>
    </div>
  );
};

export default RondureTemplate;
