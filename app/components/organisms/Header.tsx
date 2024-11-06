import { MenuItems } from "../molecules/MenuItems";
import { MobileMenuItems } from "../molecules/MobileMenuItems";

interface HeaderProps {
  backgroundImageUrl: string;
}

/**
 * Header component
 *
 * @param backgroundImageUrl - The background image URL
 * @returns Header component
 */
export const Header = ({ backgroundImageUrl }: HeaderProps) => {
  return (
    <header className="h-18 relative flex items-center px-4 sm:px-6 lg:px-8">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/20"></div>
      <div className="font-gill-sans-bold relative z-10 mx-auto flex w-full max-w-[750px] items-center justify-between text-white">
        <span className="text-xl sm:text-2xl">~/khaykingleb</span>
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
