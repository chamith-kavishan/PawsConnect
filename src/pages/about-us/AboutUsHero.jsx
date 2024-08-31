import heroImage from "../../assets/images/samples/about-us.jpg";

export const AboutUsHero = () => {
  return (
    <section className="px-[16%] font-poppins">
      <div className="my-10 text-center text-[36px] font-medium">About Us</div>
      <div className="flex w-full justify-between">
        <div className="w-1/2">
          <img src={heroImage} className="w-full object-cover" />
        </div>
        <div className="w-1/2 bg-[#02aee0] px-10 py-10">
          <div className="flex flex-col items-start text-white">
            <div className="text-[24px]">Our Motto</div>
            <div className="mt-5 text-[30px]">
              we unite compassionate people and organizations to rescue and care
              for street animals, ensuring they receive the love and protection
              they deserve.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
