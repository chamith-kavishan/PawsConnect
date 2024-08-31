import heroImage from "../../assets/images/samples/adopt-a-pet.jpg";

export const AdoptPetHero = () => {
  return (
    <section className="px-[16%] font-poppins">
      <div className="my-10 text-center text-[36px] font-medium">
        Adopt a Pet
      </div>
      <div className="flex w-full items-stretch justify-between">
        <div className="w-1/2">
          <img src={heroImage} className="h-full w-full object-cover" />
        </div>
        <div className="w-1/2 bg-[#02aee0] px-10 py-10">
          <div className="flex flex-col items-start text-white">
            <div className="text-[24px]">Find Your Pet</div>
            <div className="mt-5 text-[30px]">
              Looking for a new best friend? Search our database of pets in need
              of new homes and find your perfect match.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
