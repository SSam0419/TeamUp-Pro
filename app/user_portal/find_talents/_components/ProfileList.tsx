"use client";
import Spinner from "@/components/Spinner";
import UnauthorizedPage from "@/components/UnauthorizedPage";
import { useAppStore } from "@/libs/ZustandStore";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import ToolBarSection from "./ToolBarSection";
import { useSearchParams } from "next/navigation";
import ProfileCard from "./ProfileCard";
import { UserProfileClass } from "@/libs/models/UserProfileClass/UserProfileClass";

const ProfileList = () => {
  const { profileInfo } = useAppStore();
  const [profiles, setProfiles] = useState<UserProfileClass[]>([]);
  const [showContact, setShowContact] = useState<boolean[]>([]);
  const [check, setCheck] = useState<boolean[]>([]);
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    setQuery(current.toString());
  }, [searchParams]);

  const { data, isLoading } = useQuery(
    ["retrieveAllProfessionalProfiles", profileInfo, query],
    async () => {
      if (profileInfo == null) return { data: [] };

      const { data } = await axios.get(
        query ? `/api/profile/user?${query}` : "/api/profile/user"
      );

      return data;
    },
    {
      onSuccess: ({ data }) => {
        const _data = data.map(
          (userProfile: any) => new UserProfileClass(userProfile)
        );
        setProfiles(_data);
        setShowContact(Array(data.length).fill(false));
        setCheck(Array(data.length).fill(false));
      },
    }
  );

  if (profileInfo == null) return <UnauthorizedPage />;

  return (
    <div className="flex flex-col gap-10 items-center justify-center">
      {/* <ToolBarSection
        isLoading={false}
        professionalIds={profiles
          .filter((profile, index) => check[index])
          .map((profile) => profile.id)}
      /> */}

      <div className="grid md:grid-cols-4 gap-5 items-center justify-center p-5 ">
        {isLoading && <Spinner />}
        {!isLoading &&
          profiles.map((profile, idx) => {
            return (
              <ProfileCard
                key={idx}
                check={check}
                idx={idx}
                profile={profile}
                query={query}
                searchParams={searchParams}
                setCheckFunction={() => {
                  setCheck((prev) => {
                    const newState = [...prev];
                    newState[idx] = !newState[idx];
                    return newState;
                  });
                }}
                setShowContactFunction={() => {
                  setShowContact((prev) => {
                    const newState = [...prev];
                    newState[idx] = true;
                    return newState;
                  });
                }}
                showContact={showContact}
              />
            );
          })}
      </div>
      <div className="fixed w-full right-10 bottom-0 md:bottom-10 md:w-[550px]"></div>
    </div>
  );
};

export default ProfileList;
