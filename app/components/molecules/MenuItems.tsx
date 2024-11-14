import { NavLink } from "@remix-run/react";

/**
 * Menu items component
 *
 * @returns Menu items component
 */
export const MenuItems = () => {
  return (
    <ul className="menu menu-horizontal menu-md">
      <li>
        <NavLink
          to="/blog"
          className={({ isActive }) =>
            `btn btn-ghost text-lg sm:text-xl ${isActive ? "active" : "no-animation"}`
          }
          style={{ fontWeight: "bold" }}
        >
          Blog
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/Gleb_Khaykin.pdf"
          prefetch="intent"
          target="_blank"
          className={({ isActive }) =>
            `btn btn-ghost text-lg sm:text-xl ${isActive ? "active" : "no-animation"}`
          }
          style={{ fontWeight: "bold" }}
        >
          CV
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `btn btn-ghost text-lg sm:text-xl ${isActive ? "active" : "no-animation"}`
          }
          style={{ fontWeight: "bold" }}
        >
          About
        </NavLink>
      </li>
    </ul>
  );
};
