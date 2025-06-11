import { FC } from "react";
import { PortfolioTemplate, createMockPortfolio } from "../../types/Portfolio";
import { useCurrentUser } from "../../hooks/use-auth";
import { useProjectsByUserId } from "../../hooks/use-project";
import {
  ModernTemplate,
  ClassicTemplate,
  CreativeTemplate,
  MinimalistTemplate,
  DeveloperTemplate,
  DesignerTemplate,
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

  // Create mock portfolio with user's actual projects
  const mockPortfolio = createMockPortfolio(
    user,
    template,
    projects.slice(0, 6),
  );

  const renderTemplate = () => {
    const templateProps = { portfolio: mockPortfolio, isPreview: true };

    switch (template) {
      case "modern":
        return <ModernTemplate {...templateProps} />;
      case "classic":
        return <ClassicTemplate {...templateProps} />;
      case "creative":
        return <CreativeTemplate {...templateProps} />;
      case "minimalist":
        return <MinimalistTemplate {...templateProps} />;
      case "developer":
        return <DeveloperTemplate {...templateProps} />;
      case "designer":
        return <DesignerTemplate {...templateProps} />;
      default:
        return <div className="p-8 text-center">Template not found</div>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-75"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-lg shadow-2xl max-w-6xl max-h-[90vh] w-full mx-4 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
          <h2 className="text-2xl font-bold text-gray-900 capitalize">
            {template} Template Preview
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
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
          <div className="absolute top-4 left-4 z-10 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
            Preview Mode
          </div>

          <div className="h-[70vh] overflow-y-auto bg-gray-100">
            <div className="transform-gpu">{renderTemplate()}</div>
          </div>
        </div>

        <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-600">
            This is a preview of how your portfolio will look with the{" "}
            {template} template.
          </p>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Close Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
