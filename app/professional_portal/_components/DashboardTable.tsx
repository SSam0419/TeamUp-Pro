"use client";

import { IndustriesOptions } from "@/types/constants/industries";
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
import { AiFillLock } from "react-icons/ai";
import { useMutation } from "react-query";

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
    columnHelper.accessor("professional_pitch", {
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

  const [tableData, setTableData] = useState(
    fetchedRequestDetails?.filter(
      (request) => request.industry === IndustriesOptions[0]
    )
  );

  useEffect(() => {
    setTableData(
      fetchedRequestDetails?.filter(
        (request) => request.industry === IndustriesOptions[0]
      )
    );
  }, [fetchedRequestDetails]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [selectedIndustry, setSelectedIndustry] = useState(0);

  return (
    <div className="flex flex-col items-center justify-start">
      <div className="flex my-4 rounded-full shadow border p-3">
        {IndustriesOptions.map((option, idx) => (
          <div key={idx} className="flex">
            <button
              className={`${selectedIndustry == idx ? "text-primary" : ""}`}
              type="button"
              onClick={() => {
                setSelectedIndustry(idx);
                setTableData(
                  fetchedRequestDetails?.filter(
                    (request) => request.industry === IndustriesOptions[idx]
                  )
                );
              }}
            >
              {option}
            </button>
            <div className="mx-2">
              {idx !== IndustriesOptions.length - 1 ? "|" : ""}
            </div>
          </div>
        ))}
      </div>
      {fetchedRequestDetails && (
        <table className="border-spacing-4 border-collapse">
          <thead className="text-gray-700 uppercase bg-gray-50">
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
                  ? "before:content-['View_Details'] before:text-primary "
                  : "before:content-['UNLOCK_TO_VIEW_DETAILS']";
              return (
                <tr
                  key={row.id}
                  className="bg-white border-b hover:cursor-pointer hover:opacity-50 
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
                        console.log(tableData[idx]);
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
                      className="text-center rounded-full bg-secondary w-[30px] h-[30px]
                  text-white p-2 flex items-center justify-center"
                      onClick={() => {
                        if (profileInfo == null) {
                          toast("You have to sign in to make a pitch", {
                            duration: 5000,
                          });
                          return;
                        }
                      }}
                    >
                      <AiFillLock />
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
