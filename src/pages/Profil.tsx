import React from "react";
import "../styles/style-profil.css";
import { ProfilHeader } from "../components/profil/ProfilHeader";
import { ProfilBody } from "../components/profil/ProfilBody";
import { useUserById } from "../hooks/use-users";
import { useProjectsByUserId } from "../hooks/use-project";
import { useCurrentUser } from "../hooks/use-auth";

export const Profil = () => {
  const { data: currentUser } = useCurrentUser();
  const id = window.location.pathname.split("/").pop();
  const {
    data: user,
    error: userError,
    isLoading: isUserLoading,
  } = useUserById(id);
  const {
    data: projets,
    error: projetsError,
    isLoading: isProjetsLoading,
  } = useProjectsByUserId(id);

  const isCurrentUser = true;
  return (
    <div className="profil-container">
      {user && (
        <ProfilHeader
          firstName={user.firstName}
          lastName={user.lastName}
          pseudo={user.username}
          user={user}
          banner={user.banner || ""}
          isCurrentUser={isCurrentUser}
        />
      )}
      <ProfilBody projets={projets || []} />
    </div>
  );
};
