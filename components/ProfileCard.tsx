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
import { UserProfileClass } from "@/libs/models/UserProfileClass/UserProfileClass";

const ProfileCard = ({
  portalType,
}: {
  portalType: "main" | "user" | "professional";
}) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    session: sessionState,
    profileInfo,
    setUserProfile,
    setUserSession,
  } = useAppStore();

  const { isLoading, refetch } = useQuery(
    ["retrieveUserProfile", sessionState, portalType],
    async () => {
      if (sessionState == null) return { data: null };
      if (portalType === "main") return { data: null };
      let url = "/api/profile/user?id=";

      const { data } = await axios.get(url + sessionState?.user.id);

      return data;
    },

    {
      onSuccess: ({ data }) => {
        const userProfile = new UserProfileClass(data);
        setUserProfile(userProfile);
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
    <div className="flex gap-4" key={portalType}>
      {!(portalType === "main") && sessionState !== null && (
        <Link
          href={
            portalType === "user"
              ? "/user_portal/profile"
              : portalType === "professional"
              ? "/professional_portal/profile"
              : ""
          }
          className="flex items-center space-x-2"
        >
          <span className="text-gray-800 relative">
            {profileInfo == null ? (
              <div className="flex gap-2 items-center">
                <RxAvatar size={30} />
                <p className="hidden md:block">Create Profile</p>
              </div>
            ) : profileInfo.avatarLink == null ? (
              <Avatar
                name={`${profileInfo.firstname} ${profileInfo.lastname}`}
              />
            ) : (
              <Avatar src={profileInfo.avatarLink} />
            )}
          </span>
        </Link>
      )}

      {sessionState !== null && (
        <button
          type="submit"
          className="bg-secondary text-white font-medium px-10 py-2 rounded-[45px] "
          onClick={() => {
            toast.success("You are now signing out .. ");
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
              <AuthForm portalType={portalType} />
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ProfileCard;
