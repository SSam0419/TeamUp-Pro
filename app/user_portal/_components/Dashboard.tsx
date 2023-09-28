"use client";
import PrimaryButton from "@/components/PrimaryButton";
import React, { useCallback, useEffect, useState } from "react";

import DashboardTable from "./DashboardTable";
import GlobalPopUp from "@/components/GlobalPopUp";
import CreateRequestForm from "./CreateRequestForm";
import { useQuery } from "react-query";
import { useAppStore } from "@/libs/ZustandStore";
import axios from "axios";
import Spinner from "@/components/Spinner";
import { LuClipboardList } from "react-icons/lu";
import { useSearchParams } from "next/navigation";

const Dashboard = () => {
  const searchParams = useSearchParams();
  const { session, setFetchedRequestDetails, profileInfo } = useAppStore();

  const [openCreateRequestForm, setOpenCreateRequestForm] =
    useState<boolean>(false);

  const { data: requestDetailsData, isLoading } = useQuery(
    ["retrieveRequestDetails", session, profileInfo],
    async () => {
      if (session == null) return null;
      const data = await axios.get(
        "/api/request/user_request?user_id=" + session?.user.id
      );

      return data;
    }
  );

  useEffect(() => {
    if (requestDetailsData)
      setFetchedRequestDetails(requestDetailsData.data.data);
    else setFetchedRequestDetails([]);
  }, [requestDetailsData, setFetchedRequestDetails]);

  return (
    <div className="px-[30px] py-[10px]  bg-white min-w-[1000px] rounded-[15px] shadow">
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
      <div className="flex justify-between items-center m-3">
        {/* <div className="rounded-full bg-white border shadow px-5 py-2 flex justify-between items-center">
          <div className="flex items-center justify-between">
            <label className="">
              <AiOutlineSearch />
            </label>
            <div className="border-l h-6 mx-2"></div>
          </div>
          <input className="outline-none bg-white text-base"></input>
        </div> */}
        <div className="text-xl flex items-center justify-center gap-2">
          <LuClipboardList />
          Your Requests
        </div>
        <div>
          <PrimaryButton
            action={() => {
              setOpenCreateRequestForm(true);
            }}
            text="Create"
          />
        </div>
      </div>
      <div className="my-3 min-h-[500px] flex justify-start items-center flex-col w-full shadow border rounded-md">
        {isLoading ? <Spinner /> : <DashboardTable />}
        {!session && !isLoading && (
          <div className="italic font-light text-lg text-secondary">
            sign in now to view your requests!
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
