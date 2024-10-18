import { MenuItems } from "../molecules/MenuItems";
import { MobileMenuItems } from "../molecules/MobileMenuItems";

interface HeaderProps {
  backgroundImage: string;
}

export const Header = ({ backgroundImage }: HeaderProps) => {
  return (
    <header className="relative flex h-16 items-center px-4 sm:px-6 lg:px-8">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/20"></div>
      <div className="relative z-10 mx-auto flex w-full max-w-[700px] items-center justify-between">
        <span className="font-eb-garamond-black text-xl text-white sm:text-2xl">
          ~/khaykingleb
        </span>
        <nav className="hidden sm:block">
          <MenuItems />
        </nav>
        <nav className="flex items-center sm:hidden">
          <MobileMenuItems />
        </nav>
      </div>
    </header>
  );
};
