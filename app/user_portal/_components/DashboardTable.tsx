import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import Spinner from "@/components/Spinner";
import { useAppStore } from "@/libs/ZustandStore";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";

const DashboardTable = () => {
  const { session, fetchedRequestDetails, setFetchedRequestDetails } =
    useAppStore();

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
    columnHelper.accessor("duration", {
      header: "Duration",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("budget", {
      header: "Budget",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("pitches", {
      header: "Pitches",
      cell: (info) => (info.getValue() == null ? 0 : info.getValue().length),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
  ];

  const [tableData, setTableData] = useState(fetchedRequestDetails);

  useEffect(() => {
    setTableData(fetchedRequestDetails);
    console.log(fetchedRequestDetails);
  }, [fetchedRequestDetails]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex items-center justify-center">
      {fetchedRequestDetails && (
        <table className="border-spacing-3 border-separate p-3">
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
                <SecondaryButton text="Mange" action={() => {}} />
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DashboardTable;
