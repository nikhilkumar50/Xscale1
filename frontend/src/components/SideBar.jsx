import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsArrowLeftCircle } from "react-icons/bs";
import { FcMultipleInputs } from "react-icons/fc";
import { TbReportSearch } from "react-icons/tb";
import Logo from "../assets/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";

const SideBar = () => {
  const [open, setOpen] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation();
  

  const Menus = [
    { title: "Input Cost", path: "/inputcost", src: <FcMultipleInputs /> },
    { title: "Simulation", path: "/simulation", src: <TbReportSearch /> },
    
  ];

  return (
    <>
      <div
        className={`${
          open ? "w-60" : "w-fit"
        } hidden min-h-screen sm:inline-block relative duration-300 bg-blue-400 border-r border-gray-200 dark:border-gray-600 p-4 dark:bg-slate-800`}
      >
        <BsArrowLeftCircle
          className={`${
            !open && "rotate-180"
          } absolute text-3xl bg-white fill-slate-800  rounded-full cursor-pointer top-9 -right-4 dark:fill-gray-400 dark:bg-gray-800`}
          onClick={() => setOpen(!open)}
        />
        <Link to="/">
          <div className={`flex ${open && "gap-x-4"} items-center `}>
            <img src={Logo} alt="" className="pl-2 w-12" />
            {open && (
              <span className="max-w-16 text-xl font-semibold whitespace-nowrap dark:text-white">
                Xscale  Global
              </span>
            )}
          </div>
        </Link>

        <ul className="pt-6">
          {Menus.map((menu, index) => (
            <Link to={menu.path} key={index}>
              <li
                className={`flex items-center gap-x-6 p-3 text-base font-normal rounded-lg cursor-pointer dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700
                        ${menu.gap ? "mt-9" : "mt-2"} ${
                  location.pathname === menu.path &&
                  "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                <span className="text-2xl">{menu.src}</span>
                <span
                  className={`${
                    !open && "hidden"
                  } origin-left duration-300 hover:block`}
                >
                  {menu.title}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      {/* Mobile Menu */}
      <div className="pt-3">
        <GiHamburgerMenu onClick={() => setMobileMenu(!mobileMenu)} className={`${mobileMenu && 'open'} block hamburger sm:hidden focus:outline-none`} />
      </div>
      <div className="sm:hidden">
        <div
          className={`${
            mobileMenu ? "flex" : "hidden"
          } absolute z-50 flex-col items-center self-end py-8 mt-16 space-y-6 font-bold sm:w-auto left-6 right-6 dark:text-white  bg-gray-50 dark:bg-slate-800 drop-shadow md rounded-xl`}
        >
          {Menus.map((menu, index) => (
            <Link
              to={menu.path}
              key={index}
              onClick={() => setMobileMenu(false)}
            >
              <span
                className={` ${
                  location.pathname === menu.path &&
                  "bg-gray-200 dark:bg-gray-700"
                } p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700`}
              >
                {menu.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default SideBar;
