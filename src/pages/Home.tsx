import { Link, Navigate } from "react-router-dom";
import Orb from "../blocks/Backgrounds/Orb/Orb";
import { MembersComponent } from "../components/home/MembersComponent";
import { MetallicLogo } from "../components/ui/MetallicLogo";
import { isLoggedIn } from "../hooks/use-auth";
import "../styles/style-home.css"; // Assuming you have a CSS file for home styles

export const Home = () => {
  const loggedIn = isLoggedIn();

  if (loggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#444ea527] to-gray-400">
      <Link
        to="/authentification"
        className="sticky top-4 right-4 z-5 ml-4 transform rounded-full border border-[#e4003a] px-6 py-2 font-semibold text-[#e4003a] transition-all duration-300 hover:bg-[#e4003a] hover:text-white"
      >
        Se connecter
      </Link>
      {/* Hero Section */}
      <section className="pointer-events-none relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="pointer-events-auto absolute inset-0">
          <Orb />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <MetallicLogo />
              <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-[#e4003a]/20 to-[#444ea5]/20 blur-2xl"></div>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="mb-6 text-4xl font-bold md:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-[#e4003a] to-[#444ea5] bg-clip-text text-transparent">
              ProjetR
            </span>
            <br />
            <span className="font-light text-gray-800">Rosemont</span>
          </h1>

          {/* Subtitle */}
          <p className="mb-8 text-xl leading-relaxed font-light text-gray-600 md:text-2xl">
            L'innovation étudiante en vitrine
          </p>

          {/* CTA Buttons */}
          <div className="pointer-events-auto flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/authentification"
              className="transform rounded-full bg-gradient-to-r from-[#e4003a] to-[#e4003a]/90 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-[#e4003a]/90 hover:to-[#e4003a] hover:shadow-xl"
            >
              Commencer maintenant
            </Link>
            <Link
              to="/explore"
              className="transform rounded-full border-2 border-[#444ea5] px-8 py-4 font-semibold text-[#444ea5] transition-all duration-300 hover:scale-105 hover:bg-[#444ea5] hover:text-white"
            >
              Explorer les projets
            </Link>
          </div>
        </div>
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce">
          <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white">
            <div className="mt-2 h-3 w-1 animate-pulse rounded-full bg-white"></div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-5xl">
              Pourquoi <span className="text-[#e4003a]">ProjetR</span> ?
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Une plateforme dédiée aux étudiants de Rosemont pour partager et
              découvrir des projets innovants
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="group text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 transform items-center justify-center rounded-2xl bg-gradient-to-br from-[#e4003a] to-[#e4003a]/80 transition-transform duration-300 group-hover:scale-110">
                <i className="bi bi-code-slash text-2xl text-white"></i>
              </div>
              <h3 className="mb-4 text-xl font-semibold text-gray-800">
                Projets Étudiants
              </h3>
              <p className="leading-relaxed text-gray-600">
                Découvrez et partagez les projets créatifs et innovants réalisés
                par les étudiants de Rosemont
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 transform items-center justify-center rounded-2xl bg-gradient-to-br from-[#444ea5] to-[#444ea5]/80 transition-transform duration-300 group-hover:scale-110">
                <i className="bi bi-people text-2xl text-white"></i>
              </div>
              <h3 className="mb-4 text-xl font-semibold text-gray-800">
                Collaboration
              </h3>
              <p className="leading-relaxed text-gray-600">
                Connectez-vous avec d'autres étudiants, partagez vos idées et
                collaborez sur des projets passionnants
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 transform items-center justify-center rounded-2xl bg-gradient-to-br from-[#e4003a] to-[#444ea5] transition-transform duration-300 group-hover:scale-110">
                <i className="bi bi-star text-2xl text-white"></i>
              </div>
              <h3 className="mb-4 text-xl font-semibold text-gray-800">
                Excellence
              </h3>
              <p className="leading-relaxed text-gray-600">
                Mettez en valeur vos compétences et créez un portfolio
                professionnel pour votre future carrière
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="bg-gradient-to-r from-[#e4003a] to-[#444ea5] px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-12 text-3xl font-bold text-white md:text-4xl">
            Rejoignez la communauté ProjetR
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-white md:text-5xl">
                500+
              </div>
              <div className="text-xl text-white/80">Projets partagés</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-white md:text-5xl">
                200+
              </div>
              <div className="text-xl text-white/80">Étudiants actifs</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-white md:text-5xl">
                50+
              </div>
              <div className="text-xl text-white/80">Cours représentés</div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative flex w-full flex-col items-center bg-white">
        <MembersComponent />
      </section>
      {/* CTA Section */}
      <section className="bg-[#444ea5] px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            Prêt à partager vos projets ?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-white">
            Rejoignez ProjetR Rosemont dès aujourd'hui et commencez à construire
            votre portfolio étudiant
          </p>
          <Link
            to="/authentification"
            className="inline-block transform rounded-full bg-gradient-to-r from-[#e4003a] to-[#e4003a]/90 px-10 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-[#e4003a]/80 hover:to-[#e4003a]/70 hover:shadow-xl"
          >
            Créer mon compte
          </Link>
        </div>
      </section>
    </div>
  );
};
