import { navigationButtons } from "../../utils/dataArrays";
import logo from "../../assets/images/logo-no-background.svg";
import { Link, useNavigate } from "react-router-dom";
import { PrimaryButton } from "../global/PrimaryButton";

export const Nav = () => {
  const navigate = useNavigate();

  const handleOrganization = () => {
    navigate("/organization");
  };

  return (
    <section className="px-[16%] font-poppins">
      <div className="h-1 w-full bg-[#10a9d1]"></div>
      <div className="flex h-24 w-full items-center justify-between bg-white">
        <div className="flex w-[25%] items-center justify-center pl-10">
          <img src={logo} className="w-[200px]" />
        </div>
        <div className="flex w-[50%] items-center justify-between gap-3">
          {navigationButtons.map((button, index) => {
            return (
              <Link
                to={button.link}
                key={index}
                className="w-fit whitespace-nowrap rounded-[6px] px-5 py-3 text-[16px] font-semibold transition-all duration-500 hover:bg-[#ffda05]"
              >
                {button.title}
              </Link>
            );
          })}
        </div>
        <div className="flex w-[25%] items-center justify-center gap-2.5 pr-10">
          <PrimaryButton text="Organization" onClick={handleOrganization} />
        </div>
      </div>
    </section>
  );
};
