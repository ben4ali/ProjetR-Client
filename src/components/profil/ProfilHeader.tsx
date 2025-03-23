import React from "react";
import { ProfilPicture } from "./ProfilPicture";
import { ProfilContent } from "./ProfilContent";

export const ProfilHeader = () => {
  return (
    <div className="profil-header">
      <div className="profil-banner">
        <img
          src="https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain"
          alt="banner"
        />
      </div>
      <ProfilPicture />
      <ProfilContent />
    </div>
  );
};