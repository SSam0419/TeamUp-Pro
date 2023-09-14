"use client";

import { IndustriesOptions } from "@/constants/industries";
import PrimaryButton from "@/components/PrimaryButton";
import ToggleButton from "@/components/ToggleButton";
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
  email: string;
  phone_number: string;
  budget: string;
  duration: string;
  contact_person: string;
  industry: (typeof IndustriesOptions)[number];
  disclose_contact: boolean;
  createdBy: string;
};

const CreateRequestForm = ({ onClose }: props) => {
  const { session, profileInfo } = useAppStore();
  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation(
    async (formData: CreateRequestFormDataType) => {
      const result = await axios.post("/api/request", formData, {
        validateStatus: (status) => status >= 200 && status < 300,
      });
      if (result.status !== 201) {
        throw new Error(
          "Please create your user profile before you create a request"
        );
        throw new Error(result.data.error.message);
      }
      return result;
    },
    {
      onSuccess: () => {
        onClose();
        queryClient.invalidateQueries({ queryKey: ["fetchRequestDetails"] });
      },
      onError: (error: Error) => {
        toast(error.toString());
      },
    }
  );

  const [formData, setFormData] = useState<CreateRequestFormDataType>({
    title: "",
    content: "",
    email: profileInfo?.email || session?.user?.email || "",
    phone_number: "",
    budget: "100",
    duration: "",
    contact_person: profileInfo?.username || "",
    industry: IndustriesOptions[0],
    disclose_contact: false,
    createdBy: profileInfo?.id || session?.user?.id || "",
  });

  return (
    <form className="flex-col gap-4 h-[580px] w-[600px] p-4 overflow-y-scroll">
      {isLoading && (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      )}
      {!isLoading && (
        <>
          <div className="flex gap-3 mb-4 items-center">
            <label htmlFor="industries">Industries</label>
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
            <input
              required
              id="budget"
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.budget}
              onChange={(e) => {
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  budget: e.target.value,
                }));
              }}
            ></input>
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
              <select name="" id="">
                <option>Day(s)</option>
                <option>Week(s)</option>
                <option>Month(s)</option>
                <option>Year(s)</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
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
            text="Allow Professionals Contact You Directly"
            action={() => {}}
          />
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
