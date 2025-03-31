import React, { useState } from "react";
import "../../styles/style-modal.css";
import { useApi } from "../../hooks/useApi";

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
  const [isPicked, setIsPicked] = useState(false);
  const [newBannerUrl, setNewBannerUrl] = useState<string | null>(currentBanner || null);
  const [newBannerFile, setNewBannerFile] = useState<File | null>(null);
  const { request, isLoading } = useApi();

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

    try {
      const formData = new FormData();
      formData.append("banner", newBannerFile);

      await request("put", `http://localhost:5000/api/v1/users/${userId}/banner`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la bannière :", error);
    }
  };

  const handleOnClose = () => {
    setIsPicked(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="banner-modal-overlay">
      <div className="banner-modal-content">
        <h2>Changer la bannière</h2>
        <div className="banner-modal-input-holder">
          <div className="oldBanner">
            <img src={newBannerUrl} alt="Old Banner" crossOrigin="anonymous" />
          </div>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        <div className="banner-modal-actions">
          <button onClick={handleOnConfirm} disabled={!isPicked || isLoading}>
            {isLoading ? "En cours..." : "Confirmer"}
          </button>
          <button onClick={handleOnClose}>Annuler</button>
        </div>
      </div>
    </div>
  );
};