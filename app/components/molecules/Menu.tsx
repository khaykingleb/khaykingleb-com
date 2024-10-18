import { Link } from "@remix-run/react";

export const Menu = () => {
  return (
    <ul className="menu menu-horizontal menu-md px-1 text-white">
      <li>
        <Link
          to="/blog"
          className="font-eb-garamond-black btn btn-ghost text-base sm:text-xl"
        >
          Blog
        </Link>
      </li>
      <li>
        <Link
          to="/Gleb_Khaykin.pdf"
          prefetch="intent"
          target="_blank"
          className="font-eb-garamond-black btn btn-ghost text-base sm:text-xl"
        >
          CV
        </Link>
      </li>
      <li>
        <Link
          to="/"
          className="font-eb-garamond-black btn btn-ghost text-base sm:text-xl"
        >
          About
        </Link>
      </li>
    </ul>
  );
};
