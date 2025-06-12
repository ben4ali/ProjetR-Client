import { FC, useState } from 'react';
import { Portfolio } from '../../../types/Portfolio';
import { Projet } from '../../../types/Projet';
import { ProjectVideoDialog } from '../ProjectVideoDialog';

interface MinimalistTemplateProps {
  portfolio: Portfolio;
  isPreview?: boolean;
}

export const MinimalistTemplate: FC<MinimalistTemplateProps> = ({
  portfolio,
  isPreview = false,
}) => {
  const {
    user,
    title,
    about,
    hook,
    skills = [],
    projets = [],
    yearsOfExperience,
    cvDownloadUrl,
    jobTitle,
  } = portfolio;
  const [selectedProject, setSelectedProject] = useState<Projet | null>(null);

  const handleCVDownload = () => {
    if (cvDownloadUrl) {
      window.open(cvDownloadUrl, '_blank');
    }
  };

  return (
    <>
      <div
        className={`bg-white text-gray-900 min-h-screen ${
          isPreview ? 'scale-75 origin-top' : ''
        }`}
      >
        <header className="py-8 px-6 border-b border-gray-100">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={user.avatar || '/default-avatar.png'}
                alt={user.firstName}
                className="w-12 h-12 rounded-full"
              />
              <h1 className="text-xl font-light">
                {user.firstName} {user.lastName}
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a
                href="#work"
                className="text-gray-600 hover:text-gray-900 text-sm uppercase tracking-wider"
              >
                Travaux
              </a>
              <a
                href="#about"
                className="text-gray-600 hover:text-gray-900 text-sm uppercase tracking-wider"
              >
                À Propos
              </a>
              <a
                href="#contact"
                className="text-gray-600 hover:text-gray-900 text-sm uppercase tracking-wider"
              >
                Contact
              </a>
              {cvDownloadUrl && (
                <button
                  onClick={handleCVDownload}
                  className="text-gray-600 hover:text-gray-900 text-sm uppercase tracking-wider"
                >
                  CV
                </button>
              )}
            </nav>
          </div>
        </header>
        <section className="py-32 px-6">
          <div className="max-w-4xl mx-auto">
            {' '}
            <div className="max-w-2xl">
              {' '}
              <h2 className="text-6xl font-light leading-tight mb-8">
                {title ? title.split(' ').slice(0, 2).join(' ') : 'Développeur'}{' '}
                &<br />
                <span className="italic text-gray-600">
                  {jobTitle ||
                    (title
                      ? title.split(' ').slice(2).join(' ')
                      : 'Résolveur de Problèmes')}
                </span>
              </h2>
              {hook && (
                <p className="text-lg text-gray-500 font-light italic mb-8 border-l-2 border-gray-200 pl-6">
                  {hook}
                </p>
              )}
              <p className="text-xl text-gray-600 font-light leading-relaxed mb-12">
                {about ||
                  'Je crée des expériences numériques avec du code propre et un design réfléchi. Chaque ligne sert un objectif.'}
              </p>
              {yearsOfExperience && (
                <div className="mb-8">
                  <div className="text-3xl font-light text-gray-900">
                    {yearsOfExperience}+ années d&apos;expérience
                  </div>
                </div>
              )}{' '}
              <a
                href="#work"
                className="border border-gray-900 px-8 py-3 hover:bg-gray-900 hover:text-white transition-colors text-sm uppercase tracking-wider inline-block"
              >
                Voir Travaux Sélectionnés
              </a>
            </div>
          </div>{' '}
        </section>{' '}
        <section id="work" className="py-20 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            {' '}
            <h3 className="text-sm uppercase tracking-wider text-gray-600 mb-16">
              Travaux Sélectionnés
            </h3>
            <div className="space-y-16">
              {projets.slice(0, 3).map((projet, index) => (
                <div
                  key={projet.id}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProject(projet)}
                >
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    {' '}
                    <div className="aspect-video relative overflow-hidden group cursor-pointer">
                      {projet.demoUrl ? (
                        <>
                          <video
                            className="w-full h-full object-cover"
                            src={projet.demoUrl}
                          />
                          <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/10 transition-colors" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-white/90 text-gray-900 px-4 py-2 rounded text-sm font-medium">
                              ▶ Cliquez pour voir la vidéo
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full bg-gray-200 group-hover:bg-gray-300 transition-colors flex items-center justify-center">
                          <div className="text-gray-500 text-sm">
                            Aperçu du projet
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-2">
                        0{index + 1}
                      </div>
                      <h4 className="text-2xl font-light mb-4 group-hover:text-gray-600 transition-colors">
                        {projet.title}
                      </h4>
                      <p className="text-gray-600 font-light leading-relaxed mb-6">
                        {projet.description}
                      </p>
                      <div className="flex space-x-4 text-sm text-gray-500">
                        {projet.tags.slice(0, 3).map(tag => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {projets.length === 0 &&
                [1, 2, 3].map(project => (
                  <div key={project} className="group cursor-pointer">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                      <div className="aspect-video bg-gray-200 group-hover:bg-gray-300 transition-colors"></div>
                      <div>
                        <div className="text-sm text-gray-500 mb-2">
                          0{project}
                        </div>
                        <h4 className="text-2xl font-light mb-4 group-hover:text-gray-600 transition-colors">
                          Titre du Projet {project}
                        </h4>
                        <p className="text-gray-600 font-light leading-relaxed mb-6">
                          Une brève description de ce projet et des technologies
                          utilisées pour le créer. Focus sur le problème résolu
                          et l&apos;impact créé.
                        </p>
                        <div className="flex space-x-4 text-sm text-gray-500">
                          <span>React</span>
                          <span>TypeScript</span>
                          <span>Node.js</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>{' '}
        </section>{' '}
        <section id="about" className="py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16">
              {' '}
              <div>
                <h3 className="text-sm uppercase tracking-wider text-gray-600 mb-8">
                  À Propos
                </h3>
                <h4 className="text-3xl font-light leading-relaxed mb-8">
                  {about
                    ? about.split('.')[0] + '.'
                    : 'Je crois au pouvoir de la simplicité et à la beauté des solutions épurées.'}
                </h4>
                <p className="text-gray-600 font-light leading-relaxed mb-6">
                  {about
                    ? about.split('.').slice(1).join('.').trim()
                    : "Avec plus de 5 ans d'expérience en développement web, je me concentre sur la création d'applications qui sont non seulement fonctionnelles mais aussi maintenables et évolutives."}
                </p>
                {yearsOfExperience && (
                  <p className="text-gray-800 font-light mb-4">
                    {yearsOfExperience} années d&apos;expérience professionnelle
                  </p>
                )}
              </div>
              <div className="space-y-8">
                <div>
                  <h5 className="text-sm uppercase tracking-wider text-gray-600 mb-4">
                    Compétences
                  </h5>
                  <div className="space-y-2">
                    {skills?.slice(0, 5).map(skill => (
                      <div
                        key={skill.name}
                        className="text-gray-800 font-light"
                      >
                        {skill.name}
                      </div>
                    ))}
                    {skills?.length === 0 &&
                      [
                        'JavaScript/TypeScript',
                        'React/Next.js',
                        'Node.js/Express',
                        'PostgreSQL/MongoDB',
                        'AWS/Docker',
                      ].map(skill => (
                        <div key={skill} className="text-gray-800 font-light">
                          {skill}
                        </div>
                      ))}
                  </div>
                </div>
                <div>
                  <h5 className="text-sm uppercase tracking-wider text-gray-600 mb-4">
                    Projets
                  </h5>
                  <div className="space-y-2">
                    <div className="text-gray-800 font-light">
                      {projets.length}+ Projets Complétés
                    </div>
                    <div className="text-gray-800 font-light">
                      Défenseur du Code Propre
                    </div>
                    <div className="text-gray-800 font-light">
                      Design Minimaliste
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>{' '}
        <section id="contact" className="py-32 px-6 border-t border-gray-100">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16">
              {' '}
              <div>
                <h3 className="text-sm uppercase tracking-wider text-gray-600 mb-8">
                  Contact
                </h3>
                <h4 className="text-3xl font-light leading-relaxed mb-8">
                  Discutons de votre{' '}
                  <span className="italic">prochain projet</span>.
                </h4>
                <p className="text-gray-600 font-light leading-relaxed mb-8">
                  Je suis toujours intéressé à entendre parler de nouvelles
                  opportunités et de défis créatifs.
                </p>
                <a
                  href={`mailto:${user.email}`}
                  className="border border-gray-900 w-62 text-center py-3 hover:bg-gray-900 hover:text-white transition-colors text-sm uppercase tracking-wider inline-block"
                >
                  Envoyer un Message
                </a>
                {cvDownloadUrl && (
                  <a
                    href={cvDownloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-gray-600 text-gray-600  text-center py-3 w-62 hover:bg-gray-600 hover:text-white transition-colors mt-3 text-sm uppercase tracking-wider inline-block"
                  >
                    Télécharger CV
                  </a>
                )}
              </div>
              <div className="space-y-6">
                <div>
                  <div className="text-sm uppercase tracking-wider text-gray-600 mb-2">
                    Email
                  </div>
                  <div className="text-gray-800 font-light">{user.email}</div>
                </div>
                <div>
                  <div className="text-sm uppercase tracking-wider text-gray-600 mb-2">
                    Réseaux Sociaux
                  </div>
                  <div className="space-y-1">
                    <div className="text-gray-800 font-light hover:text-gray-600 cursor-pointer">
                      LinkedIn
                    </div>
                    <div className="text-gray-800 font-light hover:text-gray-600 cursor-pointer">
                      GitHub
                    </div>
                    <div className="text-gray-800 font-light hover:text-gray-600 cursor-pointer">
                      Twitter
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>{' '}
      {selectedProject && (
        <ProjectVideoDialog
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          variant="minimalist"
        />
      )}
    </>
  );
};
