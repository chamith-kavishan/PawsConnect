import logo1 from "../../assets/images/organizations/home-6.jpg";
import logo2 from "../../assets/images/organizations/home-7.jpg";
import logo3 from "../../assets/images/organizations/home-8.jpg";
import logo4 from "../../assets/images/organizations/home-9.jpg";
import logo5 from "../../assets/images/organizations/home-10.jpg";

export const Organizations = () => {
  return (
    <section className="w-full px-[8%] pt-6 font-poppins">
      <div className="flex flex-col items-center justify-center gap-10 bg-[#02aee0] py-20 text-center">
        <div className="text-center text-[36px] font-normal">
          How Do We Operate?
        </div>
        <div className="flex w-full flex-wrap justify-between px-[10%]">
          <img src={logo1} />
          <img src={logo2} />
          <img src={logo3} />
          <img src={logo4} />
          <img src={logo5} />
        </div>
      </div>
    </section>
  );
};
