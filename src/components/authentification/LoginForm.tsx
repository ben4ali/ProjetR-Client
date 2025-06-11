/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useGoogleLogin, useLogin } from "../../hooks/use-auth";

interface LoginFormProps {
  toggleForm: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ toggleForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLogin();
  const googleLoginMutation = useGoogleLogin();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (response) => {
          localStorage.setItem("token", response.token);
          window.location.href = "/explore";
        },
      },
    );
  };

  useEffect(() => {
    if (!(window as any).google || !(window as any).google.accounts) {
      console.error("Le script Google Sign-In n'est pas chargé.");
      return;
    }

    (window as any).google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: (response: any) => {
        googleLoginMutation.mutate(
          { idToken: response.credential },
          {
            onSuccess: (apiResponse) => {
              localStorage.setItem("token", apiResponse.token);
              window.location.href = "/explore";
            },
            onError: (err: any) => {
              console.error("Erreur lors de la connexion avec Google :", err);
            },
          },
        );
      },
    });

    (window as any).google.accounts.id.renderButton(
      document.getElementById("google-signin-button"),
      { theme: "outline", size: "large" },
    );
  }, []);

  return (
    <div className="form-container z-[3] w-[32vw] min-w-[30rem] max-w-[28rem] rounded-[5px] bg-white/50 flex flex-col p-8 items-center shadow-[5px_5px_10px_5px_rgba(0,0,0,0.2)] backdrop-blur-[50px] saturate-180">
      <div className="form-header flex justify-center w-full">
        <h3 className="text-[40px] font-light text-black/90">CONNEXION</h3>
      </div>
      <div className="form-content flex flex-col w-[95%] h-full">
        <form
          method="POST"
          onSubmit={handleLogin}
          className="flex flex-col gap-4 h-full relative"
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
              className="bg-transparent px-2 py-2 border-2 border-black/20 rounded-[5px] text-[15px] transition-colors focus:border-blue-500 focus:bg-blue-100/20 outline-none"
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
              className="bg-transparent px-2 py-2 border-2 border-black/20 rounded-[5px] text-[15px] transition-colors focus:border-blue-500 focus:bg-blue-100/20 outline-none"
            />
          </div>

          {loginMutation.error && (
            <p className="error-message-valdiation text-red-500 text-[15px] font-light text-center">
              {(loginMutation.error as any)?.response?.data?.message ||
                "Erreur de connexion"}
            </p>
          )}

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700/80 text-white border-none rounded-[4px] px-4 py-2 h-16 text-[25px] cursor-pointer w-full mt-auto transition-colors"
          >
            Connexion
          </button>
        </form>
      </div>
      <div className="form-footer w-full flex flex-col gap-4 mt-auto items-center">
        <div className="external-login-title flex justify-center items-center text-center w-full text-black/50 relative h-8 mt-4 before:content-[''] before:w-1/4 before:h-[2px] before:bg-black/50 before:mx-2 after:content-[''] after:w-1/4 after:h-[2px] after:bg-black/50 after:mx-2">
          <h5>Services externes</h5>
        </div>
        <div className="link-holders flex justify-center gap-4">
          <div id="google-signin-button"></div>
        </div>
        <div className="register-link text-black/50 text-[15px] p-0 m-0 h-fit">
          <h5 className="m-0 p-0 font-light">
            Vous n&apos;avez pas de compte ?{" "}
            <a
              className="invite text-blue-600 hover:underline"
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
