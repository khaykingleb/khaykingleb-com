import { Avatar } from "~/components/atoms/Avatar";
import { Footer } from "~/components/organisms/Footer";
import { Header } from "~/components/organisms/Header";

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header backgroundImage="/img/van_gogh_wheatfield_with_crows.jpg" />
      <div className="avatar flex items-center justify-center p-6">
        <Avatar />
      </div>
      <div className="grow">
        <div className="text font-eb-garamond-light mx-auto max-w-lg text-pretty text-center">
          <p className="mb-2">
            Welcome! I'm Gleb, a full-stack developer with a focus on DevOps and
            ML/MLOps engineering. Or, in simpler terms, I code things and
            occasionally break them... (Don't worry, I fix them after hitting
            staging or QA in the end!)
          </p>
          <p className="mb-2">
            Early on, I had thoughts of being a software engineer, investment
            banker, or fitness trainer. Ultimately, I ended up at the Higher
            School of Economics, where I studied both Computer Science and
            Finance. This background helps me understand not only the technical
            side of things but also the business aspects of projects.
          </p>
          <p className="mb-2">
            Professionally, I build scalable services whether in the cloud or
            on-premise, and have a solid track record of boosting model
            performance and cutting costs. Outside of work, I enjoy hitting the
            weights at the gym, striving to look like a fitness trainer without
            actually being one. At least, yet! Who knows, maybe, Devin's gonna
            make it, lol.
          </p>
          <p className="mb-2">
            Here, you’ll find a collection of resources I’ve found valuable.
            Dive in, and I hope you discover some tools and materials useful for
            yourself. Also, you can check out my Telegram channel in the footer
            below; it's where I share thoughts and materials in a more
            unstructured and freestyle format.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
