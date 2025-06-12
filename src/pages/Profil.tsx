import { ProfilHeader } from "../components/profil/ProfilHeader";
import { ProfilBody } from "../components/profil/ProfilBody";
import { useUserById } from "../hooks/use-users";
import { useProjectsByUserId } from "../hooks/use-project";
import { useCurrentUser } from "../hooks/use-auth";
import { useMemo } from "react";

export const Profil = () => {
  const id = window.location.pathname.split("/").pop();
  const { data: user } = useUserById(id);
  const { data: projets } = useProjectsByUserId(id);
  const { data: currentUser } = useCurrentUser();
  const isCurrentUser = useMemo(
    () => currentUser?.id === user?.id,
    [currentUser, user]
  );

  return (
    <div className="flex flex-col items-center pb-12">
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
