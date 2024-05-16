import { Copyright } from "../atoms/Copyright";
import { SocialMedia } from "../atoms/SocialMedia";

export const Footer = () => {
  return (
    <footer className="footer bg-white p-6 text-gray-400">
      <div className="container mx-auto flex flex-col items-center justify-between">
        <SocialMedia />
        <Copyright />
      </div>
    </footer>
  );
};
