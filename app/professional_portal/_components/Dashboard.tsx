"use client";
import PrimaryButton from "@/components/PrimaryButton";
import React, { useEffect, useState } from "react";

import DashboardTable from "./DashboardTable";
import GlobalPopUp from "@/components/GlobalPopUp";
import { useQuery } from "react-query";
import { useAppStore } from "@/libs/ZustandStore";
import axios from "axios";
import Spinner from "@/components/Spinner";
const Dashboard = () => {
  const { session, setFetchedRequestDetails } = useAppStore();

  const { data: requestFreeViewData, isLoading } = useQuery(
    ["fetchRequestDetails"],
    async () => {
      const data = await axios.get("/api/request/professional/all_request");

      return data;
    }
  );

  useEffect(() => {
    if (requestFreeViewData)
      setFetchedRequestDetails(requestFreeViewData.data.data);
    console.log(requestFreeViewData?.data.data[0]);
  }, [requestFreeViewData, setFetchedRequestDetails]);

  return (
    <div className="px-[30px] py-[10px]  bg-white min-w-[1000px] rounded-[15px] shadow">
      <div className="flex justify-between">
        <button className="shadow px-10 py-2">
          maybe change this to a search bar
        </button>
      </div>
      <div className="my-3 min-h-[500px] flex items-center justify-center">
        {isLoading ? <Spinner /> : <DashboardTable />}
      </div>
    </div>
  );
};

export default Dashboard;
