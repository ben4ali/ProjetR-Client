import gsap from 'gsap';
import React, { useState } from 'react';
import { useChangePfp } from '../../hooks/use-users';

interface ChangeProfilePictureModalProps {
  currentPfp?: string;
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

export const ChangeProfilePictureModal: React.FC<
  ChangeProfilePictureModalProps
> = ({ currentPfp, isOpen, onClose, userId }) => {
  const [, setIsPicked] = useState(false);
  const [newPfpUrl, setNewPfpUrl] = useState<string | null>(null);
  const [newPfpFile, setNewPfpFile] = useState<File | null>(null);
  const changePfpMutation = useChangePfp();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPfp = event.target.files?.[0];
    if (newPfp) {
      setIsPicked(true);
      setNewPfpFile(newPfp);
      const reader = new FileReader();

      reader.onload = () => {
        setNewPfpUrl(reader.result as string);

        setTimeout(() => {
          const newPfpImg = document.querySelector(
            '.newPfp'
          ) as HTMLImageElement;
          const oldPfpImg = document.querySelector(
            '.oldPfp'
          ) as HTMLImageElement;

          if (newPfpImg && oldPfpImg) {
            gsap.to(oldPfpImg, {
              duration: 0.5,
              left: '25%',
              ease: 'power2.inOut',
            });

            gsap.to(newPfpImg, {
              opacity: 1,
              duration: 0.5,
              left: '75%',
              ease: 'power2.inOut',
            });
          }
        }, 0);
      };

      reader.readAsDataURL(newPfp);
    }
  };

  const handleOnConfirm = async () => {
    if (!newPfpFile) return;

    changePfpMutation.mutate(
      { userId, file: newPfpFile },
      {
        onSuccess: () => {
          onClose();
        },
        onError: error => {
          console.error(
            'Erreur lors de la mise à jour de la photo de profil :',
            error
          );
        },
      }
    );
  };

  const handleOnClose = () => {
    setIsPicked(false);
    setNewPfpUrl(null);
    setNewPfpFile(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="flex flex-col items-center bg-white p-8 rounded w-[90%] md:w-[35vw] h-[45vh] gap-8 text-center">
        <h2 className="mb-4 text-2xl text-gray-800 font-bold">
          Changer la photo de profil
        </h2>
        <div className="relative flex justify-between items-center w-[75%] h-[15rem]">
          <div className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[14vh] w-[14vh] rounded-full border-2 border-[#ccc] overflow-hidden z-10 bg-gray-200">
            <img
              src={currentPfp}
              alt="Old Profile"
              crossOrigin="anonymous"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute left-3/4 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[14vh] w-[14vh] rounded-full border-2 border-[#ccc] overflow-hidden z-20 bg-gray-200 transition-opacity duration-500 newPfp">
            <img
              src={newPfpUrl || 'https://via.placeholder.com/150'}
              crossOrigin="anonymous"
              alt=""
              className="h-full w-full object-cover border border-[#444ea5] bg-[#444ea5]"
            />
          </div>
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[50px] rounded-full opacity-60 z-0 flex justify-center items-center select-none">
            <i className="bi bi-arrow-right-short" />
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30 rounded-[10px]"
          />
        </div>
        <div className="flex gap-4 justify-end mt-6">
          <button
            onClick={handleOnConfirm}
            className="px-6 py-2 bg-[#444ea5] cursor-pointer text-white rounded font-semibold shadow hover:bg-[#444ea593] transition-colors"
          >
            Confirmer
          </button>
          <button
            onClick={handleOnClose}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded font-semibold shadow hover:bg-gray-300 transition-colors cursor-pointer"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};
