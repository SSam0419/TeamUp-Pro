"use client";
import React, { useEffect } from "react";

import DashboardTable from "./DashboardTable";
import { useQuery } from "react-query";
import { useAppStore } from "@/libs/ZustandStore";
import axios from "axios";
import Spinner from "@/components/Spinner";
const Dashboard = () => {
  const { session, setFetchedRequestDetails } = useAppStore();

  const { data: requestFreeViewData, isLoading } = useQuery(
    ["fetchRequestDetails"],
    async () => {
      const data = await axios.get(
        "/api/request/professional/restricted_request"
      );
      return data;
    }
  );

  useEffect(() => {
    if (requestFreeViewData) setFetchedRequestDetails(requestFreeViewData.data);
  }, [requestFreeViewData, setFetchedRequestDetails]);

  return (
    <div className="px-[30px] py-[10px]  bg-white min-w-[1000px] rounded-[15px] shadow flex flex-col gap-5">
      <div className="flex items-start justify-center">
        <button className="shadow px-10 py-2">
          maybe change this to a search bar
        </button>
      </div>
      {!isLoading && (
        <div className="min-h-[500px] flex items-start justify-center">
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
