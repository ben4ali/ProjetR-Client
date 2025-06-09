import { FC, useState } from "react";
import { ChangeProfilePictureModal } from "../modals/changePfpModal";
import { User } from "../../types/User";

interface ProfilePictureProps {
  user: User;
  isCurrentUser?: boolean;
}

export const ProfilPicture: FC<ProfilePictureProps> = ({
  user,
  isCurrentUser,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <div>
      <div
        className={`absolute left-[3%] top-[35%] md:top-[42%] ${
          isCurrentUser ? "cursor-pointer group" : ""
        } h-36 w-36 md:h-60 md:w-60`}
        onClick={isCurrentUser ? handleOpenModal : undefined}
      >
        <img
          src={`${user.avatar || ""}?t=${new Date().getTime()}`}
          alt="profil-pic"
          crossOrigin="anonymous"
          className="h-full w-full rounded-full border-[7px] border-white/30 object-cover shadow-[0px_0px_20px_5px_rgba(0,0,0,0.35)] transition-transform duration-300 ease-in-out group-hover:scale-[1.005] group-hover:-translate-y-[1%] group-hover:shadow-[0px_15px_22px_10px_rgba(0,0,0,0.2)]"
        />
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
