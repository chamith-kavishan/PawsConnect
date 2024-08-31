import heroImage from "../../assets/images/blog/blog-hero.jpg";

export const BlogViewHero = () => {
  return (
    <section className="px-[16%] font-poppins">
      <div className="my-10 text-center text-[36px] font-medium">Our Blog</div>
      <div className="flex w-full items-stretch justify-between">
        <div className="w-1/2 bg-[#02aee0] px-10 py-10">
          <div className="flex items-center gap-5">
            <div className="rounded-[5px] bg-[#F9DE00] px-3 py-1">
              ANIMAL HEALTH
            </div>
            <div className="text-[18px] text-white">January 8, 2024</div>
          </div>
          <div className="flex flex-col items-start text-white">
            <div className="mt-5 text-[36px]">
              Exploring the world of pet training, behavior, and enrichment.
            </div>
          </div>
          <div className="mt-6 text-white">by Baw Baw</div>
        </div>
        <div className="w-1/2">
          <img src={heroImage} className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
};
