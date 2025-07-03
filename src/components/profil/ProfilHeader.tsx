import { FC, useState } from "react";
import defaultBanner from "../../assets/images/default_banner.png";
import { Projet } from "../../types/Projet";
import { User } from "../../types/User";
import { ChangeBannerModal } from "../modals/changeBannerModal";
import { ProfilContent } from "./ProfilContent";
import { ProfilPicture } from "./ProfilPicture";

interface ProfilHeaderProps {
  firstName: string;
  lastName: string;
  pseudo: string;
  user: User;
  banner: string;
  isCurrentUser?: boolean;
  projets: Projet[];
}

export const ProfilHeader: FC<ProfilHeaderProps> = ({
  firstName,
  lastName,
  pseudo,
  user,
  banner,
  isCurrentUser,
  projets,
}) => {
  const [isBannerModalOpen, setBannerModalOpen] = useState(false);

  const handleOpenBannerModal = () => setBannerModalOpen(true);
  const handleCloseBannerModal = () => setBannerModalOpen(false);

  return (
    <div className="relative flex w-[95%] flex-col gap-4 overflow-hidden rounded-t-lg bg-black/10 md:w-[90%] lg:h-[32rem]">
      <div
        className={`h-[62%] w-full overflow-hidden ${
          isCurrentUser ? "group cursor-pointer" : ""
        }`}
        onClick={isCurrentUser ? handleOpenBannerModal : undefined}
      >
        <img
          src={`${banner || defaultBanner}?t=${new Date().getTime()}`}
          alt="Profile banner"
          crossOrigin="anonymous"
          className="h-full w-full scale-[1.05] object-cover transition-transform duration-300 ease-in-out group-hover:scale-[1.015] group-hover:blur-md"
        />
      </div>

      <ProfilPicture user={user} isCurrentUser={isCurrentUser} />
      <ProfilContent
        firstName={firstName}
        lastName={lastName}
        pseudo={pseudo}
        userId={user.id}
        projets={projets}
      />

      <ChangeBannerModal
        currentBanner={banner || defaultBanner}
        isOpen={isBannerModalOpen}
        onClose={handleCloseBannerModal}
        userId={user.id}
      />
      <div className="pointer-events-none absolute right-0 bottom-0 -z-1 flex h-[38%] w-[15rem] gap-1 overflow-hidden">
        <div className="absolute -right-40 bottom-0 h-3 w-120 -rotate-45 bg-[#e4003a] opacity-80" />
        <div className="absolute -right-20 bottom-0 h-3 w-100 -rotate-45 bg-[#e4003a] opacity-80" />
        <div className="absolute -right-15 bottom-0 h-3 w-50 -rotate-45 bg-[#e4003a] opacity-80" />
      </div>
    </div>
  );
};
