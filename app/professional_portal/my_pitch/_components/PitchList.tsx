"use client";
import { useAppStore } from "@/libs/ZustandStore";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import PitchCard from "./PitchCard";

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
    return (
      <div className="bg-white p-3 rounded-xl shadow-lg text-gray-800 h-[200px] w-[450px] flex items-center justify-center text-lg">
        Please Sign In before viewing your pitches
      </div>
    );
  }

  return (
    <div>
      {pitchList?.map((pitch: Pitch, idx: number) => {
        return <PitchCard key={idx} pitch={pitch} />;
      })}
    </div>
  );
};

export default PitchList;
