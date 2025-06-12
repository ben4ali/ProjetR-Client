import React, { useState } from 'react';
import { useChangeBanner } from '../../hooks/use-users';
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
    currentBanner || null
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
        onError: error => {
          console.error(
            'Erreur lors de la mise à jour de la bannière :',
            error
          );
        },
      }
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
      <div className="flex flex-col items-center bg-white p-8 rounded w-[90%] md:w-[35vw] h-[45vh] gap-8 text-center">
        <h2 className="mb-4 text-2xl text-gray-800 font-bold">
          Changer la bannière
        </h2>
        <div className="relative flex justify-between items-center w-[90%] border-3 border-dashed border-[#a8b9c9] rounded-[10px] transition-all duration-300 hover:border-[#7aa9d6] hover:brightness-110">
          <div className="h-[20vh] w-full rounded-[10px] overflow-hidden">
            <img
              src={newBannerUrl!}
              alt="Old Banner"
              crossOrigin="anonymous"
              className="h-full w-full object-cover rounded-[10px] bg-gray-300"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 rounded-[10px]"
          />
        </div>
        <div className="flex gap-4 justify-end mt-3 mb-6">
          <button
            onClick={handleOnConfirm}
            className="px-6 py-2 bg-[#444ea5]
 text-white rounded font-semibold shadow hover:bg-[#444ea59d]
 transition-colors cursor-pointer"
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
