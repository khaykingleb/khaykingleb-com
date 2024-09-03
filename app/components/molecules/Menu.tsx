import { Link } from "@remix-run/react";

export const Menu = () => {
  return (
    <ul className="menu menu-horizontal menu-md px-1 text-white">
      <li>
        <Link
          to="/blog"
          className="font-eb-garamond-black btn btn-ghost text-base sm:text-lg"
        >
          Blog
        </Link>
      </li>
      <li>
        <Link
          to="/notes"
          className="font-eb-garamond-black btn btn-ghost text-base sm:text-lg"
        >
          Notes
        </Link>
      </li>
      <li>
        <Link
          to="/resume.pdf"
          prefetch="intent"
          target="_blank"
          className="font-eb-garamond-black btn btn-ghost text-base sm:text-lg"
        >
          Resume
        </Link>
      </li>
      <li>
        <Link
          to="/"
          className="font-eb-garamond-black btn btn-ghost text-base sm:text-lg"
        >
          About
        </Link>
      </li>
    </ul>
  );
};
