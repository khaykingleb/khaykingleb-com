import { Copyright } from "../atoms/Copyright";
import { ThemeToggle } from "../molecules/ThemeToggle";

/**
 * Footer component
 *
 * @returns Footer component
 */
export const Footer = () => {
  return (
    <footer className={`relative z-10 mb-4 pb-2 pt-2`}>
      <div className="container mx-auto mt-4 flex flex-col items-center justify-between">
        <ThemeToggle />
        <Copyright />
      </div>
    </footer>
  );
};
