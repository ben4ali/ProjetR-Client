import { useMemo } from 'react';
import { ProfilBody } from '../components/profil/ProfilBody';
import { ProfilHeader } from '../components/profil/ProfilHeader';
import { useCurrentUser } from '../hooks/use-auth';
import { useProjectsByUserId } from '../hooks/use-project';
import { useUserById } from '../hooks/use-users';

export const Profil = () => {
  const id = window.location.pathname.split('/').pop();
  const { data: user } = useUserById(id);
  const { data: projets } = useProjectsByUserId(id);
  const { data: currentUser } = useCurrentUser();
  const isCurrentUser = useMemo(
    () => currentUser?.id === user?.id,
    [currentUser, user]
  );

  return (
    <div className="flex flex-col items-center pb-12 mt-10">
      {user && (
        <ProfilHeader
          firstName={user.firstName}
          lastName={user.lastName}
          pseudo={user.username}
          user={user}
          banner={user.banner || ''}
          isCurrentUser={isCurrentUser}
          projets={projets || []}
        />
      )}
      <ProfilBody projets={projets || []} />
    </div>
  );
};
