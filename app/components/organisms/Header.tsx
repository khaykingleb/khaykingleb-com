import { Link } from "@remix-run/react";
import { ReactNode } from "react";

export const Header = ({
  headerName,
  children,
  backLink = "/",
}: {
  headerName: string;
  children?: ReactNode;
  backLink?: string;
}) => (
  <>
    <div className="mt-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Link
          to={backLink}
          className="text-3xl font-semibold transition-all hover:scale-110 sm:text-4xl"
        >
          &lt;
        </Link>
        <h1 className="text-3xl font-semibold sm:text-4xl">{headerName}</h1>
      </div>
      {children}
    </div>
    <div className="mb-4 mt-2 h-px w-full bg-gray-200" />
  </>
);
