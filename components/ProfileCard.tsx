"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAppStore } from "@/libs/ZustandStore";
import axios, { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";
import GlobalPopUp from "@/components/GlobalPopUp";

import { RxAvatar } from "react-icons/rx";
import { toast } from "react-hot-toast";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/AuthForm";

const ProfileCard = ({ isUserCard }: { isUserCard: boolean }) => {
  const router = useRouter();

  const {
    session: sessionState,
    profileInfo,
    setUserProfile,
    setUserSession,
  } = useAppStore();

  const [openAuthForm, setOpenAuthForm] = useState(false);

  const { isLoading } = useQuery(
    ["retrieveUserProfile", sessionState],
    async () => {
      if (sessionState == null) return { data: null };

      let url = isUserCard
        ? "/api/profile/user?id="
        : "/api/profile/professional?id=";
      const { data } = await axios.get(url + sessionState?.user.id);

      return data;
    },
    {
      onSuccess: ({ data }) => {
        if (data) setUserProfile(data);
      },
    }
  );

  const supabase = createClientComponentClient();
  const { mutate, isLoading: isSigningOut } = useMutation(
    ["signOut"],
    async () => {
      const data = await supabase.auth.signOut();

      return data;
    },
    {
      onSuccess: () => {
        setUserProfile(null);
        setUserSession(null);
      },
    }
  );

  supabase.auth.onAuthStateChange((event, session) => {
    if (
      event == "INITIAL_SESSION" &&
      sessionState === null &&
      session !== null
    ) {
      setUserSession(session as Session);
    } else if (event == "SIGNED_IN") {
      setOpenAuthForm(false);
      setUserSession(session as Session);
    } else if (event == "SIGNED_OUT") {
      setUserProfile(null);
      setUserSession(null);
    }
  });

  if (isLoading || isSigningOut) {
    return <Spinner size={35} />;
  }

  return (
    <div className="flex gap-4">
      {sessionState !== null && (
        <Link
          href={
            isUserCard ? "/user_portal/profile" : "/professional_portal/profile"
          }
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
            {profileInfo == null
              ? "Create Profile Now"
              : `${profileInfo.firstname} ${profileInfo.lastname}`}
          </span>
        </Link>
      )}
      {sessionState !== null && (
        <button
          type="submit"
          className="bg-secondary text-white font-medium px-10 py-2 rounded-[45px] "
          onClick={() => {
            toast("You are now signing out .. ");
            mutate();
            router.push("/");
            setUserProfile(null);
            setUserSession(null);
          }}
        >
          Sign out
        </button>
      )}
      {sessionState === null && (
        <button
          className="bg-secondary text-white font-medium px-10 py-2 rounded-[45px] "
          onClick={() => setOpenAuthForm(true)}
        >
          Sign In
        </button>
      )}
      {openAuthForm && (
        <GlobalPopUp onClose={() => setOpenAuthForm(false)}>
          <AuthForm isUserPortal={isUserCard} />
        </GlobalPopUp>
      )}
    </div>
  );
};

export default ProfileCard;
