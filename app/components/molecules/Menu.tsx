import { Link } from "@remix-run/react";

export const Menu = () => {
  return (
    <ul className="menu menu-horizontal menu-md px-1 text-white">
      <li>
        <Link to="/blog" className="font-extrabold">
          Blog
        </Link>
      </li>
      <li>
        <Link to="/projects" className="font-extrabold">
          Projects
        </Link>
      </li>
      <li>
        <Link to="/" className="font-extrabold">
          About
        </Link>
      </li>
    </ul>
  );
};
