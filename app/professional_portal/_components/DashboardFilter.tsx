"use client";

import React, { useEffect, useState } from "react";
import {
  CheckboxGroup,
  Checkbox,
  Input,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { Select, SelectItem, Selection } from "@nextui-org/react";
import { Workmodes } from "@/libs/types/constants/Workmodes";
import CustomButton from "@/components/CustomButtons/CustomButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useConstantStore } from "@/libs/slices/constantSlice";
import { requestDetailsStatus } from "@/libs/types/constants/requestDetailsStatus";
import toast from "react-hot-toast";

const DashboardFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const languageOptions = useConstantStore((state) => state.languageOptions);
  const industryOptions = useConstantStore((state) => state.industryOptions);
  const baseLocationOptions = useConstantStore(
    (state) => state.baseLocationOptions
  );
  const [selectedLocation, setSelectedLocation] =
    React.useState<React.Key | null>(null);

  const [industries, setIndustries] = useState<undefined | string[]>(
    industryOptions
  );
  const [budget, setBudget] = useState<{ lower: number; upper: number }>({
    lower: 0,
    upper: 0,
  });

  const [selectedWorkmode, setSelectedWorkmode] = React.useState<Selection>(
    new Set([])
  );
  const [selectedLanguages, setSelectedLanguages] = React.useState<Selection>(
    new Set([])
  );
  const [selectedStatus, setSelectedStatus] = React.useState<Selection>(
    new Set([])
  );

  useEffect(() => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    const _industries = current.get("industries");
    const _workmode = current.get("workmode");
    const _languages = current.get("languages");
    const _location = current.get("location");
    const _status = current.get("status");
    const _lowerBudget = current.get("lower_budget");
    const _upperBudget = current.get("upper_budget");

    if (_status) {
      setSelectedStatus(new Set([_status]));
    }

    if (_lowerBudget && _upperBudget) {
      setBudget({
        lower: parseFloat(_lowerBudget),
        upper: parseFloat(_upperBudget),
      });
    } else if (_lowerBudget) {
      setBudget({
        upper: parseFloat(_lowerBudget) + 1,
        lower: parseFloat(_lowerBudget),
      });
    } else if (_upperBudget) {
      setBudget({ lower: 0, upper: parseFloat(_upperBudget) });
    }

    if (_location) {
      setSelectedLocation(_location);
    }

    if (_industries) {
      setIndustries(_industries.split(","));
    } else {
      setIndustries(industryOptions);
    }
    if (_workmode) {
      setSelectedWorkmode(new Set([_workmode]));
    }
    if (_languages) {
      setSelectedLanguages(new Set(_languages.split(",")));
    }
  }, [industryOptions, searchParams]);

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

    if (budget.lower) {
      current.set("lower_budget", budget.lower.toString());
    } else {
      current.delete("lower_budget");
    }

    if (budget.upper) {
      current.set("upper_budget", budget.upper.toString());
    } else {
      current.delete("upper_budget");
    }

    if (selectedLocation) {
      current.set("location", selectedLocation.toString());
    } else {
      current.delete("location");
    }
    if (selectedStatus) {
      current.set("status", Array.from(selectedStatus).join(""));
    } else {
      current.delete("status");
    }
    const search = current.toString();
    const full_query = search ? `?${search}` : "";
    router.push(`${pathname}${full_query}`);
  };

  return (
    <div className="w-[350px] hidden md:block">
      <div className="border shadow rounded bg-white px-2 py-5 flex flex-col gap-3">
        <div className="font-semibold p-1">Custom Filter</div>
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
        <Autocomplete
          label="Location"
          placeholder="Select preferrable work location"
          onSelectionChange={setSelectedLocation}
          selectedKey={selectedLocation}
        >
          {baseLocationOptions.map((location) => (
            <AutocompleteItem key={location} value={location}>
              {location}
            </AutocompleteItem>
          ))}
        </Autocomplete>
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
        <Select
          label="Status"
          placeholder="Select status"
          selectedKeys={selectedStatus}
          onSelectionChange={setSelectedStatus}
        >
          {requestDetailsStatus.map((status, idx) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </Select>

        <div className="flex justify-between align-middle items-center gap-5">
          <Input
            type="number"
            label="Min Budget"
            placeholder="Enter lower limit"
            onChange={(val) => {
              if (parseFloat(val.target.value) > budget.upper) {
                toast.error(
                  "Upper Budget must be larger that the Lower Budget"
                );
                return;
              }
              setBudget((prev) => ({
                ...prev,
                lower: parseFloat(val.target.value),
              }));
            }}
            value={budget.lower.toString()}
          />
          -
          <Input
            type="number"
            label="Max Budget"
            placeholder="Enter upper limit"
            onChange={(val) => {
              if (parseFloat(val.target.value) < budget.lower) {
                toast.error(
                  "Upper Budget must be larger that the Lower Budget"
                );
                return;
              }
              setBudget((prev) => ({
                ...prev,
                upper: parseFloat(val.target.value),
              }));
            }}
            value={budget.upper.toString()}
          />
        </div>

        <CustomButton variant="primary" action={filterFunction} text="Filter" />
      </div>
    </div>
  );
};

export default DashboardFilter;
