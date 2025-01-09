import { FaGithub, FaLinkedin, FaTelegram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { ImMail4 } from "react-icons/im";

interface SocialMediaProps {
  size?: number;
  displayLabels?: boolean;
}

/**
 * Social media component
 *
 * @returns Social media component
 */
export const SocialMedia = ({ size = 24 }: SocialMediaProps) => {
  const links = [
    {
      href: "https://github.com/khaykingleb",
      label: "khaykingleb",
      icon: FaGithub,
    },
    {
      href: "https://linkedin.com/in/khaykingleb",
      label: "khaykingleb",
      icon: FaLinkedin,
    },
    {
      href: "https://twitter.com/khaykingleb",
      label: "@khaykingleb",
      icon: FaSquareXTwitter,
    },
    {
      href: "https://t.me/khaykingleb_blog",
      label: "@khaykingleb_blog",
      icon: FaTelegram,
    },
    {
      href: "mailto:khaykingleb@gmail.com",
      label: "khaykingleb@gmail.com",
      icon: ImMail4,
    },
  ];

  return (
    <>
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="flex items-center space-x-2 hover:text-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          <link.icon style={{ width: size, height: size }} />
          <span className="text-base">{link.label}</span>
        </a>
      ))}
    </>
  );
};
