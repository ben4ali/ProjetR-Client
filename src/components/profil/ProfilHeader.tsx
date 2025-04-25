import React, { useState } from "react";
import { ProfilPicture } from "./ProfilPicture";
import { ProfilContent } from "./ProfilContent";
import { ChangeBannerModal } from "../modals/ChangeBannerModal";
import defaultBanner from "../../assets/images/default_banner.png";
import { User } from "../../types/User";

interface ProfilHeaderProps {
  firstName: string;
  lastName: string;
  pseudo: string;
  user: User;
  banner: string;
  isCurrentUser?: boolean;
}

export const ProfilHeader: React.FC<ProfilHeaderProps> = ({
  firstName,
  lastName,
  pseudo,
  user,
  banner,
  isCurrentUser,
}) => {
  const [isBannerModalOpen, setBannerModalOpen] = useState(false);

  const handleOpenBannerModal = () => setBannerModalOpen(true);
  const handleCloseBannerModal = () => setBannerModalOpen(false);

  return (
    <div className="profil-header">
      <div
        className={`profil-banner ${isCurrentUser ? "banner-effect" : ""}`}
        onClick={isCurrentUser ? handleOpenBannerModal : undefined}
      >
        <img
          src={`${banner || defaultBanner}?t=${new Date().getTime()}`}
          alt="Profile banner"
          crossOrigin="anonymous"
        />
      </div>
      <ProfilPicture user={user} isCurrentUser={isCurrentUser} />
      <ProfilContent
        firstName={firstName}
        lastName={lastName}
        pseudo={pseudo}
      />
      <ChangeBannerModal
        currentBanner={banner || defaultBanner}
        isOpen={isBannerModalOpen}
        onClose={handleCloseBannerModal}
        userId={user.id}
      />
    </div>
  );
};
