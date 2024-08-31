import heroImage from "../../assets/images/blog/blog-hero.jpg";

export const BlogHero = () => {
  return (
    <section className="px-[16%] font-poppins">
      <div className="my-10 text-center text-[36px] font-medium">Our Blog</div>
      <div className="flex w-full items-stretch justify-between">
        <div className="w-1/2 bg-[#02aee0] px-10 py-10">
          <div className="flex flex-col items-start text-white">
            <div className="mt-5 text-[36px]">
              Exploring the world of pet training, behavior, and enrichment.
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <img src={heroImage} className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
};
