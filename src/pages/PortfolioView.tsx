import { FC } from "react";
import { Navigate, useParams } from "react-router-dom";
import {
  ClassicTemplate,
  CupertinoTemplate,
  MatrixTemplate,
  MinimalistTemplate,
  RondureTemplate,
  SilkTemplate,
} from "../components/portfolio/templates";
import { useCurrentUser } from "../hooks/use-auth";
import { usePortfolioById } from "../hooks/use-portfolios";

export const PortfolioView: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: currentUser } = useCurrentUser();
  const { data: portfolio, isLoading, error } = usePortfolioById(id);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Chargement du portfolio...</p>
        </div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">
            Portfolio non trouvé
          </h1>
          <p className="mb-6 text-gray-600">
            Le portfolio que vous recherchez n&apos;existe pas ou a été
            supprimé.
          </p>
          <button
            onClick={() => window.history.back()}
            className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
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
        return <MinimalistTemplate {...templateProps} />;
    }
  };

  return <div className="portfolio-view">{renderTemplate()}</div>;
};
