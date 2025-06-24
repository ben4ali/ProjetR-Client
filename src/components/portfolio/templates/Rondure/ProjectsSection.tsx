import { Github, Gitlab, Video } from "lucide-react";
import { FC, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import GradientText from "../../../../blocks/TextAnimations/GradientText/GradientText";
import type { Projet } from "../../../../types/Projet";

interface ProjectsSectionProps {
  projets: Projet[];
}

interface ProjectDialogProps {
  projet: Projet;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDialog: FC<ProjectDialogProps> = ({ projet, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-[90vw] max-w-4xl overflow-y-auto rounded-2xl border border-neutral-700 bg-neutral-900 p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 cursor-pointer rounded-full bg-neutral-800 px-3 py-1 text-neutral-400 transition-colors hover:bg-neutral-700 hover:text-white"
        >
          ✕
        </button>
        <div className="space-y-6">
          {projet.demoUrl && (
            <div className="aspect-video w-full overflow-hidden rounded-xl">
              <video
                src={projet.demoUrl}
                controls
                className="h-full w-full object-cover"
                poster={projet.previewImageUrl}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          <h2 className="text-3xl font-bold text-white">{projet.title}</h2>
          <p className="text-lg leading-relaxed text-neutral-300">
            {projet.description}
          </p>
          {projet.tags && projet.tags.length > 0 && (
            <div>
              <h3 className="mb-3 text-xl font-semibold text-white">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {projet.tags.map((tech: string, index: number) => (
                  <span
                    key={index}
                    className="rounded-full bg-neutral-800 px-3 py-1 text-sm text-neutral-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="flex gap-4">
            {projet.githubUrl && (
              <a
                href={projet.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex max-h-25 items-center gap-2 rounded-lg bg-black px-5 py-3 text-neutral-300 transition-colors hover:bg-neutral-700 hover:text-white"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            )}
            {projet.gitLabUrl && (
              <a
                href={projet.gitLabUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-[#FC6D26] px-5 py-2 text-neutral-300 transition-colors hover:bg-[#FC6D26]/60 hover:text-white"
              >
                <Gitlab className="h-4 w-4" />
                GitLab
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectCard: FC<{
  projet: Projet;
  onClick: () => void;
  isActive?: boolean;
}> = ({ projet, onClick, isActive = false }) => {
  return (
    <div
      className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-neutral-800 transition-all duration-300 hover:border-neutral-600 ${
        isActive ? "mx-4 scale-105" : "mx-2"
      }`}
      onClick={onClick}
      style={{ height: "300px" }}
    >
      {" "}
      <div className="absolute inset-0">
        {projet.demoUrl ? (
          <video
            src={projet.demoUrl}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            muted
            loop
            autoPlay
            playsInline
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-neutral-800">
            <span className="text-4xl text-neutral-600">
              <Video className="h-12 w-12" />
            </span>
          </div>
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 90%)",
        }}
      />
      <div className="absolute right-0 bottom-0 left-0 p-6">
        <h3 className="mb-2 text-xl font-semibold text-white">
          {projet.title}
        </h3>
        <p className="line-clamp-2 text-sm text-neutral-300">
          {projet.description}
        </p>
        {projet.tags && projet.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {projet.tags.slice(0, 3).map((tech: string, index: number) => (
              <span
                key={index}
                className="rounded-full bg-white/20 px-2 py-1 text-xs text-white backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
            {projet.tags.length > 3 && (
              <span className="rounded-full bg-white/20 px-2 py-1 text-xs text-white backdrop-blur-sm">
                +{projet.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
      <div className="absolute inset-0 bg-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
};

export const ProjectsSection: FC<ProjectsSectionProps> = ({ projets }) => {
  const [selectedProject, setSelectedProject] = useState<Projet | null>(null);

  const settings = {
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    dots: true,
    arrows: true,
    autoplay: false,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "40px",
        },
      },
    ],
  };

  if (projets.length === 0) {
    return null;
  }

  return (
    <>
      <section
        id="projets"
        className="relative flex w-full items-center justify-center"
        style={{
          background: "linear-gradient(180deg, rgb(2,2,2) 0%, rgb(6,6,6) 100%)",
          paddingBlock: "8rem",
        }}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col">
          <div className="items-left mb-16 flex flex-col">
            <GradientText
              text="Projets"
              variant="rondure"
              className="text-left text-5xl font-bold!"
            />
            <p className="mt-4 text-left text-xl text-neutral-400">
              Découvrez mes réalisations et créations
            </p>
          </div>

          <div className="carousel-container">
            <Slider {...settings}>
              {projets.map((projet) => (
                <ProjectCard
                  key={projet.id}
                  projet={projet}
                  onClick={() => setSelectedProject(projet)}
                />
              ))}
            </Slider>
          </div>
        </div>
      </section>
      <ProjectDialog
        projet={selectedProject!}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
};

export default ProjectsSection;
