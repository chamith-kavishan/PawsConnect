import { Nav } from "../../components/layouts/Nav";
import { Hero } from "./Hero";
import { HowDoWeOperate } from "./HowDoWeOperate";
import { Support } from "./Support";
import { Applications } from "./Applications";
import { RecentBlogs } from "../blog/RecentBlogs";
import { OurMission } from "./OurMission";
import { Organizations } from "../../components/layouts/Organizations";
import { Footer } from "../../components/layouts/Footer";

export const Home = () => {
  return (
    <div>
      <Nav />
      <div className="relative">
        <Hero />
        <Support />
        <HowDoWeOperate />
        <Applications />
        <RecentBlogs />
        <OurMission color={"#1b9195"} text="white" />
        <Organizations />
        <Footer />
      </div>
    </div>
  );
};
