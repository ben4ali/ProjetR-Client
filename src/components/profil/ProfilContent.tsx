import { FC } from "react";
import { ProfilStats } from "./ProfilStats";

interface ProfilContentProps {
  firstName: string;
  lastName: string;
  pseudo: string;
}

export const ProfilContent: FC<ProfilContentProps> = ({
  firstName,
  lastName,
  pseudo,
}) => {
  return (
    <div className="mt-16 md:mt-4 flex flex-col w-[80%] md:w-[50%] md:ml-[22%] ml-[10%] h-[32%] leading-[2.25rem]">
      <div className="profil-info">
        <h1 className="text-3xl md:text-4xl m-0">
          {firstName} {lastName}
        </h1>
        <p className="text-xl md:text-2xl text-black/50 m-0">@{pseudo}</p>
      </div>
      <ProfilStats />
    </div>
  );
};
