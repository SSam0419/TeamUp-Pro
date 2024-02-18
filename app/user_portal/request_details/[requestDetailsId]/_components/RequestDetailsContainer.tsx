import CustomButton from "@/components/CustomButtons/CustomButton";
import ToggleButton from "@/components/CustomButtons/ToggleButton";
import { useAppStore } from "@/libs/ZustandStore";
import axios from "axios";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import PitchCard from "./PitchCard";
import { notFound } from "next/navigation";
import { RequestDetails } from "@/libs/models/RequestDetails";
import { Pitch } from "@/libs/models/Pitch";

const RequestDetailsContainer = () => {
  const { fetchedSingleRequestDetails } = useAppStore();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [requestDetails, setRequestDetails] = useState(
    fetchedSingleRequestDetails
  );

  useEffect(() => {
    setRequestDetails(fetchedSingleRequestDetails);
  }, [fetchedSingleRequestDetails]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setRequestDetails((prev: any) => {
      if (prev === null) {
        return null;
      } else {
        return {
          ...prev,
          [name]: value,
        };
      }
    });
  };

  const { mutate, isLoading } = useMutation(
    ["updateRequestDetails"],
    async (formData: RequestDetails) => {
      const { data, statusText, status } = await axios.put(
        "/api/request/user_request?request_id=" + formData.id,
        formData
      );

      return { data, statusText, status };
    },
    {
      onSuccess: ({ status }) => {
        if (status === 200) toast.success("Update Successful");
        else toast.error("Something went wrong, refresh and try again");
      },
    }
  );

  const handleSubmit = () => {
    if (requestDetails !== null) {
      setEditMode(false);
      mutate(requestDetails);
    }
  };

  if (fetchedSingleRequestDetails == null || requestDetails == null) {
    return (
      <div className="bg-white text-center text-subheading">
        Invalid Request
      </div>
    );
  }

  return (
    <div className="flex w-full">
      <div className="flex gap-3 flex-col p-2 font-light w-full flex-wrap">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-medium w-3/4">{requestDetails.title}</p>
            <p>{requestDetails.industry}</p>
          </div>
          <div
            className=""
            onClick={() => {
              if (requestDetails.status === "Hired") {
                toast.error("You cannot edit hired requerst");
              }
            }}
          >
            <ToggleButton
              disabled={requestDetails.status === "Hired"}
              checked={editMode}
              text={"Edit"}
              action={(editable: boolean) => {
                setEditMode(editable);
              }}
            />
          </div>
        </div>
        <div className="border" />
        <div className="border" />

        <div className="flex gap-4 md:flex-row flex-col">
          <div className="flex flex-col gap-3 w-full md:w-1/2">
            <div className="flex flex-col gap-1">
              <label htmlFor="duration" className="">
                Duration :
              </label>

              <div className="flex justify-between bg-white shadow p-2 border rounded-xl">
                <input
                  type="number"
                  disabled={!editMode}
                  id="duration"
                  className="w-full bg-white outline-none"
                  name="duration"
                  value={requestDetails.duration}
                  onChange={handleInputChange}
                />

                <select
                  disabled={!editMode}
                  id="duration_unit"
                  className="border-l-2 outline-none"
                  name="duration_unit"
                  value={requestDetails.duration_unit}
                  onChange={handleInputChange}
                >
                  <option>Days</option>
                  <option>Months</option>
                  <option>Years</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="budget" className="">
                Budget (HKD) :
              </label>
              <div className="flex flex-col md:flex-row items-start gap-3 md:items-center md:justify-center">
                <div className="flex items-center w-full">
                  <div className="w-1/5 md:hidden">From ~</div>

                  <input
                    disabled={!editMode}
                    id="budget"
                    className="bg-white shadow p-2 border rounded-xl w-full"
                    name="budget_lower_limit"
                    value={requestDetails.budget_lower_limit}
                    onChange={handleInputChange}
                  />
                </div>
                <p className="hidden md:block">-</p>
                <div className="flex items-center w-full">
                  <label className="w-1/5 md:hidden">To ~</label>
                  <input
                    disabled={!editMode}
                    id="budget_upper_limit"
                    className="bg-white shadow p-2 border rounded-xl w-full"
                    name="budget_upper_limit"
                    value={requestDetails.budget_upper_limit}
                    onChange={handleInputChange}
                  />{" "}
                </div>
              </div>
            </div>

            <div className="flex gap-1 items-center">
              <label htmlFor="status" className="">
                Status :
              </label>
              <select
                disabled={!editMode}
                id="status"
                className="bg-white shadow p-2 border rounded-xl"
                name="status"
                value={requestDetails.status}
                onChange={handleInputChange}
              >
                <option value="Active">Active</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Hired">Hired</option>
              </select>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <label htmlFor="content">Content</label>
            <textarea
              disabled={!editMode}
              className="bg-white w-full md:h-4/5 shadow p-2 border rounded"
              name="content"
              value={requestDetails.content}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>

        <CustomButton
          variant="secondary"
          text={"CONFIRM"}
          disabled={!editMode}
          isLoading={isLoading}
          action={() => {
            handleSubmit();
          }}
        />

        <div className="my-6 w-full gap-3 grid grid-cols-3 md:grid-cols-7 items-center">
          <div className="border-secondary border col-span-1 md:col-span-3"></div>
          <p className="text-center text-base italic font-thin text-secondary">
            Received Pitch
          </p>
          <div className="border-secondary border col-span-1 md:col-span-3"></div>
        </div>

        <div>
          <div className="flex flex-col gap-3 flex-wrap">
            {requestDetails.professional_pitch_view?.map(
              (pitch: Pitch, index: React.Key | null | undefined) => (
                <PitchCard
                  pitchData={pitch}
                  requestId={requestDetails.id}
                  key={index}
                />
              )
            )}
            {requestDetails.professional_pitch_view == null ||
              (requestDetails.professional_pitch_view.length == 0 && (
                <div>
                  {" "}
                  Have not receive any pitches yet. Try invite professionals to
                  review your request.{" "}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailsContainer;
