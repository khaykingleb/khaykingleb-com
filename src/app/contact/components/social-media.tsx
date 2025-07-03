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
export const SocialMedia = ({
  size = 24,
  displayLabels = false,
}: SocialMediaProps) => {
  const links = [
    {
      href: "https://github.com/khaykingleb",
      platform: "GitHub",
      label: "khaykingleb",
      icon: FaGithub,
    },
    {
      href: "https://linkedin.com/in/khaykingleb",
      platform: "LinkedIn",
      label: "khaykingleb",
      icon: FaLinkedin,
    },
    {
      href: "https://twitter.com/khaykingleb",
      platform: "X / Twitter",
      label: "@khaykingleb",
      icon: FaSquareXTwitter,
    },
    {
      href: "https://t.me/khaykingleb_blog",
      platform: "Telegram",
      label: "@khaykingleb_blog",
      icon: FaTelegram,
    },
    {
      href: "mailto:khaykingleb@gmail.com",
      platform: "Email",
      label: "khaykingleb@gmail.com",
      icon: ImMail4,
    },
  ];

  return (
    <>
      {links.map((link) => {
        return (
          <a
            key={link.href}
            href={link.href}
            className="flex items-center space-x-2 transition-all hover:opacity-80"
            target="_blank"
            rel="noopener noreferrer"
          >
            <link.icon
              style={{ width: size, height: size }}
              className="flex-shrink-0 transition-all md:hover:scale-105"
            />
            {displayLabels && (
              <div>
                <div className="font-semibold">{link.platform}</div>
                <div className="text-sm text-gray-500">{link.label}</div>
              </div>
            )}
          </a>
        );
      })}
    </>
  );
};
