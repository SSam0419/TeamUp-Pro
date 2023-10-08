"use client";
import Spinner from "@/components/Spinner";
import UnauthorizedPage from "@/components/UnauthorizedPage";
import { useAppStore } from "@/libs/ZustandStore";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import SearchBar from "./SearchBar";
import { useSearchParams } from "next/navigation";
import SendRequestButton from "./SendRequestButton";
import ProfileCard from "./ProfileCard";
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";

const ProfileList = () => {
  const { profileInfo } = useAppStore();
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
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

      const { data } = await axios.get("/api/profile/professional?" + query);

      return data;
    },
    {
      onSuccess: ({ data }) => {
        setProfiles(data);
        setShowContact(Array(data.length).fill(false));
        setCheck(Array(data.length).fill(false));
      },
    }
  );

  if (profileInfo == null) return <UnauthorizedPage />;

  return (
    <div className="flex flex-col gap-10 items-center justify-center">
      <SearchBar isLoading={false} />

      <div className="flex flex-wrap gap-7 items-center justify-center">
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
      <div className="sticky w-full bottom-0 md:bottom-10 md:w-[550px]">
        <SendRequestButton
          professionalIds={profiles
            .filter((profile, index) => check[index])
            .map((profile) => profile.id)}
        />
      </div>
    </div>
  );
};

export default ProfileList;
