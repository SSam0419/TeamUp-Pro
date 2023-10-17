import IndustryFilter from "@/components/IndustryFilter";
import SearchQuery from "@/components/SearchQuery";
import React from "react";

const SearchBar = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className="flex flex-col md:flex-row border rounded-md shadow justify-center items-center px-5 bg-white">
      <SearchQuery isLoading={isLoading} placeholderText="Search for skills" />
      <div className="hidden md:block border h-5 mx-4"></div>
      <IndustryFilter isLoading={isLoading} />
    </div>
  );
};

export default SearchBar;
