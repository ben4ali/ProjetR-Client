import React, { useState } from "react";
import "../../styles/style-modal.css";
import gsap from "gsap";
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
  const [isPicked, setIsPicked] = useState(false);
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
            ".newPfp"
          ) as HTMLImageElement;
          const oldPfpImg = document.querySelector(
            ".oldPfp"
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
    <div className="pfp-modal-overlay">
      <div className="pfp-modal-content">
        <h2>Changer la photo de profil</h2>
        <div className="pfp-modal-input-holder">
          <div className="oldPfp">
            <img src={currentPfp} alt="Old Profile" crossOrigin="anonymous" />
          </div>
          <i id="arrow" className="bi bi-arrow-right-short"></i>
          <div className="newPfp">
            <img
              src={newPfpUrl || "https://via.placeholder.com/150"}
              crossOrigin="anonymous"
              alt="New Profile"
            />
          </div>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        <div className="pfp-modal-actions">
          <button onClick={handleOnConfirm}>Confirmer</button>
          <button onClick={handleOnClose}>Annuler</button>
        </div>
      </div>
    </div>
  );
};
