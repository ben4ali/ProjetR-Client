import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import default_profil from '../assets/images/default_profil.png';
import { useCourses } from '../hooks/use-courses';
import { useCreateProject } from '../hooks/use-project';
import { useTags } from '../hooks/use-tags';
import { useSearchUsers } from '../hooks/use-users';
import { User } from '../types/User';

export const Publish = () => {
  const navigate = useNavigate();
  const [video, setVideo] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [lienGitHub, setLienGitHub] = useState('');
  const [lienGitlab, setLienGitlab] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [collaborators, setCollaborators] = useState<string[]>([]);
  const [course, setCourse] = useState('');
  const [session, setSession] = useState('');
  const [teacher, setTeacher] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Utiliser React Query hooks
  const { data: availableTags = [] } = useTags();
  const { data: availableCourses = [] } = useCourses();
  const { data: searchResults = [] } = useSearchUsers(searchTerm);
  const createProjectMutation = useCreateProject();

  // video upload
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

  // add tag
  const handleCategoryAdd = (category: string) => {
    if (category.trim() !== '' && !categories.includes(category)) {
      setCategories([...categories, category]);
    }
  };

  // add collaborator
  const handleCollaboratorSelect = (user: User) => {
    const userName = `${user.firstName} ${user.lastName}`;
    if (!collaborators.includes(userName)) {
      setCollaborators([...collaborators, userName]);
    }
    setSearchTerm('');
  };

  // add unknown collaborator
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && searchTerm.trim() !== '') {
      event.preventDefault();
      const userName = searchTerm.trim();
      if (!collaborators.includes(userName)) {
        setCollaborators([...collaborators, userName]);
      }
      setSearchTerm('');
    }
  };

  const handleDefaultBehavior = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  // form submit
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
        onSuccess: response => {
          console.log('Project published successfully:', response);
          navigate(`/watch/${response.id}`);
        },
        onError: error => {
          console.error('Error publishing project:', error);
        },
        onSettled: () => {
          resetForm();
        },
      }
    );
  };

  // reset fields
  const resetForm = () => {
    setVideo(null);
    setVideoPreview(null);
    setTitre('');
    setDescription('');
    setLienGitHub('');
    setLienGitlab('');
    setCategories([]);
    setCollaborators([]);
    setCourse('');
    setSession('');
    setTeacher('');
  };

  // form validation
  const isFormValid = () =>
    video && titre.trim() !== '' && description.trim() !== '';

  // validation message
  const getValidationMessage = () => {
    const missingFields = [];
    if (!video) missingFields.push('Vidéo');
    if (titre.trim() === '') missingFields.push('Titre');
    if (description.trim() === '') missingFields.push('Description');
    return missingFields.length > 0
      ? `Veuillez remplir les champs suivants : ${missingFields.join(', ')}`
      : '';
  };

  return (
    <div className="w-full md:max-w-[65%] mx-auto p-8 rounded-lg] md:p-6">
      <h1 className="border-b border-[#919090] pb-4 mb-8 text-2xl text-[#333] font-bold md:text-[1.8rem] mt-25">
        Publier un projet
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col-reverse gap-8 w-full md:flex-row md:gap-6 md:justify-between md:relative"
      >
        <div className="w-full flex flex-col gap-8 mb-8 bg-[#f7f7f7] px-8 py-4 rounded-lg md:w-1/2 md:mb-20">
          {/* Video Upload */}
          <div className="flex gap-4 items-center justify-between label-group">
            <label
              id="uploadlabel"
              className="text-[1.2rem] text-[#74767c] font-semibold m-0"
            >
              Fichier vidéo
            </label>
            <i
              className="bi bi-info-circle text-[1.2rem] text-[#555] cursor-pointer hover:text-[#007bff]"
              title="Vidéos au format MP4, MOV ou AVI, d'une taille maximale de 500 Mo."
            ></i>
          </div>
          <div className="w-full bg-[rgba(15,15,15,0.15)] border-2 border-dashed border-[#9b9c9e] rounded-lg transition cursor-pointer hover:bg-[rgba(15,15,15,0.25)] videoUpload md:h-32 flex items-center justify-center text-center">
            <div className="flex items-center justify-center h-32 w-full relative holder-upload md:h-full">
              <div className="flex flex-col items-center justify-center gap-2 text-[#74767c] text-[1.1rem] upload-box">
                <p>Cliquez pour sélectionner un fichier</p>
              </div>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                onKeyDown={handleDefaultBehavior}
                className="cursor-pointer opacity-0 absolute outline-none border-none w-full h-full"
              />
            </div>
          </div>

          {/* Title */}
          <div className="relative flex flex-col form-group">
            <label className="text-[1.1rem] font-semibold text-[#555] mb-2 flex items-center">
              Titre du projet{' '}
              <span className="text-[1.2rem] text-[#f35844]">*</span>
            </label>
            <input
              type="text"
              placeholder="Titre du projet"
              value={titre}
              onChange={e => setTitre(e.target.value)}
              onKeyDown={handleDefaultBehavior}
              className="p-3 text-base border border-[#6e6b6bde] rounded-[9px] outline-none transition-colors focus:border-[#007bff] focus:bg-[rgba(51,130,233,0.1)]"
            />
          </div>

          {/* Description */}
          <div className="relative flex flex-col form-group">
            <label className="text-[1.1rem] font-semibold text-[#555] mb-2 flex items-center">
              Description{' '}
              <span className="text-[1.2rem] text-[#f35844]">*</span>
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Décrivez votre projet..."
              onKeyDown={handleDefaultBehavior}
              className="p-3 text-base border border-[#6e6b6bde] rounded-[9px] outline-none transition-colors focus:border-[#007bff] focus:bg-[rgba(51,130,233,0.1)] resize-y min-h-[100px]"
            />
          </div>

          {/* Categories */}
          <div className="relative flex flex-col form-group">
            <div className="flex gap-4 items-center justify-between label-group">
              <label>Catégories (Tags)</label>
              <i
                className="bi bi-info-circle text-[1.2rem] text-[#555] cursor-pointer hover:text-[#007bff]"
                title="Ajouter des tags améliore la visibilité de ton projet."
              ></i>
            </div>
            <div className="relative flex flex-col gap-2 select-group">
              <select
                onChange={e => handleCategoryAdd(e.target.value)}
                defaultValue=""
                className="p-3 text-base border border-[#6e6b6bde] rounded-[9px] outline-none transition-colors text-[#555555cc] appearance-none cursor-pointer focus:border-[#007bff] focus:bg-[rgba(51,130,233,0.1)]"
              >
                <option value="" disabled>
                  Sélectionner une catégorie
                </option>
                {availableTags.map(tag => (
                  <option key={tag.id} value={tag.name}>
                    {tag.name}
                  </option>
                ))}
              </select>
              <i className="bi bi-chevron-down absolute top-1/2 right-4 -translate-y-1/2 text-[#555] text-base pointer-events-none"></i>
            </div>
            <div className="flex flex-wrap gap-2 mt-2 tags-publish">
              {categories.map((category, index) => (
                <span
                  key={index}
                  className="bg-[#0d0d0e] text-white px-3 py-2 rounded-md text-xs flex justify-between items-center gap-4 tag-publish hover:bg-[#282828] cursor-pointer"
                  onClick={() =>
                    setCategories(categories.filter(cat => cat !== category))
                  }
                >
                  <p className="text-[0.8rem] text-[#e5e5e6] font-medium m-0">
                    {category}
                  </p>
                  <i className="bi bi-x-lg opacity-80 text-[0.8rem] text-white cursor-pointer"></i>
                </span>
              ))}
            </div>
          </div>
          {/* Links */}

          <div className="flex flex-col w-full gap-4 shared-form-group md:flex-row flex-wrap">
            <div className="md:w-[48%] form-group w-full">
              <label className="flex gap-4 items-center">
                <i className="bi bi-github"></i> Lien GitHub
              </label>

              <input
                type="url"
                value={lienGitHub}
                onChange={e => setLienGitHub(e.target.value)}
                placeholder="Lien vers le code source GitHub"
                className="p-3 text-base border border-[#6e6b6bde] rounded-[9px] outline-none transition-colors w-full focus:border-[#007bff] focus:bg-[rgba(51,130,233,0.1)]"
              />
            </div>

            <div className="md:w-[48%] form-group w-full">
              <label className="flex gap-4 items-center">
                <i className="bi bi-gitlab"></i> Lien Gitlab
              </label>

              <input
                type="url"
                value={lienGitlab}
                onChange={e => setLienGitlab(e.target.value)}
                placeholder="Lien vers le code source Gitlab"
                className="p-3 text-base border border-[#6e6b6bde] rounded-[9px] outline-none transition-colors w-full focus:border-[#007bff] focus:bg-[rgba(51,130,233,0.1)]"
              />
            </div>
          </div>
          {/* Collaborators */}
          <div className="relative flex flex-col form-group">
            <div className="flex gap-4 items-center justify-between label-group">
              <label>Collaborateurs</label>
              <i
                className="bi bi-info-circle text-[1.2rem] text-[#555] cursor-pointer hover:text-[#007bff]"
                title="Si tu ne trouve pas ton collaborateur, tu peux écrire son nom et appuyer la touche entrer."
              ></i>
            </div>
            <div className="w-full relative search-input-group-publish">
              <input
                className="relative w-full z-10 searchInput-publish p-3 text-base border border-[#6e6b6bde] rounded-[9px] outline-none transition-colors focus:border-[#007bff] focus:bg-[rgba(51,130,233,0.1)]"
                type="text"
                placeholder="Rechercher un collaborateur"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <div
                className="absolute top-full left-0 w-full max-h-40 bg-[#efefef] border border-[#ccc] rounded-lg p-4 overflow-y-auto z-20 flex-col search-results-publish"
                style={{
                  display:
                    searchResults.length > 0 && searchTerm.length >= 2
                      ? 'flex'
                      : 'none',
                }}
              >
                {searchResults.map((user, index) => (
                  <div
                    key={index}
                    className="py-4 px-4 border-b border-[#ccc] cursor-pointer flex items-center transition hover:bg-[rgba(15,15,15,0.25)] search-result-item-publish"
                    onClick={() => handleCollaboratorSelect(user)}
                  >
                    <img
                      src={user.avatar || default_profil}
                      alt="User Avatar"
                      crossOrigin="anonymous"
                      className="w-8 h-8 rounded-full mr-2 bg-black object-cover overflow-hidden"
                    />
                    {user.firstName} {user.lastName}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-2 collaborators">
              {collaborators.map((collaborator, index) => (
                <span
                  key={index}
                  className="bg-[#3e90e8] px-3 py-2 rounded-md text-sm flex justify-between items-center gap-4 collaborator-publish hover:bg-[#3e90e8bd] cursor-pointer"
                  onClick={() =>
                    setCollaborators(
                      collaborators.filter(col => col !== collaborator)
                    )
                  }
                >
                  <p className="text-[0.8rem] text-white font-medium m-0">
                    {collaborator}
                  </p>
                  <i className="bi bi-x-lg opacity-80 text-[0.8rem] text-white cursor-pointer"></i>
                </span>
              ))}
            </div>
          </div>

          {/* Teacher */}
          <div className="relative flex flex-col form-group">
            <div className="flex gap-4 items-center justify-between label-group">
              <label>Enseignant</label>
              <i
                className="bi bi-info-circle text-[1.2rem] text-[#555] cursor-pointer hover:text-[#007bff]"
                title="Nom de l'enseignant qui a supervisé le projet."
              ></i>
            </div>
            <input
              type="text"
              value={teacher}
              onChange={e => setTeacher(e.target.value)}
              placeholder="Nom de l'enseignant"
              onKeyDown={handleDefaultBehavior}
              className="p-3 text-base border border-[#6e6b6bde] rounded-[9px] outline-none transition-colors focus:border-[#007bff] focus:bg-[rgba(51,130,233,0.1)]"
            />
          </div>

          {/* Course and Session */}
          <div className="flex w-full gap-4 shared-form-group md:flex-col">
            <div className="w-1/2 form-group md:w-full">
              <label>Cours</label>
              <div className="relative flex flex-col gap-2 select-group">
                <select
                  value={course}
                  onChange={e => setCourse(e.target.value)}
                  className="p-3 text-base border border-[#6e6b6bde] rounded-[9px] outline-none transition-colors text-[#555555cc] appearance-none cursor-pointer focus:border-[#007bff] focus:bg-[rgba(51,130,233,0.1)]"
                >
                  <option value="" disabled>
                    Sélectionner un cours
                  </option>
                  {availableCourses.map(course => (
                    <option key={course.id} value={course.title}>
                      {course.title}
                    </option>
                  ))}
                  <option value="Aucun">Aucun</option>
                </select>
                <i className="bi bi-chevron-down absolute top-1/2 right-4 -translate-y-1/2 text-[#555] text-base pointer-events-none"></i>
              </div>
            </div>
            <div className="w-1/2 form-group md:w-full">
              <label>Session</label>
              <div className="relative flex flex-col gap-2 select-group">
                <select
                  value={session}
                  onChange={e => setSession(e.target.value)}
                  className="p-3 text-base border border-[#6e6b6bde] rounded-[9px] outline-none transition-colors text-[#555555cc] appearance-none cursor-pointer focus:border-[#007bff] focus:bg-[rgba(51,130,233,0.1)]"
                >
                  <option value="" disabled>
                    Sélectionner une session
                  </option>
                  {(() => {
                    const currentYear = new Date().getFullYear();
                    const currentMonth = new Date().getMonth();
                    const sessions = [];

                    const currentSemester =
                      currentMonth >= 6 ? 'Automne' : 'Hiver';

                    for (let i = 0; i < 6; i++) {
                      const year = currentYear - Math.floor(i / 2);
                      const semester = i % 2 === 0 ? 'Hiver' : 'Automne';

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
                <i className="bi bi-chevron-down absolute top-1/2 right-4 -translate-y-1/2 text-[#555] text-base pointer-events-none"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-fit md:sticky md:top-24 md:w-[42%] md:h-fit">
          <div className="h-[20rem] w-full gap-4 bg-[rgb(15,15,15)] overflow-hidden rounded-lg flex flex-col relative md:h-[25rem]">
            <video
              key={videoPreview}
              className="absolute w-full h-[62%] video-preview"
              controls
            >
              <source src={videoPreview || ''} type="video/mp4" />
            </video>
            <div className="p-4 absolute text-center bottom-0 w-full h-[38%] flex flex-col items-center justify-center gap-2 video-information">
              <p className="text-[1.05rem] font-semibold text-blue-500">
                https://rosemont-devhub/watch/{video ? video.name : 'no-video'}
              </p>
              <p className="text-[0.9rem] text-[#ccc]">
                {titre.trim() !== ''
                  ? `Titre de la vidéo : ${titre}`
                  : 'Aucune vidéo sélectionnée'}
              </p>
            </div>
          </div>
          <p className="text-center text-red-600 text-[0.9rem] my-4 validation-message">
            {getValidationMessage()}
          </p>
          <button
            type="submit"
            className={`submit-button w-full py-3 px-6 text-base font-bold text-white rounded transition-colors ${
              !isFormValid()
                ? 'bg-[#ccc] cursor-not-allowed'
                : 'bg-[#007bff] hover:bg-[#0056b3]'
            } md:text-[0.9rem] md:py-2 md:px-4`}
            disabled={!isFormValid() || createProjectMutation.isPending}
          >
            {createProjectMutation.isPending
              ? 'Publication en cours...'
              : 'Publier'}
          </button>
        </div>
      </form>
    </div>
  );
};
