import React, { useState } from "react";
import { useChangeBanner } from "../../hooks/use-users";
interface ChangeBannerModalProps {
  currentBanner?: string;
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

export const ChangeBannerModal: React.FC<ChangeBannerModalProps> = ({
  currentBanner,
  isOpen,
  onClose,
  userId,
}) => {
  const [, setIsPicked] = useState(false);
  const [newBannerUrl, setNewBannerUrl] = useState<string | null>(
    currentBanner || null,
  );
  const [newBannerFile, setNewBannerFile] = useState<File | null>(null);
  const changeBannerMutation = useChangeBanner();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBanner = event.target.files?.[0];
    if (newBanner) {
      setIsPicked(true);
      setNewBannerFile(newBanner);
      const reader = new FileReader();

      reader.onload = () => {
        setNewBannerUrl(reader.result as string);
      };

      reader.readAsDataURL(newBanner);
    }
  };

  const handleOnConfirm = async () => {
    if (!newBannerFile) return;
    changeBannerMutation.mutate(
      { userId, file: newBannerFile },
      {
        onSuccess: () => {
          onClose();
        },
        onError: (error) => {
          console.error(
            "Erreur lors de la mise à jour de la bannière :",
            error,
          );
        },
      },
    );
  };

  const handleOnClose = () => {
    setNewBannerUrl(currentBanner || null);
    setIsPicked(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="flex h-[45vh] w-[90%] flex-col items-center gap-8 rounded bg-white p-8 text-center md:w-[35vw]">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          Changer la bannière
        </h2>
        <div className="relative flex w-[90%] items-center justify-between rounded-[10px] border-3 border-dashed border-[#a8b9c9] transition-all duration-300 hover:border-[#7aa9d6] hover:brightness-110">
          <div className="h-[20vh] w-full overflow-hidden rounded-[10px]">
            <img
              src={newBannerUrl!}
              alt="Old Banner"
              crossOrigin="anonymous"
              className="h-full w-full rounded-[10px] bg-gray-300 object-cover"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 z-10 h-full w-full cursor-pointer rounded-[10px] opacity-0"
          />
        </div>
        <div className="mt-3 mb-6 flex justify-end gap-4">
          <button
            onClick={handleOnConfirm}
            className="cursor-pointer rounded bg-[#444ea5] px-6 py-2 font-semibold text-white shadow transition-colors hover:bg-[#444ea59d]"
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
