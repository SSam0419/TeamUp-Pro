"use client";
import { useAppStore } from "@/libs/ZustandStore";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import PitchCard from "./PitchCard";
import UnauthorizedPage from "@/components/UnauthorizedPage";
import { Divider } from "@nextui-org/react";
import Spinner from "@/components/Spinner";
import { Tabs, Tab } from "@nextui-org/react";
import { Pitch } from "@/libs/models/Pitch";

const PitchList = () => {
  const { profileInfo } = useAppStore();

  const { data: pitchList, isLoading } = useQuery(
    ["retrieveProfessionalPitch", profileInfo],
    async () => {
      if (profileInfo !== null) {
        const { data } = await axios.get(
          "/api/pitch?professional_id=" + profileInfo?.id
        );
        return data as Pitch[];
      }
    }
  );

  if (profileInfo == null) {
    return <UnauthorizedPage />;
  }

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className="w-[1000px]">
          <Tabs>
            <Tab key="Pending" title="Pending">
              <div className="">
                {pitchList
                  ?.filter((p) => !p.is_accepted)
                  .map((pitch: Pitch, idx: number) => (
                    <PitchCard key={idx} pitch={pitch} />
                  ))}
                {!pitchList ||
                  (pitchList
                    ?.filter((p) => !p.is_accepted)
                    .map((pitch: Pitch, idx: number) => (
                      <PitchCard key={idx} pitch={pitch} />
                    )).length === 0 && <div>No Accepted Pitch Yet</div>)}
              </div>
            </Tab>
            <Tab key="Accepted" title="Accepted">
              <div className="">
                {pitchList
                  ?.filter((p) => p.is_accepted)
                  .map((pitch: Pitch, idx: number) => (
                    <PitchCard key={idx} pitch={pitch} />
                  ))}
                {!pitchList ||
                  (pitchList
                    ?.filter((p) => p.is_accepted)
                    .map((pitch: Pitch, idx: number) => (
                      <PitchCard key={idx} pitch={pitch} />
                    )).length === 0 && <div>No Accepted Pitch Yet</div>)}
              </div>
            </Tab>
          </Tabs>
        </div>
      )}
    </>
  );
};

export default PitchList;
