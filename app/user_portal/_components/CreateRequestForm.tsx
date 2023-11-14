"use client";

import { IndustriesOptions } from "@/app/_types/constants/industries";
import PrimaryButton from "@/components/CustomButtons/PrimaryButton";
import ToggleButton from "@/components/CustomButtons/ToggleButton";
import { useAppStore } from "@/libs/ZustandStore";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import Spinner from "@/components/Spinner";

type props = {
  onClose: Function;
};

export type CreateRequestFormDataType = {
  title: string;
  content: string;
  budget_lower_limit: string;
  budget_upper_limit: string;
  duration: string;
  industry: (typeof IndustriesOptions)[number];
  createdBy: string;
  duration_unit: string;
  // email: string;
  // phone_number: string;
  // disclose_contact: boolean;
  // contact_person: string;
};

const CreateRequestForm = ({ onClose }: props) => {
  const { session, profileInfo } = useAppStore();
  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation(
    async (formData: CreateRequestFormDataType) => {
      const result = await axios.post("/api/request/user_request", formData, {
        validateStatus: (status) => status >= 200 && status < 300,
      });

      if (result.status < 200 || result.status >= 300) {
        throw new Error(result.statusText);
      }

      return result;
    },
    {
      onSuccess: () => {
        onClose();
        queryClient.invalidateQueries({ queryKey: ["retrieveRequestDetails"] });
      },
      onError: (error: Error) => {
        toast(error.toString());
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
    industry: IndustriesOptions[0],
    createdBy: profileInfo?.id || session?.user?.id || "",
    // phone_number: "",
    // email: profileInfo?.email || session?.user?.email || "",
    // contact_person: profileInfo?.username || "",
    // disclose_contact: false,
  });

  return (
    <form className="flex-col gap-4  p-4">
      {isLoading && (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      )}
      {!isLoading && (
        <>
          <div className="flex gap-3 mb-4 items-center">
            {/* <label htmlFor="industries">Industries</label> */}
            <select
              id="industries"
              className="bg-gray-50 border border-gray-300 rounded-lg p-2"
              onChange={(e) => {
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  industry: e.target.value,
                }));
              }}
            >
              {IndustriesOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="title">Title</label>
            <input
              required
              placeholder="title"
              id="title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.title}
              onChange={(e) => {
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  title: e.target.value,
                }));
              }}
            ></input>
          </div>
          <div className="mb-4">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              placeholder="content"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.content}
              onChange={(e) => {
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  content: e.target.value,
                }));
              }}
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="budget">Budget (HKD)</label>
            <div className="flex gap-4 items-center">
              <input
                required
                id="budget"
                type="number"
                placeholder="0.00"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.budget_lower_limit}
                onChange={(e) => {
                  if (
                    parseFloat(e.target.value) >
                    parseFloat(formData.budget_upper_limit)
                  ) {
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      budget_upper_limit: e.target.value,
                    }));
                  }
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    budget_lower_limit: e.target.value,
                  }));
                }}
              ></input>
              -
              <input
                required
                id="budget_upper_limit"
                type="number"
                placeholder="0.00"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.budget_upper_limit}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      budget_upper_limit: formData.budget_lower_limit,
                    }));
                    return;
                  }
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    budget_upper_limit: e.target.value,
                  }));
                }}
              ></input>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="duration">Duration</label>
            <div className="flex">
              <input
                required
                id="duration"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.duration}
                onChange={(e) => {
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    duration: e.target.value,
                  }));
                }}
              ></input>
              <select
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
            </div>
          </div>
          {/* <div className="mb-4">
            <label htmlFor="contact">Contact Person</label>
            <input
              required
              id="contact"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.contact_person}
              onChange={(e) => {
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  contact_person: e.target.value,
                }));
              }}
            ></input>
          </div>
          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <input
              required
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.email}
              onChange={(e) => {
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  email: e.target.value,
                }));
              }}
            ></input>
          </div>
          <div className="mb-4">
            <label htmlFor="phone">Phone Number</label>
            <input
              required
              id="phone"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.phone_number}
              placeholder="e.g. 8123 4567"
              onChange={(e) => {
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  phone_number: e.target.value,
                }));
              }}
            ></input>
          </div>
          <ToggleButton
            checked={formData.disclose_contact}
            text="Allow Professionals Contact You Directly"
            action={() => {
              setFormData((prevFormData) => ({
                ...prevFormData,
                disclose_contact: !formData.disclose_contact,
              }));
            }}
          /> */}
          <div className="my-3 flex items-center justify-center">
            <PrimaryButton
              action={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                e.preventDefault();
                if (
                  Object.values(formData).some(
                    (value) => value.toString().trim() === ""
                  )
                ) {
                  toast("Please filled in all requested field(s)");
                  return;
                }
                if (
                  parseFloat(formData.budget_lower_limit) >
                  parseFloat(formData.budget_upper_limit)
                ) {
                  toast("Please filled in valid budget range");
                  return;
                }
                if (session == null) {
                  toast("Please Log In before submitting your rquest! ");
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
        </>
      )}

      {error && <p>{error.toString()}</p>}
    </form>
  );
};

export default CreateRequestForm;
