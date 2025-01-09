import { Avatar } from "~/components/atoms/Avatar";
import { SocialMedia } from "~/components/molecules/SocialMedia";
import { Footer } from "~/components/organisms/Footer";
import { Header } from "~/components/organisms/Header";

/**
 * The main component for the route
 *
 * @returns The route layout
 */
export default function ContactRoute() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[800px] flex-grow flex-col px-4 sm:px-6 lg:px-8">
      <div className="flex flex-grow flex-col">
        <Header headerName="Contact" />
        <main className="flex flex-grow flex-col">
          <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-start md:space-x-8 md:space-y-0">
            <div className="flex flex-col items-center md:items-start">
              <div className="mb-6 md:hidden">
                <Avatar />
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-bold">About</h2>
                <div className="space-y-1 text-base">
                  <p>
                    Hi there! I&apos;m Gleb, a full-stack developer specializing
                    in MLOps and DevOps engineering. My background includes
                    distributed systems, speech processing, speech synthesis,
                    natural language processing, and finance. When I&apos;m not
                    coding, you&apos;ll likely find me at the gym, lifting
                    weights.
                  </p>
                  <p>
                    I&apos;ve graduated summa cum laude from the Higher School
                    of Economics, where I studied both Computer Science and
                    Finance. This dual background helps me understand both the
                    technical and business aspects of projects.
                  </p>
                </div>
              </div>
            </div>
            <div className="hidden flex-shrink-0 md:block">
              <Avatar />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Links</h2>
            <div className="flex flex-col space-y-4">
              <SocialMedia size={24} displayLabels={true} />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
