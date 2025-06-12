/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import {
  useFirebaseGoogleLogin,
  useGoogleLogin,
  useSignup,
} from '../../hooks/use-auth';

interface SignupProps {
  toggleForm: () => void;
}

export const Signup: React.FC<SignupProps> = ({ toggleForm }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const signupMutation = useSignup();
  const firebaseGoogleLoginMutation = useFirebaseGoogleLogin();
  const googleLoginMutation = useGoogleLogin();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error('Les mots de passe ne correspondent pas.');
      return;
    }
    signupMutation.mutate(
      { firstName, lastName, username, email, password },
      {
        onSuccess: () => {
          window.location.href = '/dashboard';
        },
        onError: (err: Error | unknown) => {
          console.error("Erreur lors de l'inscription :", err);
        },
      }
    );
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await firebaseGoogleLoginMutation.mutateAsync();
      console.log('✅ Firebase Google Sign-Up Success:', result.user.email);

      await googleLoginMutation.mutateAsync({ idToken: result.idToken });
      console.log('✅ Backend authentication success');

      // AuthManager handles token storage via the mutation's onSuccess
      window.location.href = '/explore';
    } catch (error: any) {
      console.error('❌ Google Sign-Up Error:', error);

      if (error.code === 'auth/popup-closed-by-user') {
        console.log('User closed the sign-up popup');
        firebaseGoogleLoginMutation.reset();
      } else if (error.code === 'auth/popup-blocked') {
        alert('Please allow popups for this site to sign up with Google');
        firebaseGoogleLoginMutation.reset();
      } else if (error.message?.includes('Firebase')) {
        alert(
          'Authentication service unavailable. Please check your internet connection.'
        );
        firebaseGoogleLoginMutation.reset();
      } else {
        alert('Sign-up failed. Please try again.');
        firebaseGoogleLoginMutation.reset();
      }
    }
  };
  return (
    <div className="backdrop-blur-md md:scale-100 scale-90 form-container signup w-[32vw] min-w-[30rem] max-w-[28rem] rounded-[5px] bg-stone-200/60 flex flex-col p-8 items-center shadow-lg mt-[5%] min-h-[70vh]  z-5 relative">
      <div className="form-header flex justify-center w-full">
        <h3 className="text-[40px] mb-5 text-[#444ea5] font-semibold">
          Inscription
        </h3>
      </div>
      <div className="form-content flex flex-col w-[95%] h-full">
        <form
          method="POST"
          onSubmit={handleSignUp}
          className="flex flex-col gap-4 h-full relative"
        >
          <div className="input-group duo flex flex-row gap-4">
            <div className="input-group flex flex-col gap-1 w-[48%]">
              <label className="text-[18px] text-black/90">Prénom</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                placeholder="Prénom"
                className="bg-transparent px-2 py-2 border-2 border-black/20 rounded-[5px] text-[15px] transition-colors focus:border-[#9da3dd] focus:bg-[#444ea513] outline-0"
              />
            </div>
            <div className="input-group flex flex-col gap-1 w-[48%]">
              <label className="text-[18px] text-black/90">Nom</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                placeholder="Nom"
                className="bg-transparent px-2 py-2 border-2 border-black/20 rounded-[5px] text-[15px] outline-0 transition-colors focus:border-[rgb(157,163,221)] focus:bg-[#444ea513] "
              />
            </div>
          </div>
          <div className="input-group flex flex-col gap-1">
            <label className="text-[18px] text-black/90">Pseudo</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Pseudo"
              className="bg-transparent px-2 py-2 border-2 border-black/20 rounded-[5px] text-[15px] transition-colors focus:border-[#9da3dd] focus:bg-[#444ea513] outline-none"
            />
          </div>
          <div className="input-group flex flex-col gap-1">
            <label className="text-[18px] text-black/90">Courriel</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="johndoe@gmail.com"
              className="bg-transparent px-2 py-2 border-2 border-black/20 rounded-[5px] text-[15px] transition-colors focus:border-[#9da3dd] focus:bg-[#444ea513] outline-none"
            />
          </div>
          <div className="input-group flex flex-col gap-1">
            <label className="text-[18px] text-black/90">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Mot de passe"
              className="bg-transparent px-2 py-2 border-2 border-black/20 rounded-[5px] text-[15px] transition-colors focus:border-[#9da3dd] focus:bg-[#444ea513] outline-none"
            />
          </div>
          <div className="input-group flex flex-col gap-1">
            <label className="text-[18px] text-black/90">
              Confirmer mot de passe
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Confirmer votre mot de passe"
              className="bg-transparent px-2 py-2 border-2 border-black/20 rounded-[5px] text-[15px] transition-colors focus:border-[#9da3dd] focus:bg-[#444ea513] outline-none"
            />
          </div>
          {signupMutation.error && (
            <p className="error-message-valdiation text-red-500 text-[15px] font-light text-center">
              {(signupMutation.error as any)?.response?.data?.message ||
                "Erreur d'inscription"}
            </p>
          )}
          <div className="register-link text-black/50 text-[15px] p-0 m-0 h-fit">
            <h5 className="m-0 p-0 font-light">
              Vous avez déjà un compte ?{' '}
              <a
                className="invite text-[#3B4394] hover:underline"
                href="#"
                onClick={toggleForm}
              >
                Connectez-vous
              </a>
            </h5>
          </div>
          <button
            type="submit"
            className="bg-[#414891] hover:bg-[#3b4294be] text-white border-none rounded-[4px] px-4 py-2 h-16 text-[25px] cursor-pointer w-full mt-auto transition-colors"
          >
            S'inscrire
          </button>
        </form>

        {/* Google Sign-Up Section */}
        <div className="w-full mt-6">
          <div className="external-login-title flex justify-center items-center text-center w-full text-black/50 relative h-8 mt-4 before:content-[''] before:w-1/4 before:h-[2px] before:bg-black/50 before:mx-2 after:content-[''] after:w-1/4 after:h-[2px] after:bg-black/50 after:mx-2">
            <h5>Services externes</h5>
          </div>
          <div className="link-holders flex justify-center gap-4 mt-4">
            <button
              type="button"
              onClick={handleGoogleSignUp}
              disabled={firebaseGoogleLoginMutation.isPending}
              className="cursor-pointer flex items-center justify-center gap-3 bg-gradient-to-r from-[#3B4394]/10 via-[#3B4394]/5 to-[#3B4394]/10 hover:from-[#3B4394]/20 hover:via-[#3B4394]/10 hover:to-[#3B4394]/20 text-[#3B4394] border border-[#3B4394]/30 rounded-lg px-6 py-3 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow hover:shadow hover:shadow-[#3B4394]/20 hover:scale-[1.02] font-medium"
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path
                  fill="#4285F4"
                  d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"
                />
                <path
                  fill="#34A853"
                  d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2.04a4.8 4.8 0 0 1-7.18-2.53H1.83v2.07A8 8 0 0 0 8.98 17z"
                />
                <path
                  fill="#FBBC05"
                  d="M4.5 10.49a4.8 4.8 0 0 1 0-3.07V5.35H1.83a8 8 0 0 0 0 7.28l2.67-2.14z"
                />
                <path
                  fill="#EA4335"
                  d="M8.98 4.72c1.16 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.35L4.5 7.42a4.77 4.77 0 0 1 4.48-2.7z"
                />
              </svg>
              {firebaseGoogleLoginMutation.isPending
                ? 'Connexion...'
                : 'Continuer avec Google'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
