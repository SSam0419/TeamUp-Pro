"use client";
import PrimaryButton from "@/components/PrimaryButton";
import React, { useEffect, useState } from "react";

import DashboardTable from "./DashboardTable";
import GlobalPopUp from "@/components/GlobalPopUp";
import CreateRequestForm from "./CreateRequestForm";
import { useQuery } from "react-query";
import { useAppStore } from "@/libs/ZustandStore";
import axios from "axios";
import Spinner from "@/components/Spinner";
const Dashboard = () => {
  const { session, setFetchedRequestDetails } = useAppStore();

  const [openCreateRequestForm, setOpenCreateRequestForm] =
    useState<boolean>(false);

  const { data: requestDetailsData, isLoading } = useQuery(
    ["fetchRequestDetails", session],
    async () => {
      if (session == null) return;
      const data = await axios.get(
        "/api/request/user_request?user_id=" + session?.user.id
      );

      return data;
    }
  );

  useEffect(() => {
    if (requestDetailsData)
      setFetchedRequestDetails(requestDetailsData.data.data);
    console.log(requestDetailsData?.data.data);
  }, [requestDetailsData, setFetchedRequestDetails]);

  return (
    <div className="px-[30px] py-[10px]  bg-white min-w-[1000px] rounded-[15px] shadow">
      <div className="flex justify-between">
        <button className="shadow px-10 py-2">
          maybe change this to a search bar
        </button>
        {openCreateRequestForm && (
          <GlobalPopUp
            onClose={() => {
              setOpenCreateRequestForm(false);
            }}
          >
            {
              <CreateRequestForm
                onClose={() => {
                  setOpenCreateRequestForm(false);
                }}
              />
            }
          </GlobalPopUp>
        )}
        <PrimaryButton
          action={() => {
            setOpenCreateRequestForm(true);
          }}
          text="Create"
        />
      </div>
      <div className="my-3 min-h-[500px] flex items-center justify-center">
        {isLoading ? <Spinner /> : <DashboardTable />}
      </div>
    </div>
  );
};

export default Dashboard;
