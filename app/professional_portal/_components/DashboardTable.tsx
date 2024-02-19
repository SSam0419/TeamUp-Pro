"use client";

import { useAppStore } from "@/libs/ZustandStore";
import React from "react";
import DashboardCard from "./DashboardCard";

const DashboardTable = () => {
  const { fetchedRequestDetails } = useAppStore();

  return (
    // <div className="flex flex-col md:grid md:grid-cols-3 gap-3">
    <div className="flex flex-col md:w-[650px]">
      {fetchedRequestDetails.map((request, idx) => {
        return (
          <div key={idx}>
            <DashboardCard requestDetails={request} />
          </div>
        );
      })}
    </div>
  );
};

export default DashboardTable;
