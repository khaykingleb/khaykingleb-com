import { MetaFunction } from "@remix-run/node";

import { Footer } from "~/components/organisms/Footer";
import { Header } from "~/components/organisms/Header";

export const meta: MetaFunction = () => {
  return [
    { title: "Gleb Khaykin | Projects" },
    { property: "og:title", content: "Gleb Khaykin | Projects" },
    { property: "og:description", content: "Personal website" },
  ];
};

export default function Projects() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header backgroundImage="/img/van_gogh_wheatfield_under_thunderclouds.jpg" />
      <main className="flex flex-grow flex-col items-center justify-center">
        <h1 className="text-center text-3xl font-bold">Coming soon...</h1>
      </main>
      <Footer />
    </div>
  );
}
