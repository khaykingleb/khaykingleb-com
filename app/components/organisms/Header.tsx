import { Link } from "@remix-run/react";

interface HeaderProps {
  backgroundImage: string;
}

export const Header = ({ backgroundImage }: HeaderProps) => {
  return (
    <div className="navbar relative h-24 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundAttachment: "fixed",
          filter: "blur(1px)",
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/20"></div>
      <div className="relative flex-1">
        <a className="btn btn-ghost text-xl font-extrabold text-white">
          Gleb Khaykin
        </a>
      </div>
      <div className="relative flex-none">
        <ul className="menu menu-horizontal menu-md px-1 text-white">
          <li>
            <Link to="/blog" className="font-extrabold">
              Blog
            </Link>
          </li>
          <li>
            <Link to="/projects" className="font-extrabold">
              Projects
            </Link>
          </li>
          <li>
            <Link to="/" className="font-extrabold">
              About
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
