import { FC } from "react";
import { useParams } from "react-router-dom";
import {
  ClassicTemplate,
  CupertinoTemplate,
  MatrixTemplate,
  MinimalistTemplate,
  PixelTemplate,
  RondureTemplate,
  SilkTemplate,
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
    projects.slice(0, 6),
  );

  const templateProps = { portfolio: mockPortfolio, isPreview: false };

  switch (template) {
    case "classic":
      return <ClassicTemplate {...templateProps} />;
    case "minimalist":
      return <MinimalistTemplate {...templateProps} />;
    case "cupertino":
      return <CupertinoTemplate {...templateProps} />;
    case "matrix":
      return <MatrixTemplate {...templateProps} />;
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
