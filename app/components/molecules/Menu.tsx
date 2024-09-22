import { Link } from "@remix-run/react";

export const Menu = () => {
  return (
    <ul className="menu menu-horizontal menu-md px-1 text-white">
      <li>
        <Link
          to="/blog"
          className="font-eb-garamond-bold btn btn-ghost text-base sm:text-lg"
        >
          Blog
        </Link>
      </li>
      <li>
        <Link
          to="/Gleb_Khaykin.pdf"
          prefetch="intent"
          target="_blank"
          className="font-eb-garamond-bold btn btn-ghost text-base sm:text-lg"
        >
          CV
        </Link>
      </li>
      <li>
        <Link
          to="/"
          className="font-eb-garamond-bold btn btn-ghost text-base sm:text-lg"
        >
          About
        </Link>
      </li>
    </ul>
  );
};
