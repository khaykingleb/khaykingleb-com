import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

import { AsciiDonut } from "@/components/ascii-donut";
import { Footer } from "@/components/footer";

/**
 * Home page component.
 *
 * @returns The Home page component.
 */
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <main
        className={`
          mx-8 flex w-full flex-1 flex-col
          sm:mx-60
          2xl:mx-80
        `}
      >
        <AsciiDonut />
        <div className="z-10 flex flex-1 flex-col justify-center">
          <div className="mb-6 flex flex-col gap-4 font-poppins font-black">
            <h1
              className={`
                text-4xl
                sm:text-6xl
              `}
            >
              Hey!
            </h1>
            <h1
              className={`
                text-4xl
                sm:text-6xl
              `}
            >
              I&apos;m{" "}
              <span
                className={`
                  decoration-6 underline-offset-4 transition-colors
                  md:hover:underline
                `}
              >
                Gleb&nbsp;Khaykin
              </span>
            </h1>
            <h1
              className={`
                text-4xl
                sm:text-6xl
              `}
            >
              I build things
            </h1>
          </div>
          <div
            className={`
              flex flex-col gap-2 text-xl font-bold
              sm:text-3xl
            `}
          >
            <Link
              href="/blog"
              className={`
                inline-flex items-center tracking-tight transition-all
                hover:opacity-80
              `}
            >
              <FiChevronRight
                className={`
                  h-6 w-6 transition-all
                  hover:scale-110
                `}
              />{" "}
              Blog
            </Link>
            <Link
              href="/about"
              className={`
                inline-flex items-center tracking-tight transition-all
                hover:opacity-80
              `}
            >
              <FiChevronRight
                className={`
                  h-6 w-6 transition-all
                  hover:scale-110
                `}
              />{" "}
              About
            </Link>
            <Link
              href="/Gleb_Khaykin.pdf"
              target="_blank"
              className={`
                inline-flex items-center tracking-tight transition-all
                hover:opacity-80
              `}
            >
              <FiChevronRight
                className={`
                  h-6 w-6 transition-all
                  hover:scale-110
                `}
              />{" "}
              CV
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
