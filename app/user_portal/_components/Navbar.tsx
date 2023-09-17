"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import UserProfileCard from "./UserProfileCard";
import GlobalPopUp from "@/components/GlobalPopUp";
import AuthForm from "./AuthForm";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useAppStore } from "@/libs/ZustandStore";
import { useQuery } from "react-query";
import axios from "axios";

const Navbar = () => {
  const pathName = usePathname();

  const {
    session: sessionState,
    setUserProfile,
    setUserSession,
    setLoadingState,
  } = useAppStore();

  const [openAuthForm, setOpenAuthForm] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  const { data, isLoading } = useQuery(
    ["fetchUserProfile", sessionState, session],
    async () => {
      const data = await axios.get("/api/user?id=" + sessionState?.user.id);
      return data;
    }
  );

  const supabase = createClientComponentClient();

  supabase.auth.onAuthStateChange((event, session) => {
    if (session !== null) {
      console.log("if (session!==null)");
      console.log(event);
      console.log(session);
    }
    if (
      event == "INITIAL_SESSION" &&
      sessionState === null &&
      session !== null
    ) {
      setUserSession(session as Session);
      setOpenAuthForm(false);
    }

    if (event == "SIGNED_IN" && session !== null) {
      setUserSession(session as Session);
      setOpenAuthForm(false);
    }
    if (event == "SIGNED_OUT") {
      setOpenAuthForm(false);
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
      setUserProfile(data?.data.data[0]);
    }
  }, [data, setUserProfile]);

  return (
    <div className="fixed top-0 left-0 w-full flex justify-between px-[50px] py-5 bg-white shadow">
      {openAuthForm && (
        <GlobalPopUp onClose={() => setOpenAuthForm(false)}>
          <AuthForm />
        </GlobalPopUp>
      )}
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

      {session !== null ? (
        <div className="flex gap-4">
          <UserProfileCard session={session} />
          <form action="api/auth/signout" method="post">
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
            onClick={() => setOpenAuthForm(true)}
          >
            Sign In
          </button>
        </>
      )}
    </div>
  );
};

export default Navbar;
