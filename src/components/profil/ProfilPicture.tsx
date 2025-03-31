import React, { useState } from "react";
import { ChangeProfilePictureModal } from "../modals/changePfpModal";
import { User } from "../../types/User";

interface ProfilePictureProps {
  user: User;
  isCurrentUser?: boolean;
}

export const ProfilPicture: React.FC<ProfilePictureProps> = ({ user, isCurrentUser }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <div>
      <div
        className={`profil-picture ${isCurrentUser ? "profile-effect" : ""}`}
        onClick={isCurrentUser ? handleOpenModal : undefined}
      >
        <img src={user.avatar || "avatar.png"} alt="profil-pic" crossOrigin="anonymous" />
      </div>
      <ChangeProfilePictureModal
        currentPfp={user.avatar || ""}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        userId={user.id}
      />
    </div>
  );
};