"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { PiTargetLight } from "react-icons/pi";
import { RiDashboardFill } from "react-icons/ri";
import { BiMessageAlt } from "react-icons/bi";
import { FaQuestionCircle } from "react-icons/fa";
import ProfileCard from "@/components/ProfileCard";
import { AiFillMail } from "react-icons/ai";

const Navbar = () => {
  const pathName = usePathname();

  return (
    <div className="fixed top-0 left-0 w-full flex justify-between px-[50px] py-5 bg-white shadow">
      <div className="flex gap-3">
        <Link
          href={"/professional_portal"}
          className={`${
            pathName === "/professional_portal" ? "text-primary" : ""
          }  px-10 py-2 rounded-[45px] shadow border flex justify-center items-center gap-3`}
        >
          <RiDashboardFill size={"20px"} />
          <div className="hidden md:block">Dashbaord</div>
        </Link>
        <Link
          href={"/professional_portal/my_pitch"}
          className={`${
            pathName === "/professional_portal/my_pitch" ? "text-primary" : ""
          }  px-10 py-2 rounded-[45px] shadow border flex justify-center items-center gap-3`}
        >
          <PiTargetLight size={"20px"} />
          <div className="hidden md:block">My Pitches</div>
        </Link>
        <Link
          href={"/professional_portal/mailbox"}
          className={`${
            pathName === "/professional_portal/mailbox" ? "text-primary" : ""
          }  px-10 py-2 rounded-[45px] shadow border flex justify-center items-center gap-3 relative`}
        >
          <span className="flex h-3 w-3 absolute top-0 left-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
          <AiFillMail size={"20px"} />
          <div className="hidden md:block">Mailbox</div>
        </Link>
        {/* <Link
          href={"/professional_portal"}
          className={`${
            pathName === "/professional_portal" ? "text-primary" : ""
          }  px-10 py-2 rounded-[45px] shadow-md flex justify-center items-center gap-3`}
        >
          <BiMessageAlt size={"20px"} />
          Messages
        </Link> */}
        <Link
          href={"/"}
          className={`${
            pathName === "/FAQ" ? "text-primary" : "text-black"
          } shadow px-10 py-2 rounded-[45px] flex justify-center items-center gap-3 border`}
        >
          <FaQuestionCircle size={"20px"} />
          <div className="hidden md:block">FAQ</div>
        </Link>
      </div>
      <ProfileCard isUserCard={false} />
    </div>
  );
};

export default Navbar;
