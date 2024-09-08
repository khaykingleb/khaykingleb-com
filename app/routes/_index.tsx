import { MetaFunction } from "@remix-run/node";

import { Avatar } from "~/components/atoms/Avatar";
import { Footer } from "~/components/organisms/Footer";
import { Header } from "~/components/organisms/Header";

export const meta: MetaFunction = () => {
  return [
    { title: "About | Gleb Khaykin" },
    { property: "og:title", content: "About | Gleb Khaykin" },
    { property: "og:description", content: "Gleb Khaykin's personal website" },
  ];
};

export default function IndexRoute() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header backgroundImage="/img/van_gogh_wheatfield_with_crows.jpg" />
      <div className="avatar flex items-center justify-center p-6">
        <Avatar />
      </div>
      <div className="grow">
        <div className="font-eb-garamond-light mx-auto max-w-lg text-pretty text-center text-sm sm:text-base">
          <p className="mb-2">
            Hi there! I&apos;m Gleb, a full-stack developer specializing in
            DevOps and MLOps engineering. My background includes distributed
            systems, speech processing, speech synthesis, natural language
            processing, and finance. When I&apos;m not coding, you&apos;ll
            likely find me at the gym, lifting weights.
          </p>
          <p className="mb-2">
            I&apos;ve graduated summa cum laude from the Higher School of
            Economics, where I studied both Computer Science and Finance. This
            dual background helps me understand both the technical and business
            aspects of projects.
          </p>
          <p className="mb-2">
            On this site, you&apos;ll find a collection of resources that
            I&apos;ve found valuable. Feel free to explore, and I hope you
            discover some useful tools and materials! You can also find links to
            my Telegram channel (in Russian) and X profile (in English) in the
            footer below. It&apos;s where I share my thoughts and materials in a
            more freestyle format.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
