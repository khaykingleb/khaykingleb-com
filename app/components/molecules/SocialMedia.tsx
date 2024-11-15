import { AiFillInstagram } from "react-icons/ai";
import { FaGithub, FaLinkedin, FaTelegram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { ImMail4 } from "react-icons/im";

/**
 * Social media component
 *
 * @returns Social media component
 */
export const SocialMedia = () => {
  return (
    <div className="mt-1 flex space-x-3">
      <a
        href="https://www.linkedin.com/in/khaykingleb"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <FaLinkedin className="h-6 w-6" />
      </a>
      <a
        href="https://github.com/khaykingleb"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
      >
        <FaGithub className="h-6 w-6" />
      </a>
      <a
        href="https://t.me/khaykingleb_blog"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Telegram"
      >
        <FaTelegram className="h-6 w-6" />
      </a>
      <a
        href="https://x.com/khaykingleb"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X"
      >
        <FaSquareXTwitter className="h-6 w-6" />
      </a>
      <a
        href="https://instagram.com/khaykingleb"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
      >
        <AiFillInstagram className="-mt-0.5 h-7 w-7" />
      </a>
      <a href="mailto:khaykingleb@gmail.com" aria-label="Email">
        <ImMail4 className="h-6 w-6" />
      </a>
    </div>
  );
};
