import React, { useState, useEffect } from "react";
import "../styles/style-publish.css";

export const Publish = () => {
  const [video, setVideo] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [lienGitHub, setLienGitHub] = useState("");
  const [lienGitlab, setLienGitlab] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [collaborators, setCollaborators] = useState<string[]>([]);
  const [course, setCourse] = useState("");
  const [session, setSession] = useState("");
  const [teacher, setTeacher] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);

  // Handle video upload
  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setVideo(file);

      if (videoPreview) {
        URL.revokeObjectURL(videoPreview);
      }

      setVideoPreview(URL.createObjectURL(file));
    }
  };

  // Cleanup video preview URL on unmount
  useEffect(() => {
    return () => {
      if (videoPreview) {
        URL.revokeObjectURL(videoPreview);
      }
    };
  }, [videoPreview]);

  // Add a category
  const handleCategoryAdd = (category: string) => {
    if (category.trim() !== "" && !categories.includes(category)) {
      setCategories([...categories, category]);
    }
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const projectData = {
      video,
      titre,
      description,
      lienGitHub,
      lienGitlab,
      categories,
      collaborators,
      course,
      teacher,
      nb_views: 0,
      nb_likes: 0,
      comments: [],
    };
    console.log("Project Data:", projectData);
    // TODO: Send data to the backend
  };

  // Check if the form is valid
  const isFormValid = () => {
    return video && titre.trim() !== "" && description.trim() !== "";
  };

  // Get validation message for missing fields
  const getValidationMessage = () => {
    const missingFields = [];
    if (!video) missingFields.push("Vidéo");
    if (titre.trim() === "") missingFields.push("Titre");
    if (description.trim() === "") missingFields.push("Description");
    return missingFields.length > 0
      ? `Veuillez remplir les champs suivants : ${missingFields.join(", ")}`
      : "";
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    const mockUsers = ["Alice", "Bob", "Charlie", "David", "Eve"];
    const results = mockUsers.filter((user) =>
      user.toLowerCase().includes(query)
    );

    setSearchResults(results);

    const searchResultsBox = document.querySelector(
      ".search-results-publish"
    ) as HTMLElement;
    if (searchResultsBox) {
      searchResultsBox.style.display =
        query.trim() === "" || results.length === 0 ? "none" : "flex";
    }
  };

  // Handle adding a collaborator when pressing Enter
  const handleCollaboratorInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const input = (e.target as HTMLInputElement).value.trim();

      if (input.length >= 3 && !collaborators.includes(input)) {
        setCollaborators([...collaborators, input]);
      }

      (e.target as HTMLInputElement).value = "";
      setSearchResults([]);
      const searchResultsBox = document.querySelector(
        ".search-results-publish"
      ) as HTMLElement;
      if (searchResultsBox) searchResultsBox.style.display = "none";
    }
  };

  // Handle selecting a collaborator from the search results
  const handleCollaboratorSelect = (user: string) => {
    if (!collaborators.includes(user)) {
      setCollaborators([...collaborators, user]);
    }

    const inputField = document.querySelector(
      ".searchInput-publish input"
    ) as HTMLInputElement;
    if (inputField) inputField.value = "";

    const searchResultsBox = document.querySelector(
      ".search-results-publish"
    ) as HTMLElement;
    if (searchResultsBox) searchResultsBox.style.display = "none";
    setSearchResults([]);
  };

  return (
    <div className="publish-project-container">
      <h1>Publier un projet</h1>
      <form onSubmit={handleSubmit} className="publish-project-form">
        <div className="form-info">
          {/* Video Upload */}
          <div className="label-group">
          <label id="uploadlabel">Fichier vidéo</label>
          <i className="bi bi-info-circle" title="
            Vidéos au format MP4, MOV ou AVI, d'une taille maximale de 500 Mo.
          "></i>
          </div>

          <div className="videoUpload">
            <div className="holder-upload">
              <div className="upload-box">
                <p>Cliquez pour sélectionner un fichier</p>
              </div>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
              />
            </div>
          </div>

          {/* Title */}
          <div className="form-group">
            <label>
              Titre du projet <span>*</span>
            </label>
            <input
              type="text"
              placeholder="Titre du projet"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label>
              Description <span>*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez votre projet..."
            />
          </div>

          {/* Categories */}
          <div className="form-group">
            <div className="label-group">
            <label>Catégories (Tags)</label>
            <i className="bi bi-info-circle" title="
              Ajouter des tags améliore la visibilité de ton projet."></i>
            </div>
            <div className="select-group">
              <select
                onChange={(e) => handleCategoryAdd(e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>
                  Sélectionner une catégorie
                </option>
                <option value="Développement Web">Développement Web</option>
                <option value="Intelligence Artificielle">
                  Intelligence Artificielle
                </option>
                <option value="Design UI/UX">Design UI/UX</option>
                <option value="Développement Mobile">Développement Mobile</option>
                <option value="Autre">Autre</option>
              </select>
                <i className="bi bi-chevron-down"></i>
            </div>

            <div className="tags-publish">
              {categories.map((category, index) => (
                <span
                  key={index}
                  className="tag-publish"
                  onClick={() =>
                    setCategories(categories.filter((cat) => cat !== category))
                  }
                >
                  <p>{category}</p>
                  <i className="bi bi-x-lg"></i>
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="shared-form-group">
            <div className="form-group">
              <label>
                <i className="bi bi-github"></i>
                Lien GitHub
              </label>
              <input
                type="url"
                value={lienGitHub}
                onChange={(e) => setLienGitHub(e.target.value)}
                placeholder="Lien vers le code source GitHub"
              />
            </div>
            <div className="form-group">
              <label>
                <i className="bi bi-gitlab"></i>
                Lien Gitlab
              </label>
              <input
                type="url"
                value={lienGitlab}
                onChange={(e) => setLienGitlab(e.target.value)}
                placeholder="Lien vers le code source Gitlab"
              />
            </div>
          </div>

         {/* Collaborators */}
        <div className="form-group ">
          <div className="label-group">
          <label>Collaborateurs</label>
          <i className="bi bi-info-circle" title="
              Si tu ne trouve pas ton collaborateur, tu peux écrire son nom et appuyer la touche entrer."></i>
          </div>
          <div className="search-input-group-publish">
            <input
             className="searchInput-publish"
              type="text"
              placeholder="Rechercher un collaborateur"
              onChange={handleSearchChange}
              onKeyDown={handleCollaboratorInputKeyDown}
            />
            <button className="search-button-publish" type="button">
              <i className="bi bi-search"></i>
            </button>

            <div className="search-results-publish">
              {searchResults.map((user, index) => (
                <div
                  key={index}
                  className="search-result-item-publish"
                  onClick={() => handleCollaboratorSelect(user)}
                >
                  <img src="https://via.placeholder.com/20" alt="User Avatar" />
                  {user}
                </div>
              ))}
            </div>
          </div>
          <div className="collaborators">
            {collaborators.map((collaborator, index) => (
              <span
                key={index}
                className="collaborator-publish"
                onClick={() =>
                  setCollaborators(
                    collaborators.filter((col) => col !== collaborator)
                  )
                }
              >
                <p>{collaborator}</p> <i className="bi bi-x-lg"></i>
              </span>
            ))}
          </div>
        </div>

          {/* Teacher */}
          <div className="form-group">
            <div className="label-group">
              <label>Enseignant</label>
              <i className="bi bi-info-circle" title="
                Nom de l'enseignant qui a supervisé le projet."></i>
            </div>

            <input
              type="text"
              value={teacher}
              onChange={(e) => setTeacher(e.target.value)}
              placeholder="Nom de l'enseignant"
            />
          </div>

          {/* Course and Session */}
          <div className="shared-form-group">
            <div className="form-group">
              <label>Cours</label>
              <div className="select-group">
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                >
                  <option value="" disabled>
                    Sélectionner un cours
                  </option>
                  <option value="Développement Web">Développement Web</option>
                  <option value="Intelligence Artificielle">
                    Intelligence Artificielle
                  </option>
                  <option value="Design UI/UX">Design UI/UX</option>
                  <option value="Développement Mobile">
                    Développement Mobile
                  </option>
                  <option value="Aucun">Aucun</option>
                </select>
                <i className="bi bi-chevron-down"></i>
              </div>

            </div>
            <div className="form-group">
              <label>Session</label>
              <div className="select-group">
              <select
                value={session}
                onChange={(e) => setSession(e.target.value)}
              >
                <option value="" disabled>
                  Sélectionner une session
                </option>
                {(() => {
                  const currentYear = new Date().getFullYear();
                  const currentMonth = new Date().getMonth();
                  const sessions = [];

                  const currentSemester =
                    currentMonth >= 6 ? "Automne" : "Hiver";

                  for (let i = 0; i < 6; i++) {
                    const year = currentYear - Math.floor(i / 2);
                    const semester = i % 2 === 0 ? "Hiver" : "Automne";

                    if (i === 0 && semester === currentSemester) {
                      sessions.push(
                        <option
                          key={`${semester} ${year}`}
                          value={`${semester} ${year}`}
                        >
                          {semester} {year}
                        </option>
                      );
                    } else {
                      sessions.push(
                        <option
                          key={`${semester} ${year}`}
                          value={`${semester} ${year}`}
                        >
                          {semester} {year}
                        </option>
                      );
                    }
                  }

                  return sessions;
                })()}
                <option value="Aucune">Aucune</option>
              </select>
              <i className="bi bi-chevron-down"></i>
              </div>

            </div>
          </div>
        </div>

        {/* Video Preview */}
        <div className="form-video">
          <div className="video-container-publish">
            <video key={videoPreview} className="video-preview" controls>
              <source src={videoPreview || ""} type="video/mp4" />
            </video>
            <div className="video-information">
              <p>
                https://rosemont-devhub/watch/{video ? video.name : "no-video"}
              </p>
              <p>
                {titre.trim() !== ""
                  ? `Titre de la vidéo : ${titre}`
                  : "Aucune vidéo sélectionnée"}
              </p>
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