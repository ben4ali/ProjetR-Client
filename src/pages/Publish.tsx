import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import default_profil from "../assets/images/default_profil.png";
import { useCourses } from "../hooks/use-courses";
import { useCreateProject } from "../hooks/use-project";
import { useTags } from "../hooks/use-tags";
import { useSearchUsers } from "../hooks/use-users";
import { User } from "../types/User";

export const Publish = () => {
  const navigate = useNavigate();
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
  const [searchTerm, setSearchTerm] = useState("");

  const { data: availableTags = [] } = useTags();
  const { data: availableCourses = [] } = useCourses();
  const { data: searchResults = [] } = useSearchUsers(searchTerm);
  const createProjectMutation = useCreateProject();

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

  const handleCategoryAdd = (category: string) => {
    if (category.trim() !== "" && !categories.includes(category)) {
      setCategories([...categories, category]);
    }
  };

  const handleCollaboratorSelect = (user: User) => {
    const userName = `${user.firstName} ${user.lastName}`;
    if (!collaborators.includes(userName)) {
      setCollaborators([...collaborators, userName]);
    }
    setSearchTerm("");
  };

  // ajout d'un collaborateur inconnu
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && searchTerm.trim() !== "") {
      event.preventDefault();
      const userName = searchTerm.trim();
      if (!collaborators.includes(userName)) {
        setCollaborators([...collaborators, userName]);
      }
      setSearchTerm("");
    }
  };

  const handleDefaultBehavior = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const projectData = {
      title: titre,
      description,
      githubUrl: lienGitHub,
      gitLabUrl: lienGitlab,
      tags: categories,
      collaborators,
      course,
      teacher,
      session,
    };

    createProjectMutation.mutate(
      { projectData, video },
      {
        onSuccess: (response) => {
          console.log("Project published successfully:", response);
          navigate(`/watch/${response.id}`);
        },
        onError: (error) => {
          console.error("Error publishing project:", error);
        },
        onSettled: () => {
          resetForm();
        },
      },
    );
  };

  const resetForm = () => {
    setVideo(null);
    setVideoPreview(null);
    setTitre("");
    setDescription("");
    setLienGitHub("");
    setLienGitlab("");
    setCategories([]);
    setCollaborators([]);
    setCourse("");
    setSession("");
    setTeacher("");
  };

  const isFormValid = () =>
    video && titre.trim() !== "" && description.trim() !== "";

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
    <div className="rounded-lg] mx-auto w-full p-8 md:max-w-[65%] md:p-6">
      <h1 className="mt-7 mb-8 border-b border-[#919090] pb-4 text-3xl font-bold text-[#444ea5] md:text-[1.8rem]">
        Publier un projet
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col-reverse gap-8 md:relative md:flex-row md:justify-between md:gap-6"
      >
        <div className="mb-8 flex w-full flex-col gap-8 rounded bg-[#f7f7f7] px-8 py-4 md:mb-20 md:w-1/2">
          {/* Video Upload */}
          <div className="label-group flex items-center justify-between gap-4">
            <label
              id="uploadlabel"
              className="m-0 text-[1.2rem] font-semibold text-[#74767c]"
            >
              Fichier vidéo
            </label>
            <i
              className="bi bi-info-circle cursor-pointer text-[1.2rem] text-[#555] hover:text-[#e4003a]"
              title="Vidéos au format MP4, MOV ou AVI, d'une taille maximale de 500 Mo."
            ></i>
          </div>
          <div className="videoUpload flex w-full cursor-pointer items-center justify-center rounded border-2 border-dashed border-[#9b9c9e] bg-[#e2e4f3] text-center transition hover:bg-[#d2d5e9] md:h-32">
            <div className="holder-upload relative flex h-32 w-full items-center justify-center md:h-full">
              <div className="upload-box flex flex-col items-center justify-center gap-2 text-[1.1rem] text-[#74767c]">
                <p>Cliquez pour sélectionner un fichier</p>
              </div>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                onKeyDown={handleDefaultBehavior}
                className="absolute h-full w-full cursor-pointer border-none opacity-0 outline-none"
              />
            </div>
          </div>

          {/* Title */}
          <div className="form-group relative flex flex-col">
            <label className="mb-2 flex items-center text-[1.1rem] font-semibold text-[#555]">
              Titre du projet{" "}
              <span className="text-[1.2rem] text-[#f35844]">*</span>
            </label>
            <input
              type="text"
              placeholder="Titre du projet"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              onKeyDown={handleDefaultBehavior}
              className="rounded border border-[#6e6b6bde] p-3 text-base transition-colors outline-none focus:border-[#007bff] focus:bg-[rgba(51,130,233,0.1)]"
            />
          </div>

          {/* Description */}
          <div className="form-group relative flex flex-col">
            <label className="mb-2 flex items-center text-[1.1rem] font-semibold text-[#555]">
              Description{" "}
              <span className="text-[1.2rem] text-[#f35844]">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez votre projet..."
              onKeyDown={handleDefaultBehavior}
              className="min-h-[100px] resize-y rounded border border-[#6e6b6bde] p-3 text-base transition-colors outline-none focus:border-[#007bff] focus:bg-[rgba(51,130,233,0.1)]"
            />
          </div>

          {/* Categories */}
          <div className="form-group relative flex flex-col">
            <div className="label-group flex items-center justify-between gap-4">
              <label>Catégories (Tags)</label>
              <i
                className="bi bi-info-circle cursor-pointer text-[1.2rem] text-[#555] hover:text-[#e4003a]"
                title="Ajouter des tags améliore la visibilité de ton projet."
              ></i>
            </div>
            <div className="select-group relative flex flex-col gap-2">
              <select
                onChange={(e) => handleCategoryAdd(e.target.value)}
                defaultValue=""
                className="cursor-pointer appearance-none rounded border border-[#6e6b6bde] p-3 text-base text-[#555555cc] transition-colors outline-none focus:border-[#007bff] focus:bg-[rgba(51,130,233,0.1)]"
              >
                <option value="" disabled>
                  Sélectionner une catégorie
                </option>
                {availableTags.map((tag) => (
                  <option key={tag.id} value={tag.name}>
                    {tag.name}
                  </option>
                ))}
              </select>
              <i className="bi bi-chevron-down pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-base text-[#555]"></i>
            </div>
            <div className="tags-publish mt-2 flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <span
                  key={index}
                  className="tag-publish flex cursor-pointer items-center justify-between gap-4 rounded-md bg-[#d7dcf0] px-3 py-2 text-xs text-[#3B4395] hover:bg-[#caceec]"
                  onClick={() =>
                    setCategories(categories.filter((cat) => cat !== category))
                  }
                >
                  <p className="m-0 text-[0.8rem] font-semibold text-[#3B4395]">
                    {category}
                  </p>
                  <i className="bi bi-x-lg cursor-pointer text-[0.8rem] text-[#3B4395] opacity-80"></i>
                </span>
              ))}
            </div>
          </div>
          {/* Links */}

          <div className="shared-form-group flex w-full flex-col flex-wrap gap-4 md:flex-row">
            <div className="form-group w-full md:w-[48%]">
              <label className="flex items-center gap-4">
                <i className="bi bi-github"></i> Lien GitHub
              </label>

              <input
                type="url"
                value={lienGitHub}
                onChange={(e) => setLienGitHub(e.target.value)}
                placeholder="Lien vers le code source GitHub"
                className="w-full rounded border border-[#6e6b6bde] p-3 text-base transition-colors outline-none focus:border-[#007bff] focus:bg-[rgba(51,130,233,0.1)]"
              />
            </div>

            <div className="form-group w-full md:w-[48%]">
              <label className="flex items-center gap-4">
                <i className="bi bi-gitlab"></i> Lien Gitlab
              </label>

              <input
                type="url"
                value={lienGitlab}
                onChange={(e) => setLienGitlab(e.target.value)}
                placeholder="Lien vers le code source Gitlab"
                className="w-full rounded border border-[#6e6b6bde] p-3 text-base transition-colors outline-none focus:border-[#007bff] focus:bg-[rgba(51,130,233,0.1)]"
              />
            </div>
          </div>
          {/* Collaborators */}
          <div className="form-group relative flex flex-col">
            <div className="label-group flex items-center justify-between gap-4">
              <label>Collaborateurs</label>
              <i
                className="bi bi-info-circle cursor-pointer text-[1.2rem] text-[#555] hover:text-[#e4003a]"
                title="Si tu ne trouve pas ton collaborateur, tu peux écrire son nom et appuyer la touche entrer."
              ></i>
            </div>
            <div className="search-input-group-publish relative w-full">
              <input
                className="searchInput-publish relative z-10 w-full rounded border border-[#6e6b6bde] p-3 text-base transition-colors outline-none focus:border-[#007bff] focus:bg-[rgba(51,130,233,0.1)]"
                type="text"
                placeholder="Rechercher un collaborateur"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <div
                className="search-results-publish absolute top-full left-0 z-20 max-h-40 w-full flex-col overflow-y-auto rounded-lg border border-[#ccc] bg-[#efefef] p-4"
                style={{
                  display:
                    searchResults.length > 0 && searchTerm.length >= 2
                      ? "flex"
                      : "none",
                }}
              >
                {searchResults.map((user, index) => (
                  <div
                    key={index}
                    className="search-result-item-publish flex cursor-pointer items-center border-b border-[#ccc] px-4 py-4 transition hover:bg-[rgba(15,15,15,0.25)]"
                    onClick={() => handleCollaboratorSelect(user)}
                  >
                    <img
                      src={user.avatar || default_profil}
                      alt="User Avatar"
                      crossOrigin="anonymous"
                      className="mr-2 h-8 w-8 overflow-hidden rounded-full bg-black object-cover"
                    />
                    {user.firstName} {user.lastName}
                  </div>
                ))}
              </div>
            </div>
            <div className="collaborators mt-2 flex flex-wrap gap-2">
              {collaborators.map((collaborator, index) => (
                <span
                  key={index}
                  className="tag-publish flex cursor-pointer items-center justify-between gap-4 rounded-md bg-[#d7dcf0] px-3 py-2 text-xs text-[#3B4395] hover:bg-[#caceec]"
                  onClick={() =>
                    setCollaborators(
                      collaborators.filter((col) => col !== collaborator),
                    )
                  }
                >
                  <p className="m-0 text-[0.8rem] font-semibold text-[#3B4395]">
                    {collaborator}
                  </p>
                  <i className="bi bi-x-lg cursor-pointer text-[0.8rem] text-[#3B4395] opacity-80"></i>
                </span>
              ))}
            </div>
          </div>

          {/* Teacher */}
          <div className="form-group relative flex flex-col">
            <div className="label-group flex items-center justify-between gap-4">
              <label>Enseignant</label>
              <i
                className="bi bi-info-circle cursor-pointer text-[1.2rem] text-[#555] hover:text-[#e4003a]"
                title="Nom de l'enseignant qui a supervisé le projet."
              ></i>
            </div>
            <input
              type="text"
              value={teacher}
              onChange={(e) => setTeacher(e.target.value)}
              placeholder="Nom de l'enseignant"
              onKeyDown={handleDefaultBehavior}
              className="rounded border border-[#6e6b6bde] p-3 text-base transition-colors outline-none focus:border-[#007bff] focus:bg-[rgba(51,130,233,0.1)]"
            />
          </div>

          {/* Course and Session */}
          <div className="shared-form-group flex w-full gap-4 md:flex-col">
            <div className="form-group w-1/2 md:w-full">
              <label>Cours</label>
              <div className="select-group relative flex flex-col gap-2">
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="cursor-pointer appearance-none rounded border border-[#6e6b6bde] p-3 text-base text-[#555555cc] transition-colors outline-none focus:border-[#007bff] focus:bg-[rgba(51,130,233,0.1)]"
                >
                  <option value="" disabled>
                    Sélectionner un cours
                  </option>
                  {availableCourses.map((course) => (
                    <option key={course.id} value={course.title}>
                      {course.title}
                    </option>
                  ))}
                </select>
                <i className="bi bi-chevron-down pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-base text-[#555]"></i>
              </div>
            </div>
            <div className="form-group w-1/2 md:w-full">
              <label>Session</label>
              <div className="select-group relative flex flex-col gap-2">
                <select
                  value={session}
                  onChange={(e) => setSession(e.target.value)}
                  className="cursor-pointer appearance-none rounded border border-[#6e6b6bde] p-3 text-base text-[#555555cc] transition-colors outline-none focus:border-[#007bff] focus:bg-[rgba(51,130,233,0.1)]"
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
                          </option>,
                        );
                      } else {
                        sessions.push(
                          <option
                            key={`${semester} ${year}`}
                            value={`${semester} ${year}`}
                          >
                            {semester} {year}
                          </option>,
                        );
                      }
                    }

                    return sessions;
                  })()}
                  <option value="Aucune">Aucune</option>
                </select>
                <i className="bi bi-chevron-down pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-base text-[#555]"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="h-fit w-full md:sticky md:top-24 md:h-fit md:w-[42%]">
          <div className="relative flex h-[20rem] w-full flex-col gap-4 overflow-hidden rounded-lg bg-[rgb(15,15,15)] md:h-[25rem]">
            <video
              key={videoPreview}
              className="video-preview absolute h-[62%] w-full"
              controls
            >
              <source src={videoPreview || ""} type="video/mp4" />
            </video>
            <div className="video-information absolute bottom-0 flex h-[38%] w-full flex-col items-center justify-center gap-2 p-4 text-center">
              <p className="text-[1.05rem] font-semibold text-blue-500">
                {video
                  ? `https://rosemont-devhub/watch/${video.name}`
                  : "Aucune vidéo sélectionnée"}
              </p>
              <p className="text-[0.9rem] text-[#ccc]">
                {titre.trim() !== ""
                  ? `Titre de la vidéo : ${titre}`
                  : "Aucune vidéo sélectionnée"}
              </p>
            </div>
          </div>
          <p className="validation-message my-4 text-center text-[0.9rem] text-red-600">
            {getValidationMessage()}
          </p>
          <button
            type="submit"
            className={`submit-button w-full rounded px-6 py-3 text-base font-bold text-white transition-colors ${
              !isFormValid()
                ? "cursor-not-allowed bg-[#ccc]"
                : "bg-[#5d67be] hover:bg-[#444ea5]"
            } cursor-pointer md:px-4 md:py-2 md:text-[0.9rem]`}
            disabled={!isFormValid() || createProjectMutation.isPending}
          >
            {createProjectMutation.isPending
              ? "Publication en cours..."
              : "Publier"}
          </button>
        </div>
      </form>
    </div>
  );
};
