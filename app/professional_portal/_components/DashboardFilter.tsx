"use client";

import React from "react";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";
import { IndustriesOptions } from "@/app/_types/constants/industries";
import { Select, SelectItem } from "@nextui-org/react";
import { Workmodes } from "@/app/_types/constants/Workmodes";
import { AvailableLanguages } from "@/app/_types/constants/AvailableLanguages";
import PrimaryButton from "@/components/CustomButtons/PrimaryButton";

const DashboardFilter = () => {
  return (
    <div className="fixed left-10 transform w-[350px] hidden md:block">
      <div className="border shadow rounded bg-white px-2 py-5 flex flex-col gap-3">
        <div className="">
          <div className="text-title">Industry</div>
          <CheckboxGroup
            defaultValue={IndustriesOptions}
            className="border px-2 py-3 rounded"
          >
            {IndustriesOptions.map((industry) => (
              <Checkbox value={industry} key={industry}>
                {industry}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </div>
        <Select label="Workmode" placeholder="Select preferrable workmode">
          {Workmodes.map((mode) => (
            <SelectItem key={mode} value={mode}>
              {mode}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="Language"
          placeholder="Select preferrable languages"
          selectionMode="multiple"
        >
          {AvailableLanguages.map((language) => (
            <SelectItem key={language} value={language}>
              {language}
            </SelectItem>
          ))}
        </Select>
        <PrimaryButton action={() => {}} text="Filter" />
      </div>
    </div>
  );
};

export default DashboardFilter;
