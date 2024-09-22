import { FaGithub, FaLinkedin, FaTelegram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export const SocialMedia = () => {
  return (
    <div className="flex space-x-4">
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
      <a href="mailto:khaykingleb@gmail.com" aria-label="Email">
        <MdEmail className="h-6 w-6" />
      </a>
    </div>
  );
};
