import { FC, useState } from 'react';
import defaultBanner from '../../assets/images/default_banner.png';
import { Projet } from '../../types/Projet';
import { User } from '../../types/User';
import { ChangeBannerModal } from '../modals/changeBannerModal';
import { ProfilContent } from './ProfilContent';
import { ProfilPicture } from './ProfilPicture';

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
    <div className="relative flex flex-col gap-4 w-[95%] md:w-[90%] bg-black/10 lg:h-[32rem] overflow-hidden rounded-t-lg">
      <div
        className={`overflow-hidden h-[62%] w-full ${
          isCurrentUser ? 'cursor-pointer group' : ''
        }`}
        onClick={isCurrentUser ? handleOpenBannerModal : undefined}
      >
        <img
          src={`${banner || defaultBanner}?t=${new Date().getTime()}`}
          alt="Profile banner"
          crossOrigin="anonymous"
          className="w-full h-full object-cover scale-[1.05] transition-transform duration-300 ease-in-out group-hover:scale-[1.015] group-hover:blur-md"
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
      <div className="absolute bottom-0 right-0 flex gap-1 pointer-events-none overflow-hidden h-[38%] w-[15rem] -z-1">
        <div className="w-120 h-3 bg-[#e4003a] bottom-0 -right-40 opacity-80 absolute -rotate-45 " />
        <div className="w-100 h-3 bg-[#e4003a] bottom-0 -right-20 opacity-80 absolute -rotate-45" />
        <div className="w-50 h-3 bg-[#e4003a] bottom-0 -right-15 opacity-80 absolute -rotate-45" />
      </div>
    </div>
  );
};
