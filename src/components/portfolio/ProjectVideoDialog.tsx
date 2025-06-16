import { FC, useEffect, useRef } from "react";
import { Projet } from "../../types/Projet";

type DialogVariant =
  | "modern"
  | "classic"
  | "creative"
  | "minimalist"
  | "developer"
  | "designer"
  | "neural"
  | "prism"
  | "cupertino"
  | "quantum"
  | "meteor"
  | "hologram"
  | "samurai"
  | "matrix"
  | "cartoon"
  | "pixel"
  | "silk";

interface ProjectVideoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  project: Projet;
  variant?: DialogVariant;
}

export const ProjectVideoDialog: FC<ProjectVideoDialogProps> = ({
  isOpen,
  onClose,
  project,
  variant = "modern",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.load();
    }
  }, [isOpen, project.demoUrl]);

  if (!isOpen) return null;

  const getVariantStyles = () => {
    switch (variant) {
      case "modern":
        return {
          overlay: "bg-black bg-opacity-75",
          container:
            "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white rounded-lg shadow-2xl",
          header: "border-b border-purple-500/30 bg-slate-800/50",
          title: "text-2xl font-bold text-white",
          closeButton: "text-purple-300 hover:text-white",
          content: "bg-slate-800/30",
          description: "text-gray-300",
          sectionTitle: "text-lg font-semibold text-purple-300 mb-2",
          tag: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
          githubButton: "bg-purple-600 hover:bg-purple-700 text-white",
          liveButton: "bg-blue-600 hover:bg-blue-700 text-white",
        };

      case "classic":
        return {
          overlay: "bg-black bg-opacity-75",
          container:
            "bg-white text-gray-900 rounded-lg shadow-2xl border-2 border-gray-200",
          header: "border-b border-gray-200 bg-gray-50",
          title: "text-2xl font-serif font-bold text-gray-900",
          closeButton: "text-gray-400 hover:text-gray-600",
          content: "bg-white",
          description: "text-gray-700",
          sectionTitle: "text-lg font-serif font-semibold text-gray-900 mb-2",
          tag: "bg-gray-100 text-gray-800 border border-gray-300",
          githubButton: "bg-gray-900 hover:bg-gray-800 text-white",
          liveButton: "bg-blue-600 hover:bg-blue-700 text-white",
        };

      case "creative":
        return {
          overlay: "bg-black bg-opacity-75",
          container:
            "bg-gradient-to-br from-pink-500/10 via-purple-600/10 to-blue-600/10 backdrop-blur-sm text-white rounded-2xl shadow-2xl border border-pink-300/20",
          header:
            "border-b border-pink-300/30 bg-gradient-to-r from-pink-500/20 to-purple-600/20",
          title:
            "text-2xl font-black text-white bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent",
          closeButton: "text-pink-300 hover:text-white",
          content: "bg-black/20",
          description: "text-gray-200",
          sectionTitle: "text-lg font-bold text-pink-300 mb-2",
          tag: "bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300 border border-pink-300/30",
          githubButton:
            "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white",
          liveButton:
            "bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white",
        };

      case "minimalist":
        return {
          overlay: "bg-black bg-opacity-75",
          container:
            "bg-white text-gray-900 rounded shadow-xl border border-gray-100",
          header: "border-b border-gray-100 bg-white",
          title: "text-2xl font-light text-gray-900",
          closeButton: "text-gray-400 hover:text-gray-600",
          content: "bg-white",
          description: "text-gray-600 font-light",
          sectionTitle: "text-sm uppercase tracking-wider text-gray-600 mb-2",
          tag: "bg-gray-50 text-gray-700 border border-gray-200",
          githubButton:
            "border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white",
          liveButton: "bg-gray-900 hover:bg-gray-800 text-white",
        };

      case "developer":
        return {
          overlay: "bg-black bg-opacity-75",
          container:
            "bg-gray-900 text-green-400 rounded border border-gray-700 shadow-2xl font-mono",
          header: "border-b border-gray-700 bg-gray-800",
          title: "text-2xl font-bold text-green-400",
          closeButton: "text-gray-400 hover:text-green-400",
          content: "bg-gray-900",
          description: "text-gray-300",
          sectionTitle: "text-lg font-bold text-yellow-400 mb-2",
          tag: "bg-gray-800 text-green-400 border border-gray-700",
          githubButton:
            "bg-gray-800 hover:bg-gray-700 text-green-400 border border-gray-700",
          liveButton: "bg-blue-600 hover:bg-blue-700 text-white",
        };

      case "designer":
        return {
          overlay: "bg-black bg-opacity-75",
          container: "bg-white text-gray-900 rounded-2xl shadow-2xl",
          header: "border-b border-gray-100 bg-gray-50",
          title: "text-2xl font-light text-gray-900 tracking-tight",
          closeButton: "text-gray-400 hover:text-gray-600",
          content: "bg-white",
          description: "text-gray-600 font-light",
          sectionTitle: "text-lg font-medium text-gray-900 mb-2",
          tag: "bg-gradient-to-r from-blue-50 to-purple-50 text-gray-700 border border-gray-200",
          githubButton: "bg-gray-900 hover:bg-gray-800 text-white",
          liveButton:
            "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white",
        };

      case "neural":
        return {
          overlay: "bg-black bg-opacity-90",
          container:
            "bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white rounded-2xl shadow-2xl border border-blue-400/20",
          header: "border-b border-blue-400/30 bg-gray-800/50",
          title:
            "text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent",
          closeButton: "text-blue-300 hover:text-white",
          content: "bg-gray-900/30",
          description: "text-gray-300",
          sectionTitle: "text-lg font-semibold text-blue-300 mb-2",
          tag: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
          githubButton: "bg-blue-600 hover:bg-blue-700 text-white",
          liveButton: "bg-purple-600 hover:bg-purple-700 text-white",
        };

      case "prism":
        return {
          overlay: "bg-black bg-opacity-75",
          container:
            "bg-white/10 backdrop-blur-xl text-white rounded-3xl shadow-2xl border border-white/20",
          header: "border-b border-white/20 bg-white/5",
          title: "text-2xl font-bold text-white",
          closeButton: "text-white/70 hover:text-white",
          content: "bg-white/5",
          description: "text-white/90",
          sectionTitle: "text-lg font-semibold text-white mb-2",
          tag: "bg-white/20 text-white border border-white/30",
          githubButton:
            "bg-white/20 hover:bg-white/30 text-white border border-white/30",
          liveButton: "bg-white text-gray-900 hover:bg-white/90",
        };

      case "cupertino":
        return {
          overlay: "bg-black bg-opacity-50",
          container: "bg-white text-gray-900 rounded-3xl shadow-2xl",
          header: "border-b border-gray-100 bg-gray-50/50",
          title: "text-2xl font-semibold text-gray-900 tracking-tight",
          closeButton: "text-gray-400 hover:text-gray-600",
          content: "bg-white",
          description: "text-gray-700 leading-relaxed",
          sectionTitle: "text-lg font-medium text-gray-900 mb-2",
          tag: "bg-gray-100 text-gray-700 border border-gray-200",
          githubButton: "bg-gray-900 hover:bg-gray-800 text-white",
          liveButton: "bg-blue-500 hover:bg-blue-600 text-white",
        };

      case "quantum":
        return {
          overlay: "bg-black bg-opacity-90",
          container:
            "bg-gradient-to-br from-gray-900 via-cyan-900 to-gray-900 text-white rounded-2xl shadow-2xl border border-cyan-400/30",
          header: "border-b border-cyan-400/30 bg-gray-800/50",
          title:
            "text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent",
          closeButton: "text-cyan-300 hover:text-white",
          content: "bg-gray-900/30",
          description: "text-gray-300",
          sectionTitle: "text-lg font-semibold text-cyan-300 mb-2",
          tag: "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30",
          githubButton: "bg-cyan-600 hover:bg-cyan-700 text-white",
          liveButton: "bg-purple-600 hover:bg-purple-700 text-white",
        };

      case "meteor":
        return {
          overlay: "bg-black bg-opacity-90",
          container:
            "bg-gradient-to-br from-gray-900 via-orange-900 to-gray-900 text-white rounded-2xl shadow-2xl border border-orange-400/30",
          header: "border-b border-orange-400/30 bg-gray-800/50",
          title:
            "text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent",
          closeButton: "text-orange-300 hover:text-white",
          content: "bg-gray-900/30",
          description: "text-gray-300",
          sectionTitle: "text-lg font-semibold text-orange-300 mb-2",
          tag: "bg-orange-500/20 text-orange-400 border border-orange-500/30",
          githubButton: "bg-orange-600 hover:bg-orange-700 text-white",
          liveButton: "bg-red-600 hover:bg-red-700 text-white",
        };

      case "hologram":
        return {
          overlay: "bg-black bg-opacity-95",
          container:
            "bg-black/90 text-cyan-400 rounded-lg shadow-2xl border border-cyan-400/50 backdrop-blur-sm font-mono",
          header: "border-b border-cyan-400/50 bg-black/50",
          title: "text-2xl font-bold text-cyan-400 font-mono",
          closeButton: "text-cyan-400/70 hover:text-cyan-100",
          content: "bg-black/20",
          description: "text-cyan-100 font-mono text-sm",
          sectionTitle: "text-lg font-bold text-cyan-400 mb-2 font-mono",
          tag: "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 font-mono text-sm",
          githubButton:
            "bg-cyan-500/20 hover:bg-cyan-400/20 text-cyan-400 border border-cyan-400/50 font-mono",
          liveButton:
            "bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-bold",
        };

      case "samurai":
        return {
          overlay: "bg-black bg-opacity-90",
          container:
            "bg-gradient-to-br from-red-950 to-black text-white rounded-lg shadow-2xl border border-red-600/50",
          header: "border-b border-red-600/30 bg-red-950/50",
          title: "text-2xl font-bold text-red-400",
          closeButton: "text-red-400/70 hover:text-red-100",
          content: "bg-red-950/20",
          description: "text-gray-300",
          sectionTitle: "text-lg font-bold text-red-400 mb-2",
          tag: "bg-red-600/20 text-red-400 border border-red-600/50",
          githubButton:
            "bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-600/50",
          liveButton: "bg-red-600 hover:bg-red-700 text-white font-bold",
        };

      case "matrix":
        return {
          overlay: "bg-black bg-opacity-95",
          container:
            "bg-black text-green-400 rounded-lg shadow-2xl border border-green-400/50 font-mono",
          header: "border-b border-green-400/30 bg-black/80",
          title: "text-2xl font-bold text-green-400 font-mono",
          closeButton: "text-green-400/70 hover:text-green-100",
          content: "bg-black/40",
          description: "text-green-300 font-mono text-sm",
          sectionTitle: "text-lg font-bold text-green-400 mb-2 font-mono",
          tag: "bg-green-500/20 text-green-300 border border-green-400/50 font-mono text-sm",
          githubButton:
            "bg-green-500/20 hover:bg-green-400/20 text-green-400 border border-green-400/50 font-mono",
          liveButton:
            "bg-green-400 hover:bg-green-300 text-black font-mono font-bold",
        };

      case "cartoon":
        return {
          overlay: "bg-gradient-to-br from-yellow-300/80 to-pink-300/80",
          container:
            "bg-gradient-to-br from-yellow-200 to-pink-200 text-purple-800 rounded-3xl shadow-2xl border-4 border-purple-400",
          header: "border-b-4 border-purple-400 bg-yellow-100/80",
          title: "text-2xl font-bold text-purple-800 font-comic",
          closeButton: "text-purple-600 hover:text-purple-800",
          content: "bg-white/60",
          description: "text-purple-700 font-comic",
          sectionTitle: "text-lg font-bold text-purple-800 mb-2 font-comic",
          tag: "bg-purple-200 text-purple-800 border-2 border-purple-400 font-comic",
          githubButton:
            "bg-purple-400 hover:bg-purple-500 text-white border-2 border-purple-600 font-comic font-bold",
          liveButton:
            "bg-yellow-400 hover:bg-yellow-500 text-purple-800 border-2 border-yellow-600 font-comic font-bold",
        };

      case "pixel":
        return {
          overlay: "bg-black bg-opacity-90",
          container:
            "bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-green-400 rounded-lg shadow-2xl border-2 border-green-400/50 font-mono",
          header: "border-b-2 border-green-400/50 bg-black/80",
          title:
            "text-2xl font-bold text-green-400 font-mono uppercase tracking-wider",
          closeButton: "text-green-400/70 hover:text-green-100",
          content: "bg-black/40",
          description: "text-green-300 font-mono text-sm leading-relaxed",
          sectionTitle:
            "text-lg font-bold text-yellow-400 mb-2 font-mono uppercase",
          tag: "bg-green-500/20 text-green-300 border border-green-400/50 font-mono text-xs px-2 py-1",
          githubButton:
            "bg-green-500/20 hover:bg-green-400/30 text-green-400 border border-green-400/50 font-mono font-bold",
          liveButton:
            "bg-yellow-500 hover:bg-yellow-400 text-black font-mono font-bold border border-yellow-400",
        };

      case "silk":
        return {
          overlay: "bg-black bg-opacity-75",
          container:
            "bg-zinc-950 text-white rounded-lg shadow-2xl border border-zinc-900",
          header:
            "bg-gradient-to-b from-zinc-950 to-zinc-900 border-b border-gray-700 bg-gray-800",
          title: "text-2xl font-bold text-white",
          closeButton: "text-gray-400 hover:text-white",
          content: "bg-gradient-to-br from-zinc-950 to-black/30",
          description: "text-gray-300",
          sectionTitle: "text-lg font-semibold text-gray-200 mb-2",
          tag: "bg-zinc-900 text-white ",
          githubButton:
            "bg-zinc-900 hover:bg-zinc-800 transition-colors duration-200 text-white",
          liveButton: "bg-blue-600 hover:bg-blue-700 text-white",
        };

      default:
        return {
          overlay: "bg-black bg-opacity-75",
          container: "bg-white rounded-lg shadow-2xl",
          header: "border-b border-gray-200 bg-white",
          title: "text-2xl font-bold text-gray-900",
          closeButton: "text-gray-400 hover:text-gray-600",
          content: "bg-white",
          description: "text-gray-700",
          sectionTitle: "text-lg font-semibold text-gray-900 mb-2",
          tag: "bg-blue-100 text-blue-800",
          githubButton: "bg-gray-900 text-white hover:bg-gray-800",
          liveButton: "bg-blue-600 text-white hover:bg-blue-700",
        };
    }
  };

  const styles = getVariantStyles();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className={`absolute inset-0 ${styles.overlay}`}
        onClick={onClose}
      ></div>

      <div
        className={`relative ${styles.container} mx-4 max-h-[90vh] w-full max-w-4xl overflow-hidden`}
      >
        <div
          className={`flex items-center justify-between p-6 ${styles.header}`}
        >
          <h2 className={styles.title}>{project.title}</h2>
          <button
            onClick={onClose}
            className={`${styles.closeButton} transition-colors`}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className={`p-6 ${styles.content}`}>
          {project.demoUrl ? (
            <div className="mb-6 aspect-video">
              <video
                ref={videoRef}
                className="h-full w-full rounded-lg bg-black object-contain"
                controls
                autoPlay
              >
                <source src={project.demoUrl} type="video/mp4" />
                Votre navigateur ne supporte pas la lecture vidéo.
              </video>
            </div>
          ) : (
            <div className="mb-6 flex aspect-video items-center justify-center rounded-lg bg-gray-200">
              <div className="text-center text-gray-500">
                <svg
                  className="mx-auto mb-4 h-16 w-16"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                <p>Aucune vidéo disponible pour ce projet</p>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <h3 className={styles.sectionTitle}>Description</h3>
              <p
                className={`${styles.description} max-h-25 overflow-auto`}
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgb(156 163 175) transparent",
                }}
              >
                {project.description}
              </p>
            </div>

            {project.tags && project.tags.length > 0 && (
              <div>
                <h3 className={styles.sectionTitle}>Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`inline-block rounded-full px-3 py-1 text-sm ${styles.tag}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-4 pt-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center rounded-lg px-4 py-2 transition-colors ${styles.githubButton}`}
                >
                  <svg
                    className="mr-2 h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  Code Source
                </a>
              )}

              {project.liveUrl &&
                !project.liveUrl.includes("youtube") &&
                !project.liveUrl.includes("vimeo") && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center rounded-lg px-4 py-2 transition-colors ${styles.liveButton}`}
                  >
                    <svg
                      className="mr-2 h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    Voir le Projet
                  </a>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
