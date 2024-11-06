import { Copyright } from "../atoms/Copyright";
import { SocialMedia } from "../molecules/SocialMedia";

/**
 * Footer component
 *
 * @returns Footer component
 */
export const Footer = () => {
  return (
    <footer className="footer bg-white pb-2 pt-2 text-gray-400">
      <div className="container mx-auto flex flex-col items-center justify-between">
        <SocialMedia />
        <Copyright />
      </div>
    </footer>
  );
};
