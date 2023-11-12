"use client";
import { useAppStore } from "@/libs/ZustandStore";
import React from "react";
import DashboardCard from "./DashboardCard";

const DashboardTable = () => {
  const { fetchedRequestDetails } = useAppStore();
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="grid md:grid-cols-3 flex-wrap gap-3 p-1 w-full">
        {fetchedRequestDetails &&
          fetchedRequestDetails.map((request, idx) => {
            return <DashboardCard requestDetails={request} key={idx} />;
          })}
      </div>
    </div>
  );
};

export default DashboardTable;
