"use client";

import { Input, Textarea, Slider } from "@nextui-org/react";
import CustomButton from "@/components/CustomButtons/CustomButton";
import { useAppStore } from "@/libs/ZustandStore";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import Spinner from "@/components/Spinner";
import LanguageDropdown from "./LanguageDropdown";
import LocationDropdown from "./LocationSelect";
import WorkModeSelect from "./WorkModeSelect";
import IndustrySelect from "./IndustrySelect";
import { useConstantStore } from "@/libs/slices/constantSlice";

type props = {
  onClose: Function;
};

export type CreateRequestFormDataType = {
  title: string;
  content: string;
  budget_lower_limit: string;
  budget_upper_limit: string;
  duration: string;
  industry: string;
  duration_unit: string;
  base_location: string;
  language_requirements: string[];
  workmode: string;
};

const CreateRequestForm = ({ onClose }: props) => {
  const languageOptions = useConstantStore((state) => state.languageOptions);
  const industryOptions = useConstantStore((state) => state.industryOptions);
  const baseLocationOptions = useConstantStore(
    (state) => state.baseLocationOptions
  );

  const { session } = useAppStore();
  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation(
    async (formData: CreateRequestFormDataType) => {
      const result = await axios.post("/api/request/user_request", formData, {
        validateStatus: (status) => status >= 200 && status < 300,
      });
      // console.log(result);
      // if (result.status < 200 || result.status >= 300) {
      //   throw new Error(result.statusText);
      // }

      return result;
    },
    {
      onSuccess: () => {
        onClose();
        queryClient.invalidateQueries({ queryKey: ["retrieveRequestDetails"] });
      },
      onError: (error: Error) => {
        toast.error("Something went wrong! ");
      },
    }
  );

  const [formData, setFormData] = useState<CreateRequestFormDataType>({
    title: "",
    content: "",
    budget_lower_limit: "0.00",
    budget_upper_limit: "0.00",
    duration: "",
    duration_unit: "Days",
    industry: industryOptions[0],
    base_location: "",
    language_requirements: [languageOptions[0]],
    workmode: "",
  });

  return (
    <form className="flex-col gap-4  p-4">
      {isLoading && (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      )}
      {!isLoading && (
        <div className="flex flex-col gap-5">
          <div className="mb-4 text-subheading">Submit a request now!</div>
          <IndustrySelect
            industryOptions={industryOptions}
            setIndustry={(i: string) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                industry: i,
              }))
            }
          />
          <Input
            type="text"
            label="Title"
            isRequired
            placeholder="Enter Project Title"
            value={formData.title}
            onChange={(e) => {
              setFormData((prevFormData) => ({
                ...prevFormData,
                title: e.target.value,
              }));
            }}
          />
          <Textarea
            isRequired
            label="Content"
            placeholder="Enter Content"
            className=""
            value={formData.content}
            onChange={(e) => {
              setFormData((prevFormData) => ({
                ...prevFormData,
                content: e.target.value,
              }));
            }}
          />
          <div className="flex gap-2">
            <Slider
              label="Budget"
              step={50}
              minValue={0}
              maxValue={10000}
              defaultValue={[
                parseFloat(formData.budget_lower_limit),
                parseFloat(formData.budget_upper_limit),
              ]}
              formatOptions={{ style: "currency", currency: "USD" }}
              className="max-w-md"
              onChange={(val) => {
                if (typeof val === "number") {
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    budget_lower_limit: val.toString(),
                    budget_upper_limit: val.toString(),
                  }));
                } else {
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    budget_lower_limit: val[0].toString(),
                    budget_upper_limit: val[1].toString(),
                  }));
                }
              }}
            />
            <Input
              type="text"
              label="Duration"
              placeholder=" "
              value={formData.duration}
              onChange={(e) => {
                const value = e.target.value;
                const digits = value.match(/\d+/g);
                const filteredValue = digits ? digits.join("") : "";
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  duration: filteredValue,
                }));
              }}
              endContent={
                <select
                  className="outline-none border-0 bg-transparent   text-small"
                  name="duration_unit"
                  id=""
                  onChange={(e) => {
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      duration_unit: e.target.value,
                    }));
                  }}
                >
                  <option value={"Days"}>Day(s)</option>
                  <option value={"Weeks"}>Week(s)</option>
                  <option value={"Months"}>Month(s)</option>
                  <option value={"Years"}>Year(s)</option>
                </select>
              }
            />
          </div>

          <div>
            <label>Required Languages</label>
            <LanguageDropdown
              availableLanguages={languageOptions}
              setLanguages={(languages: string[]) => {
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  language_requirements: languages,
                }));
              }}
            />
          </div>
          <div className="flex gap-2">
            <LocationDropdown
              baseLocationOptions={baseLocationOptions}
              setLocation={(location: string) => {
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  base_location: location,
                }));
              }}
            />
            <WorkModeSelect
              setWorkmode={(workmode: string) => {
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  workmode: workmode,
                }));
              }}
            />
          </div>

          <div className="my-3 flex items-center justify-center">
            <CustomButton
              variant="primary"
              action={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                e.preventDefault();
                if (
                  Object.values(formData).some(
                    (value) => value.toString().trim() === ""
                  )
                ) {
                  toast.error("Please filled in all requested field(s)");
                  return;
                }
                if (
                  parseFloat(formData.budget_lower_limit) >
                  parseFloat(formData.budget_upper_limit)
                ) {
                  toast.error("Please filled in valid budget range");
                  return;
                }
                if (session == null) {
                  toast.error("Please Log In before submitting your rquest! ");
                  return;
                }
                try {
                  mutate(formData);
                } catch (error) {
                  console.log("here");
                  console.error(error);
                }
              }}
              text="Confirm"
            />
          </div>
        </div>
      )}

      {error && <p className="text-red-400">Something went wrong! </p>}
    </form>
  );
};

export default CreateRequestForm;
