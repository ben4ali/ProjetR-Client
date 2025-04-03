import React, { useEffect } from "react";
import "../styles/style-profil.css";
import { ProfilHeader } from "../components/profil/ProfilHeader";
import { ProfilBody } from "../components/profil/ProfilBody";
import { useApi } from "../hooks/useApi";
import { useAuth } from "../hooks/useAuth";
import { User } from "../types/User";
import { Projet } from "../types/Projet";

export const Profil = () => {
  const url = window.location.href;
  const id = url.substring(url.lastIndexOf("/") + 1);
  const { data: user, error: userError, isLoading: isUserLoading, request: fetchUser } = useApi<User>();
  const { data: projets, error: videosError, isLoading: isVideosLoading, request: fetchVideos } = useApi<Projet[]>();
  const { user: currentUser } = useAuth();

  const isCurrentUser = Number(currentUser?.id) === Number(id);

  useEffect(() => {
    if (id) {
      fetchUser("get", `http://localhost:5000/api/v1/users/${id}`);
      fetchVideos("get", `http://localhost:5000/api/v1/projects/user/${id}`);
    }
  }, [id]);

  if (isUserLoading || isVideosLoading) return <p>Loading...</p>;
  if (userError) return <p>Error fetching user: {userError}</p>;
  if (videosError) return <p>Error fetching videos: {videosError}</p>;

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