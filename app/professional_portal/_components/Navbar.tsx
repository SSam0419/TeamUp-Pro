"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProfessionalProfileCard from "./ProfessionalProfileCard";
import GlobalPopUp from "@/components/GlobalPopUp";
import ProfessionalAuthForm from "./ProfessionalAuthForm";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useAppStore } from "@/libs/ZustandStore";
import { useQuery } from "react-query";
import axios from "axios";
import { PiTargetLight } from "react-icons/pi";
import { RiDashboardFill } from "react-icons/ri";
import { BiMessageAlt } from "react-icons/bi";
import { FaQuestionCircle } from "react-icons/fa";

const Navbar = () => {
  const pathName = usePathname();

  const {
    session: sessionState,
    setUserProfile,
    setUserSession,
    setLoadingState,
  } = useAppStore();

  const [openProfessionalAuthForm, setOpenProfessionalAuthForm] =
    useState(false);
  const [session, setSession] = useState<Session | null>(null);

  const { data, isLoading, error, isSuccess } = useQuery(
    ["fetchUserProfile", session],
    async () => {
      const data = await axios.get(
        "/api/professional/profile?id=" + session?.user.id
      );
      return data;
    }
  );
  const supabase = createClientComponentClient();

  supabase.auth.onAuthStateChange((event, session) => {
    if (
      event == "INITIAL_SESSION" &&
      sessionState === null &&
      session !== null
    ) {
      setUserSession(session as Session);
    }
    if (event == "SIGNED_IN") {
      setUserSession(session as Session);
    }
    if (event == "SIGNED_OUT") {
    }
  });

  useEffect(() => {
    setLoadingState(isLoading);
  }, [isLoading, setLoadingState]);

  useEffect(() => {
    setSession(sessionState);
  }, [sessionState]);

  useEffect(() => {
    if (data?.data.data) {
      setUserProfile(data?.data.data);
    }
  }, [data, setUserProfile]);

  return (
    <div className="fixed top-0 left-0 w-full flex justify-between px-[50px] py-5 bg-white shadow">
      {openProfessionalAuthForm && (
        <GlobalPopUp onClose={() => setOpenProfessionalAuthForm(false)}>
          <ProfessionalAuthForm />
        </GlobalPopUp>
      )}
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

      {session !== null ? (
        <div className="flex gap-4">
          <ProfessionalProfileCard session={session} />
          <form action="/api/auth/signout" method="post">
            <button
              type="submit"
              className="bg-secondary text-white font-medium px-10 py-2 rounded-[45px] "
              onClick={() => {
                setUserProfile(null);
              }}
            >
              Sign out
            </button>
          </form>
        </div>
      ) : (
        <>
          <button
            className="bg-secondary text-white font-medium px-10 py-2 rounded-[45px] "
            onClick={() => setOpenProfessionalAuthForm(true)}
          >
            Sign In
          </button>
        </>
      )}
    </div>
  );
};

export default Navbar;
