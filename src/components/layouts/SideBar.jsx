import { useState, useEffect } from "react";
import { ListItem, ListItemPrefix } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import logo from "./../../assets/images/logo-sidebar.png";
import logoSmall from "../../assets/images/logo.png";
import { newNavigationItems } from "../../utils/dataArrays";
import { CloseSidebarIcon } from "../../utils/icons";
import { useStateContext } from "../../contexts/NavigationContext";
import axiosClient from "../../../axios-client";
import Swal from "sweetalert2";

export const SideBar = ({
  handleSidebar,
  sidebar,
  handleLogout,
  toggleSidebarExpand,
  sidebarExpanded,
  showSalesman,
}) => {
  const { user } = useStateContext();

  const [linkchange, setLinkChange] = useState(false);
  const [salesmanEnabled, setSalesmanEnabled] = useState(0);
  const [currentUrl, setCurrentUrl] = useState("/dashboard");

  const changeUrl = () => {
    setCurrentUrl(window.location.href.split("/").pop());
  };

  useEffect(() => {
    changeUrl();
  }, [linkchange]);

  return (
    <div dir="ltr">
      <div
        className={`font-inter fade-right-enter-active fixed z-50 flex h-full transform flex-col items-start overflow-visible rounded-l-lg rounded-r-[40px] bg-[#FFFFFF] pb-20 shadow-xl transition-all duration-300 ease-in-out md:opacity-100 ${
          sidebar ? "fade-right-enter-to" : "fade-right-enter-from"
        } ${sidebarExpanded ? "w-[60%] md:w-[15%]" : "w-[60%] md:w-[80px]"}`}
        style={{ transition: "all 0.5s ease-in-out" }}
      >
        <div className="relative z-50 mb-2 flex w-full items-center gap-4 p-4">
          <div className="relative mb-10 flex h-[80px] w-full justify-center">
            <img
              src={logo}
              alt="brand"
              className={`absolute left-1/2 top-0 transform pt-4 transition-all duration-500 ease-in-out ${
                sidebarExpanded
                  ? "translate-x-[-50%] opacity-100"
                  : "translate-x-[-60%] opacity-0"
              }`}
              style={{
                visibility: sidebarExpanded ? "visible" : "hidden",
                transition:
                  "opacity 0.5s ease-in-out, transform 0.5s ease-in-out, visibility 0.5s",
              }}
            />
            <img
              src={logoSmall}
              alt="brand"
              className={`absolute left-1/2 top-0 transform pt-5 transition-all duration-500 ease-in-out ${
                sidebarExpanded
                  ? "translate-x-[-40%] opacity-0"
                  : "translate-x-[-50%] opacity-100"
              }`}
              style={{
                visibility: sidebarExpanded ? "hidden" : "visible",
                transition:
                  "opacity 0.5s ease-in-out, transform 0.5s ease-in-out, visibility 0.5s",
              }}
            />
          </div>
          <span
            onClick={handleSidebar}
            className="absolute right-0 top-0 md:hidden"
          ></span>
          <div
            className="z-100 absolute -right-[15px] top-28 hidden aspect-square w-[30px] cursor-pointer items-center justify-center rounded-full bg-[#FF8828] pr-[3px] md:flex"
            onClick={toggleSidebarExpand}
          >
            {sidebarExpanded ? (
              <span className="cursor-pointer">
                <CloseSidebarIcon />
              </span>
            ) : (
              <span className="rotate-180 cursor-pointer pr-1">
                <CloseSidebarIcon />
              </span>
            )}
          </div>
        </div>

        <div className="scrollbar-y-style relative w-full overflow-x-hidden overflow-y-scroll">
          <li className="flex w-full list-none flex-col gap-1">
            {newNavigationItems.slice(0, 7).map((item, itemIndex) => {
              return (
                <NavItem
                  icon={item.icon}
                  currentUrl={currentUrl}
                  setLinkChange={setLinkChange}
                  changeUrl={changeUrl}
                  key={itemIndex}
                  title={item.title}
                  link={item.link}
                  children={item.children}
                  handleSidebar={handleSidebar}
                  toggleSidebarExpand={toggleSidebarExpand}
                  sidebarExpanded={sidebarExpanded}
                />
              );
            })}
          </li>
          {showSalesman && (
            <li className="flex w-full list-none flex-col gap-1">
              {newNavigationItems.slice(7, 8).map((item, itemIndex) => {
                return (
                  <NavItem
                    icon={item.icon}
                    currentUrl={currentUrl}
                    setLinkChange={setLinkChange}
                    changeUrl={changeUrl}
                    key={itemIndex}
                    title={item.title}
                    link={item.link}
                    children={item.children}
                    handleSidebar={handleSidebar}
                    toggleSidebarExpand={toggleSidebarExpand}
                    sidebarExpanded={sidebarExpanded}
                  />
                );
              })}
            </li>
          )}
          <li className="flex w-full list-none flex-col gap-1">
            {newNavigationItems.slice(8, 11).map((item, itemIndex) => {
              return (
                <NavItem
                  icon={item.icon}
                  currentUrl={currentUrl}
                  setLinkChange={setLinkChange}
                  changeUrl={changeUrl}
                  key={itemIndex}
                  title={item.title}
                  link={item.link}
                  children={item.children}
                  handleSidebar={handleSidebar}
                  toggleSidebarExpand={toggleSidebarExpand}
                  sidebarExpanded={sidebarExpanded}
                />
              );
            })}
          </li>
          <li className="mt-16 flex w-full list-none flex-col gap-1">
            {newNavigationItems.slice(11, 12).map((item, itemIndex) => {
              return (
                <NavItem
                  icon={item.icon}
                  currentUrl={currentUrl}
                  setLinkChange={setLinkChange}
                  changeUrl={changeUrl}
                  key={itemIndex}
                  title={item.title}
                  link={item.link}
                  children={item.children}
                  handleSidebar={handleSidebar}
                  toggleSidebarExpand={toggleSidebarExpand}
                  sidebarExpanded={sidebarExpanded}
                />
              );
            })}
            <NavItem
              title="Logout"
              link="#"
              handleLogout={handleLogout}
              icon={() => (
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.99967 3.20837C10.3448 3.20837 10.6247 3.4882 10.6247 3.83337C10.6247 4.17855 10.3448 4.45837 9.99967 4.45837C6.66296 4.45837 3.95801 7.16332 3.95801 10.5C3.95801 13.8368 6.66296 16.5417 9.99967 16.5417C10.3448 16.5417 10.6247 16.8215 10.6247 17.1667C10.6247 17.5119 10.3448 17.7917 9.99967 17.7917C5.9726 17.7917 2.70801 14.5271 2.70801 10.5C2.70801 6.47297 5.9726 3.20837 9.99967 3.20837Z"
                    fill="#64728C"
                    stroke="#64728C"
                    strokeWidth="0.2"
                  />
                  <path
                    d="M13.7244 8.44194C13.4803 8.19786 13.4803 7.80213 13.7244 7.55806C13.9685 7.31398 14.3642 7.31398 14.6083 7.55806L17.1083 10.0581C17.3523 10.3022 17.3523 10.6978 17.1083 10.9419L14.6083 13.4419C14.3642 13.686 13.9685 13.686 13.7244 13.4419C13.4803 13.1978 13.4803 12.8022 13.7244 12.5581L15.1574 11.125H8.33301C7.98783 11.125 7.70801 10.8452 7.70801 10.5C7.70801 10.1548 7.98783 9.875 8.33301 9.875H15.1574L13.7244 8.44194Z"
                    fill="#64728C"
                    stroke="#64728C"
                    strokeWidth="0.2"
                  />
                </svg>
              )}
              toggleSidebarExpand={toggleSidebarExpand}
              sidebarExpanded={sidebarExpanded}
            />
          </li>
        </div>
      </div>
    </div>
  );
};

const NavItem = ({
  icon,
  title,
  link,
  children,
  currentUrl,
  setLinkChange,
  handleSidebar,
  handleLogout,
  sidebarExpanded,
}) => {
  const NavIcon = icon;

  const handleCLick = () => {
    setLinkChange((pre) => !pre);
    handleSidebar();
  };

  const handleClick = () => {
    if (handleLogout) {
      Swal.fire({
        title: "Are you sure?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Logout!",
        customClass: {
          title: "font-inter",
          content: "font-inter",
          actions: "font-inter",
          confirmButton: "font-inter",
          cancelButton: "font-inter",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          handleLogout();
        }
      });
    }
    handleCLick();
  };

  return (
    <div className={`flex w-full ${sidebarExpanded ? `pr-4` : `pr-3`}`}>
      {currentUrl === link ? (
        <div className="h-[45px] min-h-1 w-1 rounded-l-lg rounded-r-full bg-[#FF8828]"></div>
      ) : (
        <div className="h-[45px] min-h-1 w-1 rounded-l-lg rounded-r-full bg-white"></div>
      )}
      <Link to={`${link !== "#" ? "/" + link : "#"}`} className={`ml-1 w-full`}>
        <div className="flex flex-col items-end">
          <ListItem
            onClick={handleClick}
            className={`${
              currentUrl === link
                ? "bg-[#FF8828] font-bold text-white focus:bg-[#FF8828] focus:text-white active:bg-[#FF8828] active:text-white"
                : "font-bold text-[#64728C]"
            } h-[45px] justify-between p-0 font-poppins text-[14px] font-bold leading-[22px]`}
          >
            <div className="flex h-full items-center justify-center">
              <ListItemPrefix className="flex items-center justify-center pl-[23px]">
                {currentUrl === link ? (
                  <NavIcon color={"white"} width={"18px"} className="h-5" />
                ) : (
                  <NavIcon color={"#64728C"} width={"18px"} className="h-5" />
                )}
              </ListItemPrefix>
              <span
                className={`mr-2 flex-1 font-poppins font-semibold transition-transform duration-500 ease-in-out`}
                style={{
                  transform: sidebarExpanded
                    ? "translateX(0)"
                    : "translateX(-100%)",
                  opacity: sidebarExpanded ? 1 : 0,
                  transition:
                    "transform 0.5s ease-in-out, opacity 0.5s ease-in-out",
                }}
              >
                {title}
              </span>
            </div>
          </ListItem>
        </div>
      </Link>
    </div>
  );
};
