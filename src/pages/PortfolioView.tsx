import { FC } from "react";
import { Navigate, useParams } from "react-router-dom";
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
} from "../components/portfolio/templates";
import { useCurrentUser } from "../hooks/use-auth";
import { usePortfolioById } from "../hooks/use-portfolios";

export const PortfolioView: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: currentUser } = useCurrentUser();
  const { data: portfolio, isLoading, error } = usePortfolioById(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du portfolio...</p>
        </div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Portfolio non trouvé
          </h1>
          <p className="text-gray-600 mb-6">
            Le portfolio que vous recherchez n&apos;existe pas ou a été
            supprimé.
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

  const isOwner = currentUser?.id === portfolio.user?.id;
  if (!portfolio.isPublic && !isOwner) {
    return <Navigate to="/" replace />;
  }

  const renderTemplate = () => {
    const templateProps = { portfolio, isPreview: false };

    switch (portfolio.template) {
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
      case "neural":
        return <NeuralTemplate {...templateProps} />;
      case "prism":
        return <PrismTemplate {...templateProps} />;
      case "cupertino":
        return <CupertinoTemplate {...templateProps} />;
      case "quantum":
        return <QuantumTemplate {...templateProps} />;
      case "meteor":
        return <MeteorTemplate {...templateProps} />;
      case "hologram":
        return <HologramTemplate {...templateProps} />;
      case "samurai":
        return <SamuraiTemplate {...templateProps} />;
      case "matrix":
        return <MatrixTemplate {...templateProps} />;
      case "cartoon":
        return <CartoonTemplate {...templateProps} />;
      case "pixel":
        return <PixelTemplate {...templateProps} />;
      default:
        return <ModernTemplate {...templateProps} />;
    }
  };

  return <div className="portfolio-view">{renderTemplate()}</div>;
};
