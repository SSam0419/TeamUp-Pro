"use client";
import { useAppStore } from "@/libs/ZustandStore";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import PitchCard from "./PitchCard";

const PitchList = () => {
  const { profileInfo } = useAppStore();

  const { data: pitchList, isLoading } = useQuery(
    ["retrieveProfessionalPitch"],
    async () => {
      if (profileInfo !== null) {
        const { data } = await axios.get(
          "/api/pitch?professional_id=" + profileInfo?.id
        );
        return data as Pitch[];
      }
    }
  );

  return (
    <div>
      {pitchList?.map((pitch: Pitch, idx: number) => {
        return <PitchCard key={idx} pitch={pitch} />;
      })}
    </div>
  );
};

export default PitchList;
