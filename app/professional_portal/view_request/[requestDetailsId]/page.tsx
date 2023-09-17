"use client";

import Spinner from "@/components/Spinner";
import axios, { AxiosError, AxiosResponse } from "axios";
import React from "react";
import { useQuery } from "react-query";

const Page = ({ params }: { params: { requestDetailsId: string } }) => {
  const { data, isLoading, error } = useQuery(
    ["fetchUnlockedRequest"],
    async () => {
      const data = await axios.get(
        "/api/request/professional/unlock_request?id=" + params.requestDetailsId
      );

      return data;
    }
  );

  if (isLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  if (error) {
    const e: AxiosError = error as AxiosError;
    return (
      <>
        <h1>{e.response?.statusText}</h1>
      </>
    );
  }

  return (
    <div>
      <div className="">Title : </div>
      <div className="">Content</div>
      <div className=""></div>
      <div className=""></div>
      <div className=""></div>
      <div className=""></div>
    </div>
  );
};

export default Page;
