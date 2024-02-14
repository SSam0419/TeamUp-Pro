import React, { useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useConstantStore } from "@/libs/slices/constantSlice";

const IndustryFilter = ({ isLoading }: { isLoading: boolean }) => {
  const industryOptions = useConstantStore((state) => state.industryOptions);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));
  const [currentIndustry, setCurrentIndustry] = useState<string>(
    current.get("industry") || industryOptions[0]
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
      {industryOptions.map((option, idx) => (
        <option key={idx}>{option}</option>
      ))}
    </select>
  );
};

export default IndustryFilter;
