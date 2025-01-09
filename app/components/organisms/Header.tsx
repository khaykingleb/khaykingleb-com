import { Link } from "@remix-run/react";
import { ReactNode } from "react";

export const Header = ({
  headerName,
  children,
}: {
  headerName: string;
  children?: ReactNode;
}) => (
  <>
    <div className="mt-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Link to="/" className="text-3xl font-semibold sm:text-4xl">
          &lt;
        </Link>
        <h1 className="text-3xl font-semibold sm:text-4xl">{headerName}</h1>
      </div>
      {children}
    </div>
    <div className="my-4 h-px w-full bg-gray-200" />
  </>
);
