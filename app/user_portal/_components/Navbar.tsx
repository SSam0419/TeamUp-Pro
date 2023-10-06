"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useAppStore } from "@/libs/ZustandStore";
import ProfileCard from "../../../components/ProfileCard";

const Navbar = () => {
  const pathName = usePathname();

  return (
    <div className="fixed top-0 left-0 w-full flex justify-between px-[50px] py-5 bg-white shadow z-50">
      <div className="flex gap-3">
        <Link
          href={"/user_portal"}
          className={`${
            pathName === "/user_portal" ? "text-primary" : ""
          }  px-10 py-2 rounded-[45px] shadow-md `}
        >
          Dashboard
        </Link>
        <Link
          href={"/user_portal/find_talents"}
          className={`${
            pathName === "/user_portal/find_talents" ? "text-primary" : ""
          }  px-10 py-2 rounded-[45px] shadow-md `}
        >
          Talents
        </Link>
        <Link
          href={"/"}
          className={`${
            pathName === "/FAQ" ? "text-primary" : "text-black"
          } shadow-md px-10 py-2 rounded-[45px]`}
        >
          FAQ
        </Link>
      </div>

      <ProfileCard isUserCard={true} />
    </div>
  );
};

export default Navbar;
