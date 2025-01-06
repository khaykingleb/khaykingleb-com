import { Copyright } from "../atoms/Copyright";
import { SocialMedia } from "../molecules/SocialMedia";

/**
 * Footer component
 *
 * @param props - Component props
 * @param props.textColor - Text color class for the footer
 * @returns Footer component
 */
export const Footer = ({ textColor }: { textColor: string }) => {
  return (
    <footer className={`pb-2 pt-2 ${textColor} relative z-10 mb-4`}>
      <div className="container mx-auto flex flex-col items-center justify-between">
        <SocialMedia />
        <Copyright />
      </div>
    </footer>
  );
};
