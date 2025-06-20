import { FC } from "react";
import { useParams } from "react-router-dom";
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
  RondureTemplate,
  SamuraiTemplate,
  SilkTemplate
} from "../components/portfolio/templates";
import { useCurrentUser } from "../hooks/use-auth";
import { useProjectsByUserId } from "../hooks/use-project";
import { createMockPortfolio, PortfolioTemplate } from "../types/Portfolio";

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
    case "rondure":
      return <RondureTemplate {...templateProps} />;
    default:
      return <div className="p-8 text-center">Template not found</div>;
  }
};
