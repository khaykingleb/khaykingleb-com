import { MetaFunction } from "@remix-run/node";

import { Footer } from "~/components/organisms/Footer";
import { Header } from "~/components/organisms/Header";

export const meta: MetaFunction = () => {
  return [
    { title: "Projects | Gleb Khaykin" },
    { property: "og:title", content: "Projects | Gleb Khaykin" },
    { property: "og:description", content: "Gleb Khaykin's personal website" },
  ];
};

export default function Projects() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header backgroundImage="/img/van_gogh_wheatfield_under_thunderclouds.jpg" />
      <main className="flex flex-grow flex-col items-center justify-center">
        <h1 className="font-eb-garamond-black text-center text-3xl">
          Coming soon...
        </h1>
      </main>
      <Footer />
    </div>
  );
}
