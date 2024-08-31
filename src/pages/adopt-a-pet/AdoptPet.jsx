import { Footer } from "../../components/layouts/Footer";
import { Nav } from "../../components/layouts/Nav";
import { Organizations } from "../../components/layouts/Organizations";
import { AdoptPetHero } from "./AdoptPetHero";
import { PetStore } from "./PetStore";

export const AdoptPet = () => {
  return (
    <div>
      <Nav />
      <AdoptPetHero />
      <PetStore />
      <Organizations />
      <Footer />
    </div>
  );
};
