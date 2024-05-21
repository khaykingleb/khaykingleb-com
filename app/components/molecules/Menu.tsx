import { Link } from "@remix-run/react";

export const Menu = () => {
  return (
    <ul className="menu menu-horizontal menu-md px-1 text-white">
      <li>
        <Link
          to="/blog"
          className="font-eb-garamond-black text-base sm:text-lg"
        >
          Blog
        </Link>
      </li>
      <li>
        <Link
          to="/projects"
          className="font-eb-garamond-black text-base sm:text-lg"
        >
          Projects
        </Link>
      </li>
      <li>
        <Link to="/" className="font-eb-garamond-black text-base sm:text-lg">
          About
        </Link>
      </li>
    </ul>
  );
};
