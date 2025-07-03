import { FC } from "react";
import { useCurrentUser } from "../../hooks/use-auth";
import { useProjectsByUserId } from "../../hooks/use-project";
import { PortfolioTemplate, createMockPortfolio } from "../../types/Portfolio";
import {
  ClassicTemplate,
  CupertinoTemplate,
  MatrixTemplate,
  MinimalistTemplate,
  RondureTemplate,
  SilkTemplate,
} from "./templates";

interface TemplatePreviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  template: PortfolioTemplate;
}

export const TemplatePreviewDialog: FC<TemplatePreviewDialogProps> = ({
  isOpen,
  onClose,
  template,
}) => {
  const { data: user } = useCurrentUser();
  const { data: projects = [] } = useProjectsByUserId(user?.id);

  if (!isOpen || !user) return null;

  const mockPortfolio = createMockPortfolio(
    user,
    template,
    projects.slice(0, 6),
  );

  const renderTemplate = () => {
    const templateProps = { portfolio: mockPortfolio, isPreview: true };

    switch (template) {
      case "classic":
        return <ClassicTemplate {...templateProps} />;
      case "minimalist":
        return <MinimalistTemplate {...templateProps} />;
      case "cupertino":
        return <CupertinoTemplate {...templateProps} />;
      case "matrix":
        return <MatrixTemplate {...templateProps} />;
      case "silk":
        return <SilkTemplate {...templateProps} />;
      case "rondure":
        return <RondureTemplate {...templateProps} />;
      default:
        return <div className="p-8 text-center">Template introuvable</div>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="bg-opacity-75 absolute inset-0 bg-black"
        onClick={onClose}
      ></div>

      <div className="relative mx-4 max-h-[90vh] w-full max-w-6xl overflow-hidden rounded bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-200 bg-white p-6">
          <h2 className="text-2xl font-bold text-[#444ea5] capitalize">
            Aperçu du modèle {template}
          </h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-400 transition-colors hover:text-gray-600"
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

        <div className="relative">
          <div className="bg-opacity-50 absolute top-4 left-4 z-10 rounded-full bg-[#cccfeb] px-3 py-1 text-sm text-[#444ea5]">
            Mode aperçu
          </div>

          <div className="max-h-[35rem] overflow-y-auto bg-gray-100">
            <div className="max-h-[45rem]">{renderTemplate()}</div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 p-6">
          <p className="text-sm text-gray-600">
            Ceci est un apércu du template {template}.
          </p>
          <div className="flex space-x-3">
            <a
              href={`/portfolio/full-preview/${template}`}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer rounded bg-[#444ea5] p-2 text-white transition-colors hover:bg-[#333a7f]"
            >
              Voir dans un nouvel onglet
            </a>
            <button
              onClick={onClose}
              className="cursor-pointer rounded border border-[#e4003a] p-2 text-[#e4003a] transition-colors hover:bg-[#e4003a] hover:text-white"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
