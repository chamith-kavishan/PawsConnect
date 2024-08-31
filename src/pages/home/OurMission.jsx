export const OurMission = ({ color, text }) => {
  return (
    <section className="w-full px-[8%] pb-20 pt-6 font-poppins">
      <div
        className={`flex flex-col items-center justify-center gap-6 bg-[${color}] py-10 text-center`}
      >
        <span className={`text-[20px] text-${text}`}>Our Mission</span>
        <div
          className={`flex w-[60%] items-center justify-center text-center text-[36px] text-${text}`}
        >
          At PawsConnect, our mission is to connect compassionate individuals
          and organizations to improve the welfare of street animals. We aim to
          ensure every animal receives the care and love they deserve through
          rescue, adoption, and education. Together, we strive to create a world
          where every animal has a safe and loving home.
        </div>
      </div>
    </section>
  );
};
