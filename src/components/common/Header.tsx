import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn, logout, useCurrentUser } from '../../hooks/use-auth';

export const Navbar = () => {
  const loggedIn = isLoggedIn();
  const { data: user, isSuccess } = useCurrentUser();
  const navigate = useNavigate();
  const [avatarTimestamp, setAvatarTimestamp] = useState(new Date().getTime());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const dialogRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const prevAvatarRef = useRef<string | null>(null);

  useEffect(() => {
    if (isSuccess && user && user.avatar !== prevAvatarRef.current) {
      prevAvatarRef.current = user.avatar;
      setAvatarTimestamp(new Date().getTime());
      console.log('Avatar changed, updating timestamp:', new Date().getTime());
    }
  }, [user?.avatar, isSuccess]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node) &&
        isDialogOpen
      ) {
        closeDialog();
      }

      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        isMobileMenuOpen
      ) {
        closeMobileMenu();
      }
    };

    if (isDialogOpen || isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDialogOpen, isMobileMenuOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isDialogOpen) {
        closeDialog();
      }
      if (event.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    if (isDialogOpen || isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isDialogOpen, isMobileMenuOpen]);

  const openDialog = () => {
    setIsDialogOpen(true);
    gsap.set(dialogRef.current, { display: 'block' });
    gsap.fromTo(
      dialogRef.current,
      {
        opacity: 0,
        y: -10,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: 'power2.out',
      }
    );
  };

  const closeDialog = () => {
    gsap.to(dialogRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.15,
      ease: 'power2.in',
      onComplete: () => {
        gsap.set(dialogRef.current, { display: 'none' });
        setIsDialogOpen(false);
      },
    });
  };

  const toggleDialog = () => {
    if (isDialogOpen) {
      closeDialog();
    } else {
      openDialog();
    }
  };

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
    gsap.set(mobileMenuRef.current, { display: 'block' });
    gsap.fromTo(
      mobileMenuRef.current,
      {
        opacity: 0,
        x: '100%',
      },
      {
        opacity: 1,
        x: '0%',
        duration: 0.3,
        ease: 'power2.out',
      }
    );
  };

  const closeMobileMenu = () => {
    gsap.to(mobileMenuRef.current, {
      opacity: 0,
      x: '100%',
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        gsap.set(mobileMenuRef.current, { display: 'none' });
        setIsMobileMenuOpen(false);
      },
    });
  };

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };

  const handleSearch = () => {
    if (searchText.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchText.trim())}`);
      setSearchText('');
      // Fermer le menu mobile si ouvert
      if (isMobileMenuOpen) {
        closeMobileMenu();
      }
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <nav className="sticky top-0 bg-neutral-100 shadow z-50 w-full flex justify-between items-center px-[5%] text-gray-600/80 h-20">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="flex items-center gap-1">
            <img
              src="/logo_rosemont.png"
              alt="logo"
              className="h-12 opacity-80"
            />
            <div className="hidden lg:block text-gray-700 whitespace-nowrap border-b-1 pb-1 border-[#e4003a]">
              <span className="text-lg font-bold text-[#e4003a]">ProjetR </span>
              {' - '}
              <span className="font-semibold text-sm">
                L'innovation étudiante en vitrine
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-12 w-3/4 items-center justify-end lg:gap-5 lg:w-[90%]">
          <li>
            <Link
              to="/dashboard"
              className="text-gray-600/70 no-underline transition-all duration-200 hover:text-black/90"
            >
              Tableau de bord
            </Link>
          </li>
          <li>
            <Link
              to="/explore"
              className="text-gray-600/70 no-underline transition-all duration-200 hover:text-black/90"
            >
              Explorer
            </Link>
          </li>
          <div className="flex items-center gap-4 w-[30%] relative">
            <i className="bi bi-search absolute left-5 text-black/50"></i>
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="rounded-full py-2 px-4 pl-12 w-full border border-black/20 outline-none text-black/75 bg-transparent transition-all duration-200 focus:border-black/50 focus:bg-black/5"
            />
            <button
              onClick={handleSearch}
              className="absolute right-3 p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
              type="button"
            >
              <i className="bi bi-search text-black/50 hover:text-black/70"></i>
            </button>
          </div>

          {loggedIn ? (
            <li>
              <div
                className="relative h-10 w-10 text-2xl rounded-full transition-all duration-300 hover:bg-white/30 hover:shadow-lg hover:shadow-red-300 cursor-pointer lg:text-base"
                onClick={toggleDialog}
                ref={userMenuRef}
              >
                <img
                  src={`${
                    user?.avatar || 'https://robohash.org/default.png'
                  }?t=${avatarTimestamp}`}
                  alt="Avatar"
                  className={`h-10 w-10 rounded-full bg-white/15 border border-gray-600 object-cover cursor-pointer transition-all duration-200 ${
                    isDialogOpen
                      ? 'ring-2 ring-[#e4003a] ring-offset-2 shadow-lg scale-105'
                      : 'ring-2 ring-transparent hover:ring-gray-300'
                  }`}
                  crossOrigin="anonymous"
                  referrerPolicy="no-referrer"
                />
                <div ref={dialogRef} style={{ display: 'none', opacity: 0 }}>
                  <div className="absolute top-full right-0 mt-2 w-56 bg-gradient-to-br from-white via-gray-50 to-blue-50 border border-gray-200/60 rounded shadow-2xl backdrop-blur-sm z-50 overflow-hidden">
                    <div className="bg-gradient-to-br from-[#e4003a] to-[#444ea5] p-3 text-white">
                      <p className="font-semibold text-sm leading-tight">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-blue-100 text-xs opacity-90 mt-1">
                        @{user?.username?.toLowerCase()}
                      </p>
                    </div>

                    <div className="p-1.5">
                      <Link
                        to={`/profil/${user?.id}`}
                        className="flex items-center px-3 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 rounded-lg transition-all duration-200 group"
                        onClick={closeDialog}
                      >
                        <i className="bi bi-person-circle text-sm mr-2.5 group-hover:scale-110 transition-transform"></i>
                        <span className="font-medium text-sm">Mon Profil</span>
                      </Link>

                      <Link
                        to="/publish"
                        className="flex items-center px-3 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:text-green-700 rounded-lg transition-all duration-200 group"
                        onClick={closeDialog}
                      >
                        <i className="bi bi-plus-circle-fill text-sm mr-2.5 group-hover:scale-110 transition-transform"></i>
                        <span className="font-medium text-sm">Publier</span>
                      </Link>

                      <Link
                        to="/favorites"
                        className="flex items-center px-3 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-700 rounded-lg transition-all duration-200 group"
                        onClick={closeDialog}
                      >
                        <i className="bi bi-heart-fill text-sm mr-2.5 group-hover:scale-110 transition-transform"></i>
                        <span className="font-medium text-sm">Mes Favoris</span>
                      </Link>

                      {/* Divider */}
                      <div className="my-1.5 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

                      <Link
                        to="/authentification"
                        onClick={() => {
                          logout();
                          closeDialog();
                        }}
                        className="flex items-center px-3 py-2 text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-700 rounded-lg transition-all duration-200 group"
                      >
                        <i className="bi bi-box-arrow-right text-sm mr-2.5 group-hover:scale-110 transition-transform"></i>
                        <span className="font-medium text-sm">Déconnexion</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ) : (
            <li>
              <Link
                className="h-10 w-10 text-2xl rounded-full relative hover:bg-white/30 transition-all duration-200 flex items-center justify-center lg:text-base"
                to="/authentification"
              >
                <i className="bi bi-person-fill"></i>
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          {loggedIn && (
            <div className="h-8 w-8">
              <img
                src={`${
                  user?.avatar || 'https://robohash.org/default.png'
                }?t=${avatarTimestamp}`}
                alt="Avatar"
                className="h-8 w-8 rounded-full bg-white/15 border border-gray-600 object-cover"
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            aria-label="Menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span
                className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                  isMobileMenuOpen
                    ? 'rotate-45 translate-y-1'
                    : '-translate-y-0.5'
                }`}
              ></span>
              <span
                className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              ></span>
              <span
                className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                  isMobileMenuOpen
                    ? '-rotate-45 -translate-y-1'
                    : 'translate-y-0.5'
                }`}
              ></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        style={{ display: 'none', opacity: 0 }}
        className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-[60] transform translate-x-full md:hidden"
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="bg-gradient-to-r from-[#e4003a] to-[#444ea5] p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">ProjetR</h2>
                <p className="text-sm opacity-90">Menu Principal</p>
              </div>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <i className="bi bi-x-lg text-xl"></i>
              </button>
            </div>
          </div>

          {/* Mobile Menu Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Search Bar */}
            <div className="relative mb-6">
              <i className="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4003a] focus:border-transparent"
              />
              <button
                onClick={handleSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
                type="button"
              >
                <i className="bi bi-search text-gray-400 hover:text-gray-600"></i>
              </button>
            </div>

            {/* Navigation Links */}
            <div className="space-y-2">
              <Link
                to="/dashboard"
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                onClick={closeMobileMenu}
              >
                <i className="bi bi-speedometer2 text-lg mr-3 text-[#e4003a]"></i>
                <span className="font-medium">Tableau de bord</span>
              </Link>

              <Link
                to="/explore"
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                onClick={closeMobileMenu}
              >
                <i className="bi bi-compass text-lg mr-3 text-[#e4003a]"></i>
                <span className="font-medium">Explorer</span>
              </Link>

              {loggedIn && (
                <>
                  <div className="border-t border-gray-200 my-4"></div>

                  <Link
                    to={`/profil/${user?.id}`}
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    onClick={closeMobileMenu}
                  >
                    <i className="bi bi-person-circle text-lg mr-3 text-blue-600"></i>
                    <span className="font-medium">Mon Profil</span>
                  </Link>

                  <Link
                    to="/publish"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    onClick={closeMobileMenu}
                  >
                    <i className="bi bi-plus-circle-fill text-lg mr-3 text-green-600"></i>
                    <span className="font-medium">Publier</span>
                  </Link>

                  <Link
                    to="/favorites"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    onClick={closeMobileMenu}
                  >
                    <i className="bi bi-heart-fill text-lg mr-3 text-red-600"></i>
                    <span className="font-medium">Mes Favoris</span>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Footer */}
          <div className="p-4 border-t border-gray-200">
            {loggedIn ? (
              <div className="space-y-3">
                {/* User Info */}
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={`${
                      user?.avatar || 'https://robohash.org/default.png'
                    }?t=${avatarTimestamp}`}
                    alt="Avatar"
                    className="h-10 w-10 rounded-full object-cover"
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-gray-500 text-xs">
                      @{user?.username?.toLowerCase()}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                  className="w-full flex items-center justify-center px-4 py-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors duration-200"
                >
                  <i className="bi bi-box-arrow-right text-lg mr-2"></i>
                  <span className="font-medium">Déconnexion</span>
                </button>
              </div>
            ) : (
              <Link
                to="/authentification"
                className="w-full flex items-center justify-center px-4 py-3 bg-[#e4003a] text-white rounded-lg hover:bg-[#c2002e] transition-colors duration-200"
                onClick={closeMobileMenu}
              >
                <i className="bi bi-person-fill text-lg mr-2"></i>
                <span className="font-medium">Se connecter</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-[55] md:hidden"
          onClick={closeMobileMenu}
        ></div>
      )}
    </>
  );
};
