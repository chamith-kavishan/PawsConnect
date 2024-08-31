import { Footer } from "../../components/layouts/Footer";
import { Nav } from "../../components/layouts/Nav";
import { Organizations } from "../../components/layouts/Organizations";
import { RecentBlogs } from "../blog/RecentBlogs";
import { OurMission } from "../home/OurMission";
import { AboutUsHero } from "./AboutUsHero";
import { OurStory } from "./OurStory";
import { OurVision } from "./OurVision";

export const AboutUs = () => {
  return (
    <div>
      <Nav />
      <AboutUsHero />
      <OurVision />
      <OurStory />
      <OurMission color="#feda00" text="black" />
      <RecentBlogs />
      <Organizations />
      <Footer />
    </div>
  );
};
