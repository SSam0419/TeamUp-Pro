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

  const columnHelper = createColumnHelper<RequestDetails>();
  const columns = [
    columnHelper.accessor("title", {
      header: "Title",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      enableSorting: true,
      size: 140,
    }),
    columnHelper.accessor("duration", {
      header: "Duration",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      enableSorting: true,
    }),
    columnHelper.accessor("professional_pitch_view", {
      header: "Competitions",
      cell: (info) => (info.getValue() == null ? 0 : info.getValue().length),
      footer: (info) => info.column.id,
      enableSorting: true,
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      enableSorting: true,
    }),
  ];

  const [tableData, setTableData] = useState(fetchedRequestDetails);

  useEffect(() => {
    setTableData(fetchedRequestDetails);
  }, [fetchedRequestDetails]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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

  return (
    <div className="flex flex-col items-center justify-start shadow border">
      {fetchedRequestDetails && (
        <table className="border-spacing-5 border-collapse ">
          <thead className="text-gray-700 uppercase border-b">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-left p-3 font-medium w-[150px]"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
                <th className="text-left p-3 font-medium">Access</th>
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row, idx) => {
              const beforeContent =
                tableData[idx].unlocked && profileInfo
                  ? "before:content-['View_Details'] before:text-[#67ca8d] "
                  : "before:content-['Click_To_Unlock'] before:text-primary";
              return (
                <tr
                  key={row.id}
                  className="bg-white even:bg-slate-50 hover:cursor-pointer hover:opacity-50 
                  hover:backdrop-blur-sm hover:bg-white/30 group
               "
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="text-left p-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                  <td
                    className={`p-4 flex justify-center items-center before:hidden group-hover:before:flex before:absolute group-hover:before:opacity-100 
                    ${beforeContent}
                    before:left-0 before:top-0  before:w-full before:bg-white/70 before:h-full before:backdrop-blur-sm before:items-center before:justify-center before:text-base before:font-semibold`}
                    align="center"
                    onClick={(e) => {
                      if (tableData[idx].unlocked && profileInfo) {
                        router.push(
                          "/professional_portal/view_request/" +
                            tableData[idx].id
                        );
                      } else if (profileInfo == null) {
                        toast("You have to sign in to unlock the request");
                        return;
                      } else {
                        mutate({
                          requestDetailsId: tableData[idx].id,
                          professionalId: profileInfo.id,
                        });
                      }
                    }}
                  >
                    <button
                      className={`text-center rounded-full w-[30px] h-[30px]
                  text-white p-2 flex items-center justify-center ${
                    tableData[idx].unlocked && profileInfo
                      ? "bg-[#67ca8d]"
                      : "bg-primary"
                  }`}
                      onClick={() => {
                        if (profileInfo == null) {
                          toast("You have to sign in to make a pitch", {
                            duration: 5000,
                          });
                          return;
                        }
                      }}
                    >
                      {tableData[idx].unlocked && profileInfo !== null ? (
                        <AiFillUnlock />
                      ) : (
                        <AiFillLock />
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DashboardTable;
