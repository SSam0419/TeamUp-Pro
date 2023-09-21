"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAppStore } from "@/libs/ZustandStore";
import axios from "axios";
import { useQuery } from "react-query";
import { MoonLoader } from "react-spinners";
import GlobalPopUp from "@/components/GlobalPopUp";
import ProfessionalAuthForm from "./ProfessionalAuthForm";
import { RxAvatar } from "react-icons/rx";

const ProfessionalProfileCard = () => {
  const {
    session: sessionState,
    setUserProfile,
    setUserSession,
  } = useAppStore();

  const [openProfessionalAuthForm, setOpenProfessionalAuthForm] =
    useState(false);

  const { data, isLoading, error, isSuccess } = useQuery(
    ["fetchUserProfile", sessionState],
    async () => {
      const data = await axios.get(
        "/api/profile/professional?id=" + sessionState?.user.id
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
      setOpenProfessionalAuthForm(false);
      setUserSession(session as Session);
    }
    if (event == "SIGNED_OUT") {
      setUserProfile(null);
    }
  });

  useEffect(() => {
    if (data?.data.data) {
      setUserProfile(data?.data.data);
    }
  }, [data, setUserProfile]);

  if (isLoading) {
    return <MoonLoader size={35} />;
  }

  return (
    <div className="flex gap-4">
      <Link
        href={"/professional_portal/profile"}
        className="flex items-center space-x-2"
      >
        {sessionState?.user?.user_metadata.avatar_url !== null &&
        sessionState?.user?.user_metadata.avatar_url !== undefined ? (
          <Image
            className="w-10 h-10 rounded-full border flex justify-center items-center"
            loader={({ src }) => src}
            src={sessionState.user.user_metadata.avatar_url}
            alt={""}
            width={40}
            height={40}
          />
        ) : (
          <div>
            <RxAvatar size={30} />
          </div>
        )}
        <span className="text-gray-800">
          {sessionState?.user?.user_metadata?.user_name ||
            sessionState?.user?.id}
        </span>
      </Link>
      {sessionState !== null && (
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
      )}
      {sessionState === null && (
        <button
          className="bg-secondary text-white font-medium px-10 py-2 rounded-[45px] "
          onClick={() => setOpenProfessionalAuthForm(true)}
        >
          Sign In
        </button>
      )}
      {openProfessionalAuthForm && (
        <GlobalPopUp onClose={() => setOpenProfessionalAuthForm(false)}>
          <ProfessionalAuthForm />
        </GlobalPopUp>
      )}
    </div>
  );
};

export default ProfessionalProfileCard;
