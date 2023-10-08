import React from "react";
import SearchQuery from "../../../components/SearchQuery";
import IndustryFilter from "../../../components/IndustryFilter";

const DashboardToolBar = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className="flex flex-col md:flex-row border rounded-md shadow justify-center items-center px-5 ">
      <SearchQuery
        isLoading={isLoading}
        placeholderText="Search for request "
      />
      <div className="hidden md:block border h-5 mx-4"></div>
      <IndustryFilter isLoading={isLoading} />
    </div>
  );
};

export default DashboardToolBar;
