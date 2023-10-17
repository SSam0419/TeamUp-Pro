"use client";
import { useAppStore } from "@/libs/ZustandStore";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import PitchCard from "./PitchCard";
import UnauthorizedPage from "@/components/UnauthorizedPage";
import { Divider } from "@nextui-org/react";
import Spinner from "@/components/Spinner";

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
        <div className="">
          <p className="text-heading">Accepted</p>

          {pitchList
            ?.filter((p) => p.is_accepted)
            .map((pitch: Pitch, idx: number) => (
              <PitchCard key={idx} pitch={pitch} />
            ))}

          <Divider className="my-20" />

          <p className="text-heading">Ongoing</p>
          {pitchList
            ?.filter((p) => !p.is_accepted)
            .map((pitch: Pitch, idx: number) => (
              <PitchCard key={idx} pitch={pitch} />
            ))}
        </div>
      )}
    </>
  );
};

export default PitchList;
