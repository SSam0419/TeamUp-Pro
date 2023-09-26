import SecondaryButton from "@/components/SecondaryButton";
import ToggleButton from "@/components/ToggleButton";
import { useAppStore } from "@/libs/ZustandStore";
import axios from "axios";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import PitchCard from "./PitchCard";

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

    setRequestDetails((prev) => {
      if (prev === null) {
        return null;
      } else {
        if (name === "disclose_contact") {
          return { ...prev, disclose_contact: value === "YES" ? true : false };
        }

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
        if (status === 200) toast("Update Successful");
        else toast("Something went wrong, refresh and try again");
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
    return <div>...</div>;
  }

  return (
    <div className="flex w-full">
      <div className="flex gap-3 flex-col p-2 font-light w-full">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-medium">{requestDetails.title}</p>
            <p>{requestDetails.industry}</p>
          </div>
          <ToggleButton
            checked={editMode}
            text={"Edit"}
            action={(editable: boolean) => {
              setEditMode(editable);
            }}
          />
        </div>
        <div className="border" />
        <div className="border" />

        <div className="flex gap-4">
          <div className="flex flex-col gap-3 w-1/2">
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

              <input
                disabled={!editMode}
                id="budget"
                className="bg-white shadow p-2 border rounded-xl"
                name="budget"
                value={requestDetails.budget}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex gap-1 items-center">
              <label htmlFor="disclose_contact" className="">
                Disclose Contact To Professional :
              </label>
              <select
                disabled={!editMode}
                id="disclose_contact"
                className="bg-white shadow p-2 border rounded-xl"
                name="disclose_contact"
                value={requestDetails.disclose_contact ? "YES" : "NO"}
                onChange={handleInputChange}
              >
                <option>YES</option>
                <option>NO</option>
              </select>
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
          <div className="w-1/2">
            <label htmlFor="content">Content</label>
            <textarea
              disabled={!editMode}
              className="bg-white w-full h-4/5 shadow p-2 border rounded"
              name="content"
              value={requestDetails.content}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>

        <SecondaryButton
          text={"CONFIRM"}
          disabled={!editMode}
          isLoading={isLoading}
          action={() => {
            handleSubmit();
          }}
        />

        <div className="my-6 w-full gap-3 grid grid-cols-7 items-center">
          <div className="border-secondary border col-span-3"></div>
          <p className="text-center text-base italic font-thin text-secondary">
            Received Pitch
          </p>
          <div className="border-secondary border col-span-3"></div>
        </div>

        <div>
          <div className="flex flex-col gap-3">
            {requestDetails.professional_pitch?.map((pitch, index) => (
              <PitchCard pitchData={pitch} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailsContainer;
