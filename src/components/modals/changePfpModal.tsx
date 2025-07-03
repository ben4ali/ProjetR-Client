import gsap from "gsap";
import React, { useState } from "react";
import { useChangePfp } from "../../hooks/use-users";

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
            ".newPfp",
          ) as HTMLImageElement;
          const oldPfpImg = document.querySelector(
            ".oldPfp",
          ) as HTMLImageElement;

          if (newPfpImg && oldPfpImg) {
            gsap.to(oldPfpImg, {
              duration: 0.5,
              left: "25%",
              ease: "power2.inOut",
            });

            gsap.to(newPfpImg, {
              opacity: 1,
              duration: 0.5,
              left: "75%",
              ease: "power2.inOut",
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
        onError: (error) => {
          console.error(
            "Erreur lors de la mise à jour de la photo de profil :",
            error,
          );
        },
      },
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
      <div className="flex h-[45vh] w-[90%] flex-col items-center gap-8 rounded bg-white p-8 text-center md:w-[35vw]">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          Changer la photo de profil
        </h2>
        <div className="relative flex h-[15rem] w-[75%] items-center justify-between">
          <div className="absolute top-1/2 left-1/4 z-10 h-[14vh] w-[14vh] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-2 border-[#ccc] bg-gray-200">
            <img
              src={currentPfp}
              alt="Old Profile"
              crossOrigin="anonymous"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="newPfp absolute top-1/2 left-3/4 z-20 h-[14vh] w-[14vh] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-2 border-[#ccc] bg-gray-200 transition-opacity duration-500">
            <img
              src={newPfpUrl || "https://via.placeholder.com/150"}
              crossOrigin="anonymous"
              alt=""
              className="h-full w-full border border-[#444ea5] bg-[#444ea5] object-cover"
            />
          </div>
          <span className="absolute top-1/2 left-1/2 z-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[50px] opacity-60 select-none">
            <i className="bi bi-arrow-right-short" />
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 z-30 h-full w-full cursor-pointer rounded-[10px] opacity-0"
          />
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={handleOnConfirm}
            className="cursor-pointer rounded bg-[#444ea5] px-6 py-2 font-semibold text-white shadow transition-colors hover:bg-[#444ea593]"
          >
            Confirmer
          </button>
          <button
            onClick={handleOnClose}
            className="cursor-pointer rounded bg-gray-200 px-6 py-2 font-semibold text-gray-700 shadow transition-colors hover:bg-gray-300"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};
