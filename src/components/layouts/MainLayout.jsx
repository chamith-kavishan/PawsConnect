import React, { useState, useEffect, useRef } from "react";
import { Link, Outlet, Navigate, useLocation } from "react-router-dom";
import {
  Burger,
  SearchIcon,
  BellIcon,
  HelpCircleIcon,
  ArrowBack,
} from "../../utils/icons";
import { SideBar } from "./SideBar";
import { Tooltip } from "@material-tailwind/react";
import { UserIcon } from "@heroicons/react/24/solid";
import { useStateContext } from "../../contexts/NavigationContext";
import { subPathLinks } from "../../utils/dataArrays";

export const MainLayout = ({ selectedItem }) => {
  const [signOutVisible, setSignOutVisible] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const dropdownRef = useRef(null);
  const sideBardownRef = useRef(null);
  const sideBarButtondownRef = useRef(null);
  const { token, setUser, setToken, showSalesman } = useStateContext();

  const handleLogout = () => {
    setUser(null);
    setToken(null);
  };

  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const toggleSidebarExpand = () => {
    setSidebarExpanded((cur) => !cur);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSignOutVisible(false);
      }
      if (
        sideBardownRef.current &&
        !sideBardownRef.current.contains(event.target)
      ) {
        if (
          sideBarButtondownRef.current &&
          sideBarButtondownRef.current.contains(event.target)
        ) {
          setSidebar(true);
        } else {
          setSidebar(false);
        }
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const location = useLocation();
  const { user } = useStateContext();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const userString = queryParams.get("user");
    const token = queryParams.get("token");
    if (userString) {
      const user = JSON.parse(userString);
      setUser(user);
      setToken(token);
    }
  }, [location.search]);

  if (!token) {
    return <Navigate to="/organization/login" />;
  }

  const handleSidebar = () => {
    setSidebar((pre) => !pre);
  };

  let mainPath = "";
  let subPaths = [];
  const pathParts = location.pathname.split("/");
  const id = pathParts[3];

  switch (location.pathname) {
    case "/":
      mainPath = "Dashboard";
      subPaths = [];
      break;
    case "/customers":
    case "/customer-credit-logs":
    case "/customer-returns":
      mainPath = "Customers";
      subPaths = [
        "Manage Customers",
        "Customer Credit Log",
        "Customer Returns",
      ];
      break;
    case "/customer/add":
      mainPath = "Customers / Manage Customer";
      subPaths = ["Back", "New Customer"];
      break;
    case "/organization/reports":
      mainPath = "Reports";
      subPaths = [];
      break;
    case "/organization/pets":
      mainPath = "Pets";
      subPaths = [];
      break;
    case `/organization/pet/add`:
      mainPath = "Pets / Manage Pets";
      subPaths = ["Back", "Add Pet"];
      break;
    case `/organization/pet/edit/${id}`:
      mainPath = "Pets / Manage Pets";
      subPaths = ["Back", "Edit Pet"];
      break;
    default:
      break;
  }

  return (
    <section className="flex min-h-screen w-full bg-[#f0eff5]">
      <div ref={sideBardownRef} className="">
        <SideBar
          handleSidebar={handleSidebar}
          sidebar={sidebar}
          handleLogout={handleLogout}
          sidebarExpanded={sidebarExpanded}
          toggleSidebarExpand={toggleSidebarExpand}
          showSalesman={showSalesman}
        />
      </div>

      <section
        className={`flex w-full flex-col transition-all duration-300 ease-in-out ${
          sidebarExpanded
            ? "md:ml-[15%] md:w-[85%]"
            : "md:w-w-full md:ml-[80px]"
        }`}
        style={{
          transition: "margin-left 0.5s ease-in-out",
        }}
      >
        <div className="relative flex w-full flex-row items-center justify-between rounded-none bg-[#02aee0] py-3 pl-[3%] pr-[3%] md:pl-[2%] md:pr-[2%] md:before:absolute md:before:left-[-35px] md:before:top-0 md:before:h-[35px] md:before:w-[35px] md:before:bg-[#02aee0] md:before:content-['']">
          <div>
            <div ref={sideBarButtondownRef} className="flex md:hidden">
              <Tooltip content="Sidebar">
                <div onClick={handleSidebar}>
                  <Burger className="h-4 w-4 text-white" />
                </div>
              </Tooltip>
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="block md:hidden"></div>
            <div className="hidden font-poppins text-[24px] font-medium leading-9 text-white md:block">
              {mainPath}
            </div>
            <div className="flex items-center justify-between">
              {/* <div className="relative hidden w-[250px] md:block">
                <i className="absolute left-3 top-1/2 -translate-y-1/2 transform text-white">
                  <SearchIcon />
                </i>
                <input
                  type="text"
                  className="w-full rounded-[15px] bg-[#ffcfa9] py-2 pl-10 pr-3 placeholder:font-poppins placeholder:text-[12px] placeholder:font-semibold placeholder:leading-[18px] placeholder:text-white focus:border-transparent focus:outline-none"
                  placeholder="Search here..."
                />
              </div> */}

              {/* <Tooltip content="View Notifications">
                <div className="ml-8 rounded-[20px] bg-[#f59d56] px-3 py-3 md:px-4 md:py-3">
                  <Link to="/notifications">
                    <BellIcon className="h-4 w-4 text-white" />
                  </Link>
                </div>
              </Tooltip> */}
              <div className="relative" ref={dropdownRef}>
                <Link to="/account" className="ml-2 flex items-center gap-2">
                  <div className="ml-2 w-fit rounded-full bg-gray-500">
                    <UserIcon className="h-12 w-12 text-white md:h-12 md:w-12" />
                  </div>
                  <div className="hidden md:block">
                    <span className="font-poppins text-[14px] font-semibold leading-[16px] text-white"></span>
                    <br />
                  </div>
                </Link>

                {signOutVisible && (
                  <div className="border-grey-800 absolute right-5 top-12 z-10 flex w-[150px] flex-col items-start border-[1px] bg-white p-3 shadow-md">
                    <Link
                      to="/account"
                      className="w-full"
                      onClick={() => setSignOutVisible(!signOutVisible)}
                    >
                      <div className="font-inter w-full cursor-pointer border-b-2 py-2">
                        My Account
                      </div>
                    </Link>
                    <div className="w-full" onClick={handleLogout}>
                      <div className="font-inter cursor-pointer py-2">
                        Sign Out
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between bg-white px-[3%] py-2 md:px-[2%]">
          <div className="flex items-center justify-between gap-2 md:gap-5">
            {subPaths.map((path, index) =>
              path === "Back" ? (
                <div key={index} className="border-r border-[#DDDDDD] pr-5">
                  <a href="#" onClick={() => window.history.back()}>
                    <button className="rounded-[15px] bg-[#F6FBFF] px-1 py-1.5 text-center font-poppins text-[12px] font-normal leading-[21px] text-[#64728C] transition-all duration-300 md:px-3 md:text-[14px]">
                      <ArrowBack className="mr-1 h-4 w-4" />
                    </button>
                  </a>
                </div>
              ) : (
                <Link key={index} to={subPathLinks[path]}>
                  <button
                    className={`rounded-[15px] bg-[#F6FBFF] px-1 py-1.5 text-center font-poppins text-[12px] font-normal leading-[21px] text-[#64728C] transition-all duration-300 md:px-3 md:text-[14px] ${
                      location.pathname.includes(subPathLinks[path])
                        ? "bg-[#FFF2E9] text-[#F35E17]"
                        : ""
                    }`}
                  >
                    {path}
                  </button>
                </Link>
              ),
            )}
          </div>
          <div className="hidden border-l border-[#DDDDDD] md:flex">
            <div className="ml-4 w-fit rounded-[20px] bg-[#f5f5f5] px-2 py-2 md:ml-8 md:px-4 md:py-3">
              <Link to="#">
                <HelpCircleIcon className="h-4 w-4 text-white" />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 px-[3%] md:px-[2%]">
          <Outlet />
        </div>
      </section>
    </section>
  );
};
