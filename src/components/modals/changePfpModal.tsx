import React, { useState } from "react";
import "../../styles/style-modal.css";
import gsap from "gsap";
import { useApi } from "../../hooks/useApi";

interface ChangeProfilePictureModalProps {
  currentPfp?: string;
  isOpen: boolean;
  onClose: () => void;
  userId: string; // Add userId to identify the user
}

export const ChangeProfilePictureModal: React.FC<ChangeProfilePictureModalProps> = ({
  currentPfp,
  isOpen,
  onClose,
  userId,
}) => {
  const [isPicked, setIsPicked] = useState(false);
  const [newPfpUrl, setNewPfpUrl] = useState<string | null>(null);
  const [newPfpFile, setNewPfpFile] = useState<File | null>(null);
  const { request, isLoading } = useApi();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPfp = event.target.files?.[0];
    if (newPfp) {
      setIsPicked(true);
      setNewPfpFile(newPfp);
      const reader = new FileReader();

      reader.onload = () => {
        setNewPfpUrl(reader.result as string);

        setTimeout(() => {
          const newPfpImg = document.querySelector(".newPfp") as HTMLImageElement;
          const oldPfpImg = document.querySelector(".oldPfp") as HTMLImageElement;

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
  
    try {
      const formData = new FormData();
      formData.append("avatar", newPfpFile);
  
      await request("put", `http://localhost:5000/api/v1/users/${userId}/avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la photo de profil :", error);
    }
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
            <img src={currentPfp} alt="Old Profile"  crossOrigin="anonymous"/>
          </div>
          <i id="arrow" className="bi bi-arrow-right-short"></i>
          <div className="newPfp">
            <img src={newPfpUrl || "https://via.placeholder.com/150"} crossOrigin="anonymous" alt="New Profile" />
          </div>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        <div className="pfp-modal-actions">
          <button onClick={handleOnConfirm} disabled={!isPicked || isLoading}>
            {isLoading ? "En cours..." : "Confirmer"}
          </button>
          <button onClick={handleOnClose}>Annuler</button>
        </div>
      </div>
    </div>
  );
};