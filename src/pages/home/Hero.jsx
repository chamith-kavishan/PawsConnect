import hero from "../../assets/images/samples/krista-mangulsone-9gz3wfHr65U-unsplash.jpg";

export const Hero = () => {
  return (
    <section className="w-full px-[8%] font-poppins">
      <div className="h-[750px]">
        <img src={hero} className="w-full object-cover" />
      </div>
    </section>
  );
};
