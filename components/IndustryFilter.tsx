import { IndustriesOptions } from "@/app/_types/constants/industries";
import React, { useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const IndustryFilter = ({ isLoading }: { isLoading: boolean }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));
  const [currentIndustry, setCurrentIndustry] = useState<string>(
    current.get("industry") || IndustriesOptions[0]
  );

  const changeFilter = (industryName: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (!industryName) {
      current.delete("industry");
    } else {
      current.set("industry", industryName);
      setCurrentIndustry(industryName);
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  };

  return (
    <select
      className={`flex p-3 justify-center items-center ${
        isLoading ? "bg-white opacity-50" : ""
      }`}
      value={currentIndustry}
      disabled={isLoading}
      onChange={(e) => changeFilter(e.target.value)}
    >
      {/* <select
      className={`flex my-4 shadow border p-3 justify-center items-center${
        isLoading ? "bg-white opacity-50" : ""
      }`}
      value={currentIndustry}
      disabled={isLoading}
      onChange={(e) => changeFilter(e.target.value)}
    > */}
      {IndustriesOptions.map((option, idx) => (
        <option key={idx}>{option}</option>
        // <div className="mx-2">
        //   {idx !== IndustriesOptions.length - 1 ? "|" : ""}
        // </div>
      ))}
    </select>
  );
};

export default IndustryFilter;
