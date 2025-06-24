import { FC } from "react";
import type { User } from "../../../../types/User";

interface HeaderProps {
  user: User;
}

export const Header: FC<HeaderProps> = ({ user }) => {
  return (
    <nav
      className={`fixed top-5 left-1/2 z-20 flex w-[75%] -translate-x-1/2 justify-between gap-3`}
    >
      <a
        href="#hero"
        className="hidden h-13 w-13 items-center gap-4 rounded-full sm:flex"
      >
        <img
          src={user.avatar || "/default-avatar.png"}
          alt={`${user.firstName} ${user.lastName}`}
          className="rounded-full p-1"
        />
      </a>
      <ul
        className="backdrop-blur-4xl! mt-1 mr-10 flex gap-3 rounded-full border border-neutral-800 bg-neutral-400/8 p-4 px-6 text-sm text-neutral-400"
        style={{
          boxShadow: "0 0 24px 4px rgba(255,255,255,0.05)",
        }}
      >
        <li>
          <a
            href={"#a-propos"}
            className="relative pb-2 transition-colors duration-300 hover:text-neutral-100"
          >
            À propos
          </a>
        </li>
        <li>
          <a
            href={"#competences"}
            className="relative pb-2 transition-colors duration-300 hover:text-neutral-100"
          >
            Compétences
          </a>
        </li>
        <li>
          <a
            href={"#projets"}
            className="relative pb-2 transition-colors duration-300 hover:text-neutral-100"
          >
            Projets
          </a>
        </li>
        <li>
          <a
            href={"#contact"}
            className="relative pb-2 transition-colors duration-300 hover:text-neutral-100"
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
