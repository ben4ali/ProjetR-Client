import { FC } from 'react';
import type { Portfolio } from '../../../types/Portfolio';

interface RondureTemplateProps {
	portfolio: Portfolio;
	isPreview?: boolean;
}

export const RondureTemplate:FC<RondureTemplateProps> =(
	{ portfolio, isPreview = false }: RondureTemplateProps
) => {
  return (
    <div
      className="relative flex min-h-screen flex-col overflow-hidden bg-[rgb(10,10,10)] text-white"
    >
			{/* TODO HEADER AFTER */}
			<nav>

			</nav>

			{/* HERO SECTION */}
			<section>

			</section>

			{/* TODO FOOTER AFTER */}
			<footer>

			</footer>
    </div>
  );
}

export default RondureTemplate;
