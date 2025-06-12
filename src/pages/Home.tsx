import { Link, Navigate } from 'react-router-dom';
import Orb from '../blocks/Backgrounds/Orb/Orb';
import { MetallicLogo } from '../components/ui/MetallicLogo';
import { isLoggedIn } from '../hooks/use-auth';

export const Home = () => {
  const loggedIn = isLoggedIn();

  if (loggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#444ea527] to-gray-400 relative">
      <Link
        to="/authentification"
        className="sticky top-4 right-4 ml-4 px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:bg-[#e4003a] hover:text-white border border-[#e4003a] text-[#e4003a] z-5"
      >
        Se connecter
      </Link>{' '}
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <Orb hue={0} hoverIntensity={0.3} />
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <MetallicLogo />
              <div className="absolute inset-0 bg-gradient-to-br from-[#e4003a]/20 to-[#444ea5]/20 rounded-full blur-2xl animate-pulse"></div>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#e4003a] to-[#444ea5] bg-clip-text text-transparent">
              ProjetR
            </span>
            <br />
            <span className="text-gray-800 font-light">Rosemont</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 font-light leading-relaxed">
            L'innovation étudiante en vitrine
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/authentification"
              className="bg-gradient-to-r from-[#e4003a] to-[#e4003a]/90 text-white px-8 py-4 rounded-full font-semibold hover:from-[#e4003a]/90 hover:to-[#e4003a] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Commencer maintenant
            </Link>
            <Link
              to="/explore"
              className="border-2 border-[#444ea5] text-[#444ea5] px-8 py-4 rounded-full font-semibold hover:bg-[#444ea5] hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              Explorer les projets
            </Link>
          </div>
        </div>
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
              Pourquoi <span className="text-[#e4003a]">ProjetR</span> ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une plateforme dédiée aux étudiants de Rosemont pour partager et
              découvrir des projets innovants
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#e4003a] to-[#e4003a]/80 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <i className="bi bi-code-slash text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Projets Étudiants
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Découvrez et partagez les projets créatifs et innovants réalisés
                par les étudiants de Rosemont
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#444ea5] to-[#444ea5]/80 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <i className="bi bi-people text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Collaboration
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Connectez-vous avec d'autres étudiants, partagez vos idées et
                collaborez sur des projets passionnants
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#e4003a] to-[#444ea5] rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <i className="bi bi-star text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Excellence
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Mettez en valeur vos compétences et créez un portfolio
                professionnel pour votre future carrière
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#e4003a] to-[#444ea5]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
            Rejoignez la communauté ProjetR
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                500+
              </div>
              <div className="text-xl text-white/80">Projets partagés</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                200+
              </div>
              <div className="text-xl text-white/80">Étudiants actifs</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                50+
              </div>
              <div className="text-xl text-white/80">
                Programmes représentés
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Prêt à partager vos projets ?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Rejoignez ProjetR Rosemont dès aujourd'hui et commencez à construire
            votre portfolio étudiant
          </p>
          <Link
            to="/authentification"
            className="inline-block bg-gradient-to-r from-[#e4003a] to-[#444ea5] text-white px-10 py-4 rounded-full font-semibold hover:from-[#e4003a]/90 hover:to-[#444ea5]/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Créer mon compte
          </Link>
        </div>
      </section>
    </div>
  );
};
