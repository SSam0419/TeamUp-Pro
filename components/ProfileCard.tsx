"use client";

import Link from "next/link";
import React from "react";
import { Session } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAppStore } from "@/libs/ZustandStore";
import axios from "axios";
import { useMutation, useQuery } from "react-query";

import { RxAvatar } from "react-icons/rx";
import { toast } from "react-hot-toast";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { Avatar, Modal, ModalContent, useDisclosure } from "@nextui-org/react";

const ProfileCard = ({ isUserCard }: { isUserCard: boolean }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    session: sessionState,
    profileInfo,
    setUserProfile,
    setUserSession,
  } = useAppStore();

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
      // cacheTime: 1000 * 60 * 7,
      // staleTime: 1000 * 60 * 3,
      onSuccess: ({ data }) => {
        console.log("fetched");
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
      onClose();
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
          <span className="text-gray-800 relative">
            {profileInfo == null ? (
              <div className="flex gap-2 items-center">
                <RxAvatar size={30} />
                <p className="hidden md:block">Create Profile</p>
              </div>
            ) : profileInfo.avatar_link == null ? (
              <Avatar
                name={`${profileInfo.firstname} ${profileInfo.lastname}`}
              />
            ) : (
              // <Image
              //   loader={({ src }) => src}
              //   src={
              //     "https://dcfwqwmdkmegdflynbqw.supabase.co/storage/v1/object/public/avatar/public/91d182fe-1fff-45fd-8a1a-05d39c47f106.jpeg"
              //   }
              //   alt="Avatar"
              //   width={100}
              //   height={50}
              // />
              <Avatar src={profileInfo.avatar_link} />
            )}
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
          onClick={() => onOpen()}
        >
          Sign In
        </button>
      )}
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalContent className="h-[670px] flex items-center justify-center">
          {(onClose) => (
            <div>
              <AuthForm isUserPortal={isUserCard} />
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ProfileCard;
