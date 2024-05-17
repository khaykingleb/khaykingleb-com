import { Avatar } from "~/components/atoms/Avatar";
import { Footer } from "~/components/organisms/Footer";
import { Header } from "~/components/organisms/Header";

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header backgroundImage="/img/van_gogh_wheatfield_under_thunderclouds.jpg" />
      <main className="flex-grow">
        <Avatar />
        <div className="py-4 text-center">Hey!</div>
      </main>
      <Footer />
    </div>
  );
}
