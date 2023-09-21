"use client";
import Spinner from "@/components/Spinner";
import { useAppStore } from "@/libs/ZustandStore";
import axios from "axios";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import RequestDetailsContainer from "./_components/RequestDetailsContainer";

const Page = ({ params }: { params: { requestDetailsId: string } }) => {
  const {
    session,
    setFetchedSingleRequestDetails,
    fetchedSingleRequestDetails,
  } = useAppStore();

  const { data, isLoading } = useQuery(
    ["fetchSingleRequestDetails", session, params.requestDetailsId],
    async () => {
      const requestDetails = await axios.get(
        `/api/request/user_request?user_id=${session?.user.id}&request_id=${params.requestDetailsId}`
      );

      return requestDetails;
    }
  );

  useEffect(() => {
    if (data) setFetchedSingleRequestDetails(data.data.data);
  }, [setFetchedSingleRequestDetails, data]);

  return (
    <div>
      {isLoading && <Spinner />}
      {!isLoading && fetchedSingleRequestDetails && (
        <div className="bg-white  rounded p-5 w-[1000px]">
          <RequestDetailsContainer />
        </div>
      )}
    </div>
  );
};

export default Page;
