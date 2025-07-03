import { FaSearch } from "react-icons/fa";

import { Pagination } from "@/app/blog/components/pagination";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

/**
 * Blog loading component.
 *
 * @returns The blog loading component.
 */
export default function Loading() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[800px] flex-grow flex-col px-4 sm:px-6 lg:px-8">
      <div className="flex flex-grow flex-col">
        <Header headerName="Blog">
          <div className="relative flex items-center">
            <button
              aria-label="Search"
              className="flex text-lg transition-all sm:text-xl md:hover:scale-105"
            >
              <FaSearch />
            </button>
          </div>
        </Header>
        <main className="flex flex-grow">
          <div className="flex-grow animate-pulse rounded-lg bg-gray-200" />
        </main>
        <Pagination currentPage={0} pagesInTotal={5} />
        <Footer />
      </div>
    </div>
  );
}
