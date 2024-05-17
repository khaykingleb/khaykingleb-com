import { Avatar } from "~/components/atoms/Avatar";
import { Footer } from "~/components/organisms/Footer";
import { Header } from "~/components/organisms/Header";

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header backgroundImage="/img/van_gogh_wheatfield_with_crows.jpg" />
      <main className="flex-grow">
        <Avatar />
        <div className="font-eb-garamond-light text-pretty px-48 text-center">
          Hey! I'm Gleb. I'm an ML/MLOps Engineer passionate about pushing the
          boundaries of machine learning and operations. With extensive
          experience in enhancing model performance, reducing operational costs,
          and deploying scalable solutions, I thrive on integrating cutting-edge
          technologies to create efficient, reliable, and powerful systems.
        </div>
      </main>
      <Footer />
    </div>
  );
}
