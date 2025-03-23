import React, { useState, useEffect } from "react";
import "../styles/style-publish.css";

export const Publish = () => {
  const [video, setVideo] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null); // Pour l'aperçu vidéo
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [codeLink, setCodeLink] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [collaborators, setCollaborators] = useState<string[]>([]);
  const [course, setCourse] = useState("");
  const [teacher, setTeacher] = useState("");

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setVideo(file);

      if (videoPreview) {
        URL.revokeObjectURL(videoPreview);
      }

      setVideoPreview(URL.createObjectURL(file)); // Génère une nouvelle URL pour l'aperçu
    }
  };

  useEffect(() => {
    return () => {
      if (videoPreview) {
        URL.revokeObjectURL(videoPreview); // Nettoie l'ancienne URL pour éviter les fuites de mémoire
      }
    };
  }, [videoPreview]);

  const handleCategoryAdd = (category: string) => {
    if (category.trim() !== "" && !categories.includes(category)) {
      setCategories([...categories, category]);
    }
  };

  const handleCollaboratorAdd = (collaborator: string) => {
    if (collaborator.trim() !== "" && !collaborators.includes(collaborator)) {
      setCollaborators([...collaborators, collaborator]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const projectData = {
      video,
      titre,
      description,
      codeLink,
      categories,
      collaborators,
      course,
      teacher,
      nb_views: 0,
      nb_likes: 0,
      comments: [],
    };
    console.log("Project Data:", projectData);
    // TODO: Envoyer les données au backend
  };

  const isFormValid = () => {
    return video && titre.trim() !== "" && description.trim() !== "";
  };

  const getValidationMessage = () => {
    const missingFields = [];
    if (!video) missingFields.push("Vidéo");
    if (titre.trim() === "") missingFields.push("Titre");
    if (description.trim() === "") missingFields.push("Description");
    return missingFields.length > 0
      ? `Veuillez remplir les champs suivants : ${missingFields.join(", ")}`
      : "";
  };

  return (
    <div className="publish-project-container">
        <h1>Publier un projet</h1>
      <form onSubmit={handleSubmit} className="publish-project-form">
        <div className="form-info">
          <label id="uploadlabel">Fichier vidéo</label>
          <div className="videoUpload">
            <div className="holder-upload">
              <div className="upload-box">
                <p>Cliquez pour sélectionner un fichier</p>
              </div>
              <input type="file" accept="video/*" onChange={handleVideoUpload} />
            </div>
          </div>
          <div className="form-group">
            <label>Titre du projet <span>*</span></label>
            <input
              type="text"
              placeholder="Titre du projet"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Description <span>*</span></label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez votre projet..."
            />
          </div>
          <div className="form-group">
            <label>Lien du Code</label>
            <input
              type="url"
              value={codeLink}
              onChange={(e) => setCodeLink(e.target.value)}
              placeholder="Lien vers le code source"
            />
          </div>
          <div className="form-group">
            <label>Catégories (Tags)</label>
            <input
              type="text"
              placeholder="Ajouter une catégorie"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleCategoryAdd(e.currentTarget.value);
                  e.currentTarget.value = "";
                }
              }}
            />
            <div className="tags">
              {categories.map((category, index) => (
                <span key={index} className="tag">
                  {category}
                </span>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Collaborateurs</label>
            <input
              type="text"
              placeholder="Ajouter un collaborateur"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleCollaboratorAdd(e.currentTarget.value);
                  e.currentTarget.value = "";
                }
              }}
            />
            <div className="collaborators">
              {collaborators.map((collaborator, index) => (
                <span key={index} className="collaborator">
                  {collaborator}
                </span>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Cours</label>
            <input
              type="text"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              placeholder="Nom du cours"
            />
          </div>
          <div className="form-group">
            <label>Enseignant :</label>
            <input
              type="text"
              value={teacher}
              onChange={(e) => setTeacher(e.target.value)}
              placeholder="Nom de l'enseignant"
            />
          </div>
        </div>
        <div className="form-video">
          <div className="video-container-publish">
            {/* Ajout d'une clé dynamique pour forcer le re-render */}
            <video key={videoPreview} className="video-preview" controls>
              <source src={videoPreview || ""} type="video/mp4" />
            </video>
            <div className="video-information">
            <p>https://rosemont-devhub/watch/{video ? video.name : "no-video"}</p>
              <p>{titre.trim() !== "" ? `Titre de la vidéo : ${titre}` : "Aucune vidéo sélectionnée"}</p>
            </div>
          </div>
          <p className="validation-message">{getValidationMessage()}</p>
          <button
            type="submit"
            className={`submit-button ${!isFormValid() ? "disabled" : ""}`}
            disabled={!isFormValid()}
          >
            Publier
          </button>
        </div>
      </form>
    </div>
  );
};