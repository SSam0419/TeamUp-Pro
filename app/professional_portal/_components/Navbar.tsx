"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { PiTargetLight } from "react-icons/pi";
import { RiDashboardFill } from "react-icons/ri";
import { BiMessageAlt } from "react-icons/bi";
import { FaQuestionCircle } from "react-icons/fa";
import ProfessionalProfileCard from "./ProfessionalProfileCard";

const Navbar = () => {
  const pathName = usePathname();

  return (
    <div className="fixed top-0 left-0 w-full flex justify-between px-[50px] py-5 bg-white shadow">
      <div className="flex gap-3">
        <Link
          href={"/professional_portal"}
          className={`${
            pathName === "/professional_portal" ? "text-primary" : ""
          }  px-10 py-2 rounded-[45px] shadow-md flex justify-center items-center gap-3`}
        >
          <RiDashboardFill size={"20px"} />
          Dashboard
        </Link>
        <Link
          href={"/professional_portal"}
          className={`${
            pathName === "/professional_portal" ? "text-primary" : ""
          }  px-10 py-2 rounded-[45px] shadow-md flex justify-center items-center gap-3`}
        >
          <PiTargetLight size={"20px"} />
          My Pitches
        </Link>
        <Link
          href={"/professional_portal"}
          className={`${
            pathName === "/professional_portal" ? "text-primary" : ""
          }  px-10 py-2 rounded-[45px] shadow-md flex justify-center items-center gap-3`}
        >
          <BiMessageAlt size={"20px"} />
          Messages
        </Link>
        <Link
          href={"/"}
          className={`${
            pathName === "/FAQ" ? "text-primary" : "text-black"
          } shadow-md px-10 py-2 rounded-[45px] flex justify-center items-center gap-3`}
        >
          <FaQuestionCircle size={"20px"} />
          FAQ
        </Link>
      </div>
      <ProfessionalProfileCard />
    </div>
  );
};

export default Navbar;
