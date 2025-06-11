/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useSignup } from "../../hooks/use-auth";

interface SignupProps {
  toggleForm: () => void;
}

export const Signup: React.FC<SignupProps> = ({ toggleForm }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const signupMutation = useSignup();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error("Les mots de passe ne correspondent pas.");
      return;
    }
    signupMutation.mutate(
      { firstName, lastName, username, email, password },
      {
        onSuccess: () => {
          window.location.href = "/explore";
        },
        onError: (err: Error | unknown) => {
          console.error("Erreur lors de l'inscription :", err);
        },
      },
    );
  };
  return (
    <div className="form-container signup z-[3] w-[32vw] min-w-[30rem] max-w-[28rem] rounded-[5px] bg-white/50 flex flex-col p-8 items-center shadow-[5px_5px_10px_5px_rgba(0,0,0,0.2)] backdrop-blur-[50px] saturate-180 mt-[5%] min-h-[70vh]">
      <div className="form-header flex justify-center w-full">
        <h3 className="text-[40px] font-light text-black/90">INSCRIPTION</h3>
      </div>
      <div className="form-content flex flex-col w-[95%] h-full">
        <form
          method="POST"
          onSubmit={handleSignUp}
          className="flex flex-col gap-4 h-full relative"
        >
          <div className="input-group duo flex flex-row gap-4">
            <div className="input-group flex flex-col gap-1 w-full">
              <label className="text-[18px] text-black/90">Prénom</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Prénom"
                className="bg-transparent px-2 py-2 border-2 border-black/20 rounded-[5px] text-[15px] transition-colors focus:border-blue-500 focus:bg-blue-100/20 outline-none"
              />
            </div>
            <div className="input-group flex flex-col gap-1 w-full">
              <label className="text-[18px] text-black/90">Nom</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Nom"
                className="bg-transparent px-2 py-2 border-2 border-black/20 rounded-[5px] text-[15px] transition-colors focus:border-blue-500 focus:bg-blue-100/20 outline-none"
              />
            </div>
          </div>
          <div className="input-group flex flex-col gap-1">
            <label className="text-[18px] text-black/90">Pseudo</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Pseudo"
              className="bg-transparent px-2 py-2 border-2 border-black/20 rounded-[5px] text-[15px] transition-colors focus:border-blue-500 focus:bg-blue-100/20 outline-none"
            />
          </div>
          <div className="input-group flex flex-col gap-1">
            <label className="text-[18px] text-black/90">Courriel</label>
            <input
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              className="bg-transparent px-2 py-2 border-2 border-black/20 rounded-[5px] text-[15px] transition-colors focus:border-blue-500 focus:bg-blue-100/20 outline-none"
            />
          </div>
          <div className="input-group flex flex-col gap-1">
            <label className="text-[18px] text-black/90">
              Confirmer mot de passe
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmer votre mot de passe"
              className="bg-transparent px-2 py-2 border-2 border-black/20 rounded-[5px] text-[15px] transition-colors focus:border-blue-500 focus:bg-blue-100/20 outline-none"
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
              Vous avez déjà un compte ?{" "}
              <a
                className="invite text-blue-600 hover:underline"
                href="#"
                onClick={toggleForm}
              >
                Connectez-vous
              </a>
            </h5>
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700/80 text-white border-none rounded-[4px] px-4 py-2 h-16 text-[25px] cursor-pointer w-full mt-auto transition-colors"
          >
            S&apos;inscrire
          </button>
        </form>
      </div>
    </div>
  );
};
