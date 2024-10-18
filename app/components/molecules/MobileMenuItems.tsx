import { Link } from "@remix-run/react";
import { IoMdMenu } from "react-icons/io";

export const MobileMenuItems = () => (
  <details className="dropdown dropdown-end">
    <summary className="btn btn-circle btn-ghost">
      <IoMdMenu className="h-6 w-6 text-white" />
    </summary>
    <ul className="menu dropdown-content absolute right-0 z-[1] mt-2 w-28 rounded-lg bg-white shadow-lg">
      <li>
        <Link
          to="/blog"
          className="font-eb-garamond-bold btn btn-ghost text-base hover:bg-gray-100"
        >
          Blog
        </Link>
      </li>
      <hr className="my-1 border-t border-gray-200" />
      <li>
        <Link
          to="/Gleb_Khaykin.pdf"
          prefetch="intent"
          target="_blank"
          className="font-eb-garamond-bold btn btn-ghost text-base hover:bg-gray-100"
        >
          CV
        </Link>
      </li>
      <hr className="my-1 border-t border-gray-200" />
      <li>
        <Link
          to="/"
          className="font-eb-garamond-bold btn btn-ghost text-base hover:bg-gray-100"
        >
          About
        </Link>
      </li>
    </ul>
  </details>
);
