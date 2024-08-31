import logo from "../../assets/images/logo-no-background.svg";

export const Footer = () => {
  return (
    <section className="w-full px-[8%] font-poppins">
      <div className="flex items-center justify-between bg-[#feda00] px-[20%] py-20">
        <img src={logo} className="w-[40%]" />
        <div>
          <div className="mb-10 text-[24px]">Information</div>
          <ul className="flex flex-col gap-10">
            <li>
              <a href="#" className="text-[16px] font-semibold text-[#10275E]">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="text-[16px] font-semibold text-[#10275E]">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="text-[16px] font-semibold text-[#10275E]">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
