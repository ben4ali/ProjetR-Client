import { FC } from 'react';
import { useCurrentUser } from '../../hooks/use-auth';
import { useProjectsByUserId } from '../../hooks/use-project';
import { PortfolioTemplate, createMockPortfolio } from '../../types/Portfolio';
import {
  CartoonTemplate,
  ClassicTemplate,
  CreativeTemplate,
  CupertinoTemplate,
  DesignerTemplate,
  DeveloperTemplate,
  HologramTemplate,
  MatrixTemplate,
  MeteorTemplate,
  MinimalistTemplate,
  ModernTemplate,
  NeuralTemplate,
  PixelTemplate,
  PrismTemplate,
  QuantumTemplate,
  SamuraiTemplate,
  SilkTemplate,
} from './templates';

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
    projects.slice(0, 6)
  );

  const renderTemplate = () => {
    const templateProps = { portfolio: mockPortfolio, isPreview: true };

    switch (template) {
      case 'modern':
        return <ModernTemplate {...templateProps} />;
      case 'classic':
        return <ClassicTemplate {...templateProps} />;
      case 'creative':
        return <CreativeTemplate {...templateProps} />;
      case 'minimalist':
        return <MinimalistTemplate {...templateProps} />;
      case 'developer':
        return <DeveloperTemplate {...templateProps} />;
      case 'designer':
        return <DesignerTemplate {...templateProps} />;
      case 'neural':
        return <NeuralTemplate {...templateProps} />;
      case 'prism':
        return <PrismTemplate {...templateProps} />;
      case 'cupertino':
        return <CupertinoTemplate {...templateProps} />;
      case 'quantum':
        return <QuantumTemplate {...templateProps} />;
      case 'meteor':
        return <MeteorTemplate {...templateProps} />;
      case 'hologram':
        return <HologramTemplate {...templateProps} />;
      case 'samurai':
        return <SamuraiTemplate {...templateProps} />;
      case 'matrix':
        return <MatrixTemplate {...templateProps} />;
      case 'cartoon':
        return <CartoonTemplate {...templateProps} />;
      case 'pixel':
        return <PixelTemplate {...templateProps} />;
      case 'silk':
        return <SilkTemplate {...templateProps} />;
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

      <div className="relative bg-white rounded shadow-2xl max-w-6xl max-h-[90vh] w-full mx-4 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
          <h2 className="text-2xl font-bold text-[#444ea5] capitalize">
            Aperçu du modèle {template}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
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
          <div className="absolute top-4 left-4 z-10 bg-[#cccfeb] bg-opacity-50 text-[#444ea5] px-3 py-1 rounded-full text-sm">
            Mode aperçu
          </div>

          <div className="max-h-[35rem] overflow-y-auto bg-gray-100">
            <div className="max-h-[45rem]">{renderTemplate()}</div>
          </div>
        </div>

        <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-600">
            Ceci est un apércu du template {template}. 
          </p>
          <div className="flex space-x-3">
            <a
              href={`/portfolio/full-preview/${template}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-[#444ea5] text-white rounded hover:bg-[#333a7f] cursor-pointer transition-colors"
            >
              Voir dans un nouvel onglet
            </a>
            <button
              onClick={onClose}
              className="p-2 border border-[#e4003a] rounded text-[#e4003a] hover:bg-[#e4003a] hover:text-white cursor-pointer transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
