"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import UserProfileCard from "./UserProfileCard";
import GlobalPopUp from "@/components/GlobalPopUp";
// import AuthForm from "./AuthForm";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useAppStore } from "@/libs/ZustandStore";
import { useQuery } from "react-query";
import axios from "axios";
import AuthForm from "@/components/AuthForm";

const Navbar = () => {
  const pathName = usePathname();

  const { session: sessionState, setUserProfile } = useAppStore();

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
          href={"/"}
          className={`${
            pathName === "/FAQ" ? "text-primary" : "text-black"
          } shadow-md px-10 py-2 rounded-[45px]`}
        >
          FAQ
        </Link>
      </div>

      <UserProfileCard />
    </div>
  );
};

export default Navbar;
