"use client";
import React, { useEffect, useState } from "react";

import DashboardTable from "./DashboardTable";
import { useQuery } from "react-query";
import { useAppStore } from "@/libs/ZustandStore";
import axios from "axios";
import Spinner from "@/components/Spinner";
import { useSearchParams } from "next/navigation";
import DashboardToolBar from "./DashboardToolBar";
const Dashboard = () => {
  const { setFetchedRequestDetails, profileInfo } = useAppStore();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    setQuery(current.toString());
  }, [searchParams]);

  const { data: requestFreeViewData, isLoading } = useQuery(
    ["retrieveRequestDetails", query, profileInfo],
    async () => {
      const route = "/api/request/professional/restricted_request?" + query;

      const data = await axios.get(route);
      return data;
    }
  );

  useEffect(() => {
    if (requestFreeViewData) setFetchedRequestDetails(requestFreeViewData.data);
  }, [requestFreeViewData, setFetchedRequestDetails]);

  return (
    <div className="px-[30px] py-[10px]  bg-white min-w-[1000px] rounded-[15px] shadow flex flex-col gap-5 items-center">
      <div className="w-[800px]">
        <DashboardToolBar isLoading={isLoading} />
      </div>
      {!isLoading && (
        <div className="min-h-[500px] w-[800px] flex items-start justify-center ">
          <DashboardTable />
        </div>
      )}
      {isLoading && (
        <div className="my-3 min-h-[500px] flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
