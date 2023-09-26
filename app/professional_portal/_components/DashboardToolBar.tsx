import React from "react";
import SearchQuery from "./SearchQuery";
import IndustryFilter from "./IndustryFilter";

const DashboardToolBar = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className="flex border rounded-md shadow justify-center items-center px-5 ">
      <SearchQuery isLoading={isLoading} />
      <div className="border h-5 mx-4"></div>
      <IndustryFilter isLoading={isLoading} />
    </div>
  );
};

export default DashboardToolBar;
