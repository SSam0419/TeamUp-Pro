"use client";
import React, { useEffect, useState } from "react";

import DashboardTable from "./DashboardTable";
import { useQuery } from "react-query";
import { useAppStore } from "@/libs/ZustandStore";
import axios from "axios";
import Spinner from "@/components/Spinner";
import { useSearchParams } from "next/navigation";
import DashboardToolBar from "../../../components/DashboardToolBar";
import { Pagination } from "@nextui-org/react";

const Dashboard = () => {
  const { setFetchedRequestDetails, profileInfo } = useAppStore();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);
  const [totalRow, setTotalRow] = React.useState(1);
  const resultsShownEachPage = 3;

  useEffect(() => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    setQuery(current.toString());
  }, [searchParams]);

  const { isLoading } = useQuery(
    [
      "retrieveRequestDetails",
      query,
      profileInfo,
      currentPage,
      resultsShownEachPage,
    ],
    async () => {
      const route =
        "/api/request/professional/restricted_request?" +
        query +
        `&from=${(currentPage - 1) * resultsShownEachPage}&to=${
          currentPage == totalPage
            ? totalRow
            : currentPage * resultsShownEachPage - 1
        }`;

      const data = await axios.get(route);
      return data as any;
    },
    {
      onSuccess: (data) => {
        if (data) {
          setFetchedRequestDetails(data.data.data);
          setTotalRow(parseInt(data.data.count));
          setTotalPage(
            Math.ceil(parseInt(data.data.count) / resultsShownEachPage)
          );
        } else {
          setFetchedRequestDetails([]);
        }
      },
    }
  );

  return (
    <div className="md:px-[30px] md:py-[10px]  bg-white md:min-w-[1000px] rounded-[15px] shadow flex flex-col gap-5 items-center p-5 mb-10">
      <div className="md:w-[800px]">
        <DashboardToolBar isLoading={isLoading} />
      </div>
      {!isLoading && (
        <div className="py-3 md:w-[800px] flex items-start justify-center ">
          <DashboardTable />
        </div>
      )}
      {isLoading && (
        <div className="my-3 min-h-[500px] flex items-center justify-center">
          <Spinner />
        </div>
      )}
      {!isLoading && profileInfo && (
        <Pagination
          showControls
          total={totalPage}
          initialPage={1}
          page={currentPage}
          onChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Dashboard;
