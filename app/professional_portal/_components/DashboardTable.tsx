"use client";

import { useAppStore } from "@/libs/ZustandStore";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import { useMutation } from "react-query";
import DashboardCard from "./DashboardCard";

const DashboardTable = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: async ({
      requestDetailsId,
      professionalId,
    }: {
      requestDetailsId: string;
      professionalId: string;
    }) => {
      const response = await axios.post(
        "/api/request/professional/unlock_request",
        {
          requestDetailsId,
          professionalId,
        }
      );
      return response;
    },
    onError: (error: AxiosError) => {
      error.response ? toast(error.response?.statusText) : toast(error.message);
    },
    onSuccess: (data) => {
      toast("Unlocked");
      router.push("/professional_portal/view_request/" + data.data);
    },
  });

  const { fetchedRequestDetails, profileInfo } = useAppStore();
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-3">
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
