import { FC, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProfilStats } from "./ProfilStats";
import { usePortfolioByUserId } from "../../hooks/use-portfolios";
import { useCurrentUser } from "../../hooks/use-auth";

interface ProfilContentProps {
  firstName: string;
  lastName: string;
  pseudo: string;
  userId: string;
}

export const ProfilContent: FC<ProfilContentProps> = ({
  firstName,
  lastName,
  pseudo,
  userId,
}) => {
  const navigate = useNavigate();
  const { data: currentUser } = useCurrentUser();
  const isCurrentUser = useMemo(
    () => currentUser?.id === userId,
    [currentUser?.id, userId],
  );

  const { data: portfolio, isLoading, error } = usePortfolioByUserId(userId);

  const hasNoPortfolio =
    error &&
    "response" in error &&
    (error as { response?: { status?: number } }).response?.status === 404;

  const shouldShowCreateButton =
    isCurrentUser && !isLoading && (!portfolio || hasNoPortfolio);
  const shouldShowViewButton =
    !isCurrentUser && portfolio && portfolio.isPublic && !isLoading;
  const shouldShowPortfolioButtons =
    isCurrentUser && portfolio && !hasNoPortfolio;

  const handleViewPortfolio = () => {
    if (portfolio) {
      navigate(`/portfolio/${portfolio.id}`);
    }
  };

  const handleEditPortfolio = () => {
    if (portfolio) {
      navigate(`/portfolio/${portfolio.id}/edit`);
    }
  };
  return (
    <div className="mt-16 md:mt-4 flex flex-col w-full max-w-6xl mx-auto px-4 leading-[2.25rem]">
      <div className="profil-info">
        <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl m-0">
              {firstName} {lastName}
            </h1>
            <p className="text-xl md:text-2xl text-black/50 m-0 mt-2">
              @{pseudo}
            </p>
          </div>

          {isCurrentUser && (
            <div className="flex-shrink-0">
              {shouldShowCreateButton ? (
                <Link
                  to="/create-portfolio"
                  className="cursor-pointer group inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <svg
                    className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Créer un Portfolio
                </Link>
              ) : isLoading ? (
                <div className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-400 rounded-xl text-sm font-medium">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Chargement...
                </div>
              ) : shouldShowPortfolioButtons ? (
                <div className="flex gap-3">
                  <button
                    onClick={handleViewPortfolio}
                    className="cursor-pointer group inline-flex items-center px-5 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <svg
                      className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    Voir Portfolio
                  </button>
                  <button
                    onClick={handleEditPortfolio}
                    className="cursor-pointer group inline-flex items-center px-5 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <svg
                      className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Modifier Portfolio
                  </button>
                </div>
              ) : null}
            </div>
          )}

          {shouldShowViewButton && (
            <div className="flex-shrink-0">
              <button
                onClick={handleViewPortfolio}
                className="cursor-pointer group inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg
                  className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                Voir Portfolio
              </button>
            </div>
          )}
        </div>
      </div>

      <ProfilStats />
    </div>
  );
};
