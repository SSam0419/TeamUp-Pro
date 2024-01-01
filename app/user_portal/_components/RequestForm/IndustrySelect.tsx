import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { IndustriesOptions } from "@/app/_types/constants/industries";

type props = {
  setIndustry: Function;
};

export default function IndustrySelect({ setIndustry }: props) {
  return (
    <Select
      isRequired
      label="Industry"
      placeholder="Select an industry"
      defaultSelectedKeys={IndustriesOptions[0]}
      className=""
      onChange={(industry) => {
        setIndustry(industry.target.value);
      }}
    >
      {IndustriesOptions.map((industry) => (
        <SelectItem key={industry} value={industry}>
          {industry}
        </SelectItem>
      ))}
    </Select>
  );
}
