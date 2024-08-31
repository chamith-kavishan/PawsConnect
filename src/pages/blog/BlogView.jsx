import React from "react";
import { Nav } from "../../components/layouts/Nav";
import { BlogViewHero } from "./BlogViewHero";
import { Footer } from "../../components/layouts/Footer";

export const BlogView = () => {
  return (
    <div>
      <Nav />
      <BlogViewHero />
      <Footer />
    </div>
  );
};
