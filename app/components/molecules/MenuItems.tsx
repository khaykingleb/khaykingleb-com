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
        <Link
          to="/blog"
          className="btn btn-ghost no-animation text-lg sm:text-xl"
          style={{ fontWeight: "bold" }}
        >
          Blog
        </Link>
      </li>
      <li>
        <Link
          to="/Gleb_Khaykin.pdf"
          prefetch="intent"
          target="_blank"
          className="btn btn-ghost no-animation text-lg sm:text-xl"
          style={{ fontWeight: "bold" }}
        >
          CV
        </Link>
      </li>
      <li>
        <Link
          to="/"
          className="btn btn-ghost no-animation text-lg sm:text-xl"
          style={{ fontWeight: "bold" }}
        >
          About
        </Link>
      </li>
    </ul>
  );
};
