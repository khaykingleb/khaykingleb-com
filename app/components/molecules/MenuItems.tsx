import { Link } from "@remix-run/react";

/**
 * Menu items component
 *
 * @returns Menu items component
 */
export const MenuItems = () => {
  return (
    <ul className="menu menu-horizontal menu-md">
      <li>
        <Link to="/blog" className="btn btn-ghost text-xl sm:text-2xl">
          Blog
        </Link>
      </li>
      <li>
        <Link
          to="/Gleb_Khaykin.pdf"
          prefetch="intent"
          target="_blank"
          className="btn btn-ghost text-xl sm:text-2xl"
        >
          CV
        </Link>
      </li>
      <li>
        <Link to="/" className="btn btn-ghost text-xl sm:text-2xl">
          About
        </Link>
      </li>
    </ul>
  );
};
