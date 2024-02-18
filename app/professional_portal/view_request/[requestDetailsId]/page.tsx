"use client";

import Spinner from "@/components/Spinner";
import axios, { AxiosError } from "axios";
import React from "react";
import { useQuery } from "react-query";
import UnlockedRequestView from "./_components/UnlockedRequestView";
import PitchForm from "./_components/PitchForm";
import { useAppStore } from "@/libs/ZustandStore";

const Page = ({ params }: { params: { requestDetailsId: string } }) => {
  const { profileInfo, session } = useAppStore();

  const {
    data: requestDetailsData,
    isLoading,
    error,
  } = useQuery(["retrieveUnlockedRequest", profileInfo, params], async () => {
    if (profileInfo?.id === null || profileInfo?.id === undefined) return null;
    const data = await axios.get(
      `/api/request/professional/unlock_request?request_id=${params.requestDetailsId}&professional_id=${profileInfo.id}`
    );

    return data.data.data as RequestDetails;
  });

  if (session === null) {
    return (
      <div className="text-center w-[880px] h-[300px] bg-white p-4 rounded-lg flex justify-center items-center italic">
        Please Sign In Before Viewing Unlocked Request Details
      </div>
    );
  }
  if (profileInfo === null) {
    return (
      <div className="text-center w-[880px] h-[300px] bg-white p-4 rounded-lg flex justify-center items-center italic">
        <p>
          <b> Complete Your Professional Profile </b> Before Viewing Unlocked
          Request Details
        </p>
      </div>
    );
  }

  if (error instanceof AxiosError) {
    return (
      <>
        <h1>{error.response?.statusText}</h1>
      </>
    );
  }

  return (
    <div className="md:w-[880px] bg-white p-4 rounded-lg flex gap-3 flex-col justify-between items-start">
      {isLoading && (
        <div className="flex w-full h-[300px] justify-center items-center">
          <Spinner />
        </div>
      )}

      {!isLoading && requestDetailsData && (
        <>
          <div className="w-full min-h-[300px]">
            <UnlockedRequestView requestDetails={requestDetailsData} />
          </div>

          <div className="my-6 w-full gap-3 grid grid-cols-5 items-center">
            <div className="border-gray-400 border col-span-2"></div>
            <p className="text-center text-base italic font-thin">
              {requestDetailsData.pitch !== null
                ? "Edit Pitch"
                : "Create Pitch"}
            </p>
            <div className="border-gray-400 border col-span-2"></div>
          </div>

          <div className="w-full">
            <PitchForm params={params} requestDetails={requestDetailsData} />
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
