import { Footer } from "../../components/layouts/Footer";
import { Nav } from "../../components/layouts/Nav";
import { BlogCards } from "./BlogCards";
import { BlogHero } from "./BlogHero";

export const Blog = () => {
  return (
    <div>
      <Nav />
      <BlogHero />
      <BlogCards />
      <Footer />
    </div>
  );
};
