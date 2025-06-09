import React from 'react';
import { Projet } from '../../types/Projet';
import { Post } from './Post';

interface PostListProps {
  projets: Projet[];
  fullPost?: boolean;
  className?: string;
}

export const PostList: React.FC<PostListProps> = ({
  projets,
  fullPost = false,
  className = '',
}) => {
  return (
    <div
      className={
        className ||
        (fullPost
          ? 'flex flex-col w-full px-[5%] py-8 gap-6'
          : 'flex flex-wrap gap-4 w-full px-[5%] py-8 h-[30rem]')
      }
    >
      {projets.map(projet => (
        <Post key={projet.id} project={projet} fullPost={fullPost} />
      ))}
    </div>
  );
};
