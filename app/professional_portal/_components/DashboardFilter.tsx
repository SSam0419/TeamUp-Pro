"use client";

import React, { useEffect, useState } from "react";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";
import { Select, SelectItem, Selection } from "@nextui-org/react";
import { Workmodes } from "@/app/_types/constants/Workmodes";
import PrimaryButton from "@/components/CustomButtons/PrimaryButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useConstantStore } from "@/libs/slices/constantSlice";

const DashboardFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const languageOptions = useConstantStore((state) => state.languageOptions);
  const industryOptions = useConstantStore((state) => state.industryOptions);

  const [industries, setIndustries] = useState<undefined | string[]>(
    industryOptions
  );

  const [selectedWorkmode, setSelectedWorkmode] = React.useState<Selection>(
    new Set([])
  );
  const [selectedLanguages, setSelectedLanguages] = React.useState<Selection>(
    new Set([])
  );

  useEffect(() => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    const _industries = current.get("industries");
    const _workmode = current.get("workmode");
    const _languages = current.get("languages");

    if (_industries) {
      setIndustries(_industries.split(","));
    }
    if (_workmode) {
      setSelectedWorkmode(new Set([_workmode]));
    }
    if (_languages) {
      setSelectedLanguages(new Set(_languages.split(",")));
    }
  }, [searchParams]);

  const filterFunction = () => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (industries) {
      current.set("industries", industries.join(","));
    } else {
      current.delete("industries");
    }
    if (selectedWorkmode && selectedWorkmode !== null) {
      current.set("workmode", Array.from(selectedWorkmode).join(""));
    } else {
      current.delete("workmode");
    }
    if (selectedLanguages) {
      current.set("languages", Array.from(selectedLanguages).join(","));
    } else {
      current.delete("languages");
    }
    const search = current.toString();
    const full_query = search ? `?${search}` : "";
    router.push(`${pathname}${full_query}`);
  };
  return (
    <div className="w-[350px] hidden md:block">
      <div className="border shadow rounded bg-white px-2 py-5 flex flex-col gap-3">
        <div className="">
          <CheckboxGroup
            defaultValue={industryOptions}
            value={industries}
            className="border px-2 py-3 rounded"
            onChange={(value) => {
              if (Array.isArray(value)) {
                setIndustries(value);
              }
            }}
          >
            {industryOptions.map((industry) => (
              <Checkbox value={industry} key={industry}>
                {industry}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </div>
        <Select
          label="Workmode"
          placeholder="Select preferrable workmode"
          onSelectionChange={setSelectedWorkmode}
          selectedKeys={selectedWorkmode}
        >
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
          selectedKeys={selectedLanguages}
          onSelectionChange={setSelectedLanguages}
        >
          {languageOptions.map((language, idx) => (
            <SelectItem key={language} value={language}>
              {language}
            </SelectItem>
          ))}
        </Select>
        <PrimaryButton action={filterFunction} text="Filter" />
      </div>
    </div>
  );
};

export default DashboardFilter;
