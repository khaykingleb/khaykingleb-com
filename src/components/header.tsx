import Link from "next/link";
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
          href={backLink}
          className="text-3xl font-semibold transition-all sm:text-4xl md:hover:scale-105 md:hover:opacity-80"
        >
          &lt;
        </Link>
        <h1 className="text-3xl font-semibold sm:text-4xl">{headerName}</h1>
      </div>
      {children}
    </div>
    <div className="mt-2 mb-2 h-px w-full bg-gray-200" />
  </>
);
