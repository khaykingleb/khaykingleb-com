import { Menu } from "../molecules/Menu";

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
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/20"></div>
      <div className="relative flex-1">
        <a className="btn btn-ghost text-xl font-extrabold text-white">
          Gleb Khaykin
        </a>
      </div>
      <div className="relative flex-none">
        <Menu />
      </div>
    </div>
  );
};
