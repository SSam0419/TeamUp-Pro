import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

type props = {
  industryOptions: string[];
  setIndustry: Function;
};

export default function IndustrySelect({
  setIndustry,
  industryOptions,
}: props) {
  return (
    <Select
      isRequired
      label="Industry"
      placeholder="Select an industry"
      className=""
      onChange={(industry) => {
        setIndustry(industry.target.value);
      }}
    >
      {industryOptions.map((industry) => (
        <SelectItem key={industry} value={industry}>
          {industry}
        </SelectItem>
      ))}
    </Select>
  );
}
