import { Metadata } from "next";

import { Avatar } from "@/app/contact/components/avatar";
import { SocialMedia } from "@/app/contact/components/social-media";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Contact",
  description: "Connect with me",
  openGraph: {
    title: "Contact",
    description: "Connect with me",
    type: "website",
    url: "https://khaykingleb.com/contact",
    images: ["/avatar.webp"],
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[800px] flex-grow flex-col px-4 sm:px-6 lg:px-8">
      <div className="flex flex-grow flex-col">
        <Header headerName="Contact" />
        <main className="flex flex-grow flex-col">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div className="mx-auto mt-1 md:order-last md:flex-shrink-0">
              <Avatar />
            </div>
            <div className="flex flex-col md:mr-2 md:flex-1 md:items-start">
              <h2 className="mb-1 text-xl font-semibold sm:text-2xl">About</h2>
              <div className="space-y-1 text-base text-pretty">
                <ul className="list-disc space-y-1 space-x-0 pl-4">
                  <li>
                    I&apos;m a full-stack developer — though mostly specializing
                    in MLOps/DevOps — who loves building and designing systems
                  </li>
                  {/* <li>
                    Currently working as an MLOps Engineer at{" "}
                    <a
                      href="https://www.together.ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 transition-all hover:underline hover:opacity-80"
                    >
                      Together.ai
                    </a>{" "}
                    in Amsterdam, building an AI acceleration cloud that lets
                    train, fine-tune, and serve OSS models at scale
                  </li> */}
                  <li>
                    Studied{" "}
                    <a
                      href="https://cs.hse.ru/en/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 transition-all hover:underline hover:opacity-80"
                    >
                      Computer Science
                    </a>{" "}
                    and{" "}
                    <a
                      href="https://economics.hse.ru/en/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 transition-all hover:underline hover:opacity-80"
                    >
                      Economics
                    </a>{" "}
                    at{" "}
                    <a
                      href="https://www.hse.ru/en/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 transition-all hover:underline hover:opacity-80"
                    >
                      National Research University &quot;Higher School of
                      Economics&quot;
                    </a>{" "}
                    — this dual background equips me with a comprehensive
                    understanding of both the business and technical aspects of
                    projects
                  </li>
                  <li>
                    Passed{" "}
                    <a
                      href="https://www.cfainstitute.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 transition-all hover:underline hover:opacity-80"
                    >
                      CFA Level 1
                    </a>{" "}
                    in my third year of undergrad; still keen on finance, so may
                    complete the remaining levels someday for fun
                  </li>
                </ul>
              </div>
              <h2 className="mt-4 mb-1 text-xl font-semibold sm:text-2xl">
                Links
              </h2>
              <div className="grid grid-cols-2 gap-2 md:gap-x-0 md:gap-y-2">
                <SocialMedia size={24} displayLabels={true} />
              </div>
            </div>
            {/* <div className="hidden flex-shrink-0 md:block">
              <Avatar />
            </div> */}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
