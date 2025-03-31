import React, { useEffect } from "react";
import "../styles/style-profil.css";
import { ProfilHeader } from "../components/profil/ProfilHeader";
import { ProfilBody } from "../components/profil/ProfilBody";
import { useApi } from "../hooks/useApi";
import { useAuth } from "../hooks/useAuth";
import { User }  from "../types/User";

export const Profil = () => {
  const url = window.location.href;
  const id = url.substring(url.lastIndexOf("/") + 1);
  const { data: user, error, isLoading, request } = useApi<User>();
  const { user: currentUser } = useAuth(); // Get the logged-in user from useAuth
  
  const isCurrentUser = Number(currentUser?.id) === Number(id);


  useEffect(() => {
    if (id) {
      request("get", `http://localhost:5000/api/v1/users/${id}`);
    }
  }, [id]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
      <ProfilBody />
    </div>
  );
};