/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  useFirebaseGoogleLogin,
  useGoogleLogin,
  useLogin,
} from "../../hooks/use-auth";

interface LoginFormProps {
  toggleForm: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ toggleForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLogin();
  const firebaseGoogleLoginMutation = useFirebaseGoogleLogin();
  const googleLoginMutation = useGoogleLogin();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          window.location.href = "/dashboard";
        },
        onError: (error: Error | unknown) => {
          console.error("Login error:", error);
          alert(
            (error as any)?.response?.data?.message ||
              "Erreur de connexion. Veuillez vérifier vos identifiants.",
          );
        },
      },
    );
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await firebaseGoogleLoginMutation.mutateAsync();
      console.log("✅ Firebase Google Sign-In Success:", result.user.email);

      await googleLoginMutation.mutateAsync({
        idToken: result.idToken,
      });
      console.log("✅ Backend authentication success");
      window.location.href = "/dashboard";
    } catch (error: any) {
      console.error("❌ Google Sign-In Error:", error);

      if (error.code === "auth/popup-closed-by-user") {
        console.log("User closed the sign-in popup");
      } else if (error.code === "auth/popup-blocked") {
        alert("Please allow popups for this site to sign in with Google");
        firebaseGoogleLoginMutation.reset();
      } else if (error.message?.includes("Firebase")) {
        alert(
          "Authentication service unavailable. Please check your internet connection.",
        );
        firebaseGoogleLoginMutation.reset();
      } else {
        alert("Sign-in failed. Please try again.");
        firebaseGoogleLoginMutation.reset();
      }
    }
  };

  return (
    <div className="form-container z-[3] flex w-[32vw] max-w-[28rem] min-w-[30rem] flex-col items-center rounded-[5px] bg-stone-200/60 p-8 shadow-lg backdrop-blur-md">
      <div className="form-header flex w-full justify-center">
        <h3 className="mb-5 text-[40px] font-semibold text-[#444ea5]">
          Connexion
        </h3>
      </div>
      <div className="form-content flex h-full w-[95%] flex-col">
        <form
          method="POST"
          onSubmit={handleLogin}
          className="relative flex h-full flex-col gap-4"
        >
          <div className="input-group flex flex-col gap-1">
            <label className="text-[18px] text-black/90">Courriel</label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="johndoe@gmail.com"
              className="rounded-[5px] border-2 border-black/20 bg-transparent px-2 py-2 text-[15px] transition-colors outline-none focus:border-[#9da3dd] focus:bg-[#444ea513]"
            />
          </div>

          <div className="input-group flex flex-col gap-1">
            <label className="text-[18px] text-black/90">Mot de passe</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              className="rounded-[5px] border-2 border-black/20 bg-transparent px-2 py-2 text-[15px] transition-colors outline-none focus:border-[#9da3dd] focus:bg-[#444ea513]"
            />
          </div>

          {loginMutation.error && (
            <p className="error-message-valdiation text-center text-[15px] font-light text-red-500">
              {(loginMutation.error as any)?.response?.data?.message ||
                "Erreur de connexion"}
            </p>
          )}

          <button
            type="submit"
            className="mt-auto h-16 w-full cursor-pointer rounded-[4px] border-none bg-[#414891] px-4 py-2 text-[25px] text-white transition-colors hover:bg-[#3b4294be]"
          >
            Se connecter
          </button>
        </form>
      </div>
      <div className="form-footer mt-auto flex w-full flex-col items-center gap-4">
        <div className="external-login-title relative mt-4 flex h-8 w-full items-center justify-center text-center text-black/50 before:mx-2 before:h-[2px] before:w-1/4 before:bg-black/50 before:content-[''] after:mx-2 after:h-[2px] after:w-1/4 after:bg-black/50 after:content-['']">
          <h5>Services externes</h5>
        </div>
        <div className="link-holders flex justify-center gap-4">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={firebaseGoogleLoginMutation.isPending}
            className="flex cursor-pointer items-center justify-center gap-3 rounded-lg border border-[#3B4394]/30 bg-gradient-to-r from-[#3B4394]/10 via-[#3B4394]/5 to-[#3B4394]/10 px-6 py-3 font-medium text-[#3B4394] shadow transition-all duration-200 hover:scale-[1.02] hover:from-[#3B4394]/20 hover:via-[#3B4394]/10 hover:to-[#3B4394]/20 hover:shadow hover:shadow-[#3B4394]/20 disabled:cursor-not-allowed disabled:opacity-50"
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
              ? "Connexion..."
              : "Continuer avec Google"}
          </button>
        </div>
        <div className="register-link m-0 h-fit p-0 text-[15px] text-black/50">
          <h5 className="m-0 p-0 font-light">
            Vous n&apos;avez pas de compte ?{" "}
            <a
              className="invite text-[#3B4394] hover:underline"
              href="#"
              onClick={toggleForm}
            >
              Inscrivez-vous
            </a>
          </h5>
        </div>
      </div>
    </div>
  );
};
