import ourStoryImage from "../../assets/images/our-story.jpg";

export const OurStory = () => {
  return (
    <section className="px-[16%] font-poppins">
      <div className="mt-20">
        <div className="my-10 px-[10%] text-center text-[36px] font-medium">
          Our Story
        </div>
        <div className="w-full px-[10%] text-center">
          PawsConnect was born out of a deep love for animals and a desire to
          make a meaningful difference in their lives. Our journey began when a
          group of passionate animal lovers came together, driven by the shared
          belief that every street animal deserves a chance at a better life.
          Witnessing the struggles and suffering of these animals in our
          communities, we felt compelled to create a platform that would bridge
          the gap between those who need help and those who can provide it. With
          a vision of a compassionate and connected community, we set out to
          develop a comprehensive solution that leverages technology to
          facilitate rescue operations, promote adoption, and spread awareness
          about animal welfare.
        </div>
        <img src={ourStoryImage} className="my-10 px-[20%]" />
        <div className="w-full px-[10%] text-center">
          Over time, PawsConnect has evolved into a thriving network of
          volunteers, animal welfare organizations, and dedicated individuals
          who are united by a common goal. Our platform has enabled countless
          rescues, facilitated numerous adoptions, and fostered a sense of
          community among animal lovers. By providing a space where people can
          share resources, offer support, and collaborate on rescue efforts,
          PawsConnect has become a beacon of hope for street animals. We are
          proud of the positive impact we have made so far and remain committed
          to expanding our reach, improving our services, and continuing to
          advocate for the well-being of all animals.
        </div>
      </div>
    </section>
  );
};
