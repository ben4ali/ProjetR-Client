import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Projet } from '../../types/Projet';

export const Post = ({
  project,
  fullPost = false,
}: {
  project: Projet;
  fullPost?: boolean;
}) => {
  const formattedDate = new Date(project.createdAt).toLocaleDateString(
    'fr-CA',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  const [duration, setDuration] = useState<number | null>(null);

  const handleLoadedMetadata = (event: Event) => {
    const video = event.currentTarget as HTMLVideoElement;
    setDuration(video.duration);
  };

  const formatDuration = (seconds: number | null) => {
    if (seconds === null) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  useEffect(() => {
    if (project.demoUrl) {
      const video = document.createElement('video');
      video.src = project.demoUrl;
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [project.demoUrl]);

  if (!project) {
    return <div className="text-slate-500">Chargement...</div>;
  }

  const authorAvatar = project.author?.avatar || '/default-avatar.png';
  const authorUsername = project.author?.username || 'Utilisateur inconnu';

  return (
    <Link
      to={'/watch/' + project.id}
      className={
        fullPost
          ? 'flex min-h-[15em] w-full overflow-hidden cursor-pointer gap-6'
          : 'flex flex-col relative w-[22.9rem] h-[20rem] overflow-hidden cursor-pointer'
      }
    >
      {!fullPost && (
        <>
          <div className="overflow-hidden rounded-[10px] w-full h-[70%] relative">
            <div className="absolute w-full h-full bg-gradient-to-b from-transparent to-black/25 z-10 transition-all"></div>
            <video
              className="absolute z-0 rounded-[8px] w-full h-full object-cover scale-110 transition-all"
              src={project.demoUrl}
            />
            <p className="absolute bottom-[7.5%] right-[7.5%] bg-black/50 text-white px-2 py-1 rounded-bl-[8px] z-20 text-xs">
              {formatDuration(duration)}
            </p>
          </div>
          <div className="flex mt-4 h-24 gap-2">
            <div className="flex h-full w-[15%]">
              <img
                src={authorAvatar}
                alt="Photo de profil"
                className="w-12 h-12 object-cover rounded-full mr-4"
              />
            </div>
            <div className="flex flex-col w-[85%] text-black">
              <h2 className="text-base font-semibold">
                {project.title || 'Sans titre'}
              </h2>
              <p className="text-sm opacity-80">{authorUsername}</p>
              <p className="text-sm opacity-80">
                {project.views || 0} Visionnements - {formattedDate}
              </p>
            </div>
          </div>
        </>
      )}
      {fullPost && (
        <>
          <div className="flex flex-col w-1/4">
            <div className="overflow-hidden rounded-[10px] w-full h-full relative">
              <div className="absolute w-full h-full bg-gradient-to-b from-transparent to-black/25 z-10 transition-all"></div>
              <video
                className="absolute z-0 rounded-[8px] w-full h-full object-cover scale-110 transition-all"
                src={project.demoUrl}
              />
              <p className="absolute bottom-[7.5%] right-[7.5%] bg-black/50 text-white px-2 py-1 rounded-bl-[8px] z-20 text-xs">
                {formatDuration(duration)}
              </p>
            </div>
          </div>
          <div className="flex flex-col flex-1 pl-6">
            <div className="flex flex-col text-black">
              <h2 className="text-base font-semibold">
                {project.title || 'Sans titre'}
              </h2>
              <p className="text-sm opacity-80">
                {project.views || 0} Visionnements • {formattedDate}
              </p>
              <div className="flex items-center gap-2 mt-3">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img
                    className="object-cover w-full h-full"
                    src={authorAvatar}
                    alt="Photo de profil"
                  />
                </div>
                <p className="text-sm">{authorUsername}</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-black/80">
              {project.description || 'Aucune description fournie.'}
            </p>
          </div>
        </>
      )}
    </Link>
  );
};
