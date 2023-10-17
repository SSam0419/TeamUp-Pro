"use client";
import { useAppStore } from "@/libs/ZustandStore";
import React from "react";
import DashboardCard from "./DashboardCard";

const DashboardTable = () => {
  const { fetchedRequestDetails } = useAppStore();

  return (
    <div className="flex flex-wrap gap-3 items-center justify-center p-3">
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
