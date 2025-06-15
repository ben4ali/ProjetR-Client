import { FC } from "react";
import { useCurrentUser } from "../hooks/use-auth";
import { useProjectsByUserId } from "../hooks/use-project";
import { createMockPortfolio, PortfolioTemplate } from "../types/Portfolio";
import { useParams } from "react-router-dom";
import {
  ModernTemplate,
  ClassicTemplate,
  CreativeTemplate,
  MinimalistTemplate,
  DeveloperTemplate,
  DesignerTemplate,
  NeuralTemplate,
  PrismTemplate,
  CupertinoTemplate,
  QuantumTemplate,
  MeteorTemplate,
  HologramTemplate,
  SamuraiTemplate,
  MatrixTemplate,
  CartoonTemplate,
  PixelTemplate,
  SilkTemplate,
} from "../components/portfolio/templates";

export const FullPortfolioPreview: FC = () => {
  const { data: user } = useCurrentUser();
  const { data: projects = [] } = useProjectsByUserId(user?.id);

  const { template } = useParams<{ template: PortfolioTemplate }>();

  if (!user || !template) return null;

  const mockPortfolio = createMockPortfolio(
    user,
    template,
    projects.slice(0, 6)
  );

  const templateProps = { portfolio: mockPortfolio, isPreview: false };

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
    case "silk":
      return <SilkTemplate {...templateProps} />;
    default:
      return <div className="p-8 text-center">Template not found</div>;
  }
};
