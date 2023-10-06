"use client";
import SecondaryButton from "@/components/CustomButtons/SecondaryButton";
import StatusChip from "@/components/StatusChip";
import { useAppStore } from "@/libs/ZustandStore";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const DashboardTable = () => {
  const { fetchedRequestDetails } = useAppStore();
  const router = useRouter();

  const columnHelper = createColumnHelper<RequestDetails>();
  const columns = [
    columnHelper.accessor("industry", {
      header: "Industry",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("title", {
      header: "Title",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    {
      id: "Duration",
      accessorFn: (row: RequestDetails) =>
        `${row.duration} ${row.duration_unit}`,
    },
    {
      id: "Budget",
      accessorFn: (row: RequestDetails) =>
        `${row.budget_lower_limit} - ${row.budget_upper_limit}`,
    },
    columnHelper.accessor("professional_pitch_view", {
      header: "Pitches",
      cell: (info) => (info.getValue() == null ? 0 : info.getValue().length),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => <StatusChip status={info.getValue()} />,
      footer: (info) => info.column.id,
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
    <div className="flex items-center justify-center w-[900px]">
      {fetchedRequestDetails && (
        <table className="border-spacing-6 border-separate p-3 ">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="text-left p-3">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="shadow hover:cursor-pointer">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="text-left p-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td className="p-3">
                  <SecondaryButton
                    text="Mange"
                    action={() => {
                      router.push(
                        `user_portal/request_details/${row.original.id}`
                      );
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DashboardTable;
