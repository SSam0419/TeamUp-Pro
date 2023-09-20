import ToggleButton from "@/components/ToggleButton";
import { useAppStore } from "@/libs/ZustandStore";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

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
    // if (requestDetails!==null)
    //   {setRequestDetails((prev) => ({
    //     ...prev,
    //     [name]: value,
    //   }));}
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Perform PUT request here with updated requestDetails
    // You can use a library like Axios or fetch for making the request
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
            text={"Edit"}
            action={(editable: boolean) => {
              setEditMode(editable);
            }}
          />
        </div>
        <div className="border" />
        <div className="border" />

        <div className="flex gap-2">
          <div className="flex flex-col gap-3 w-1/2">
            <div className="flex flex-col gap-1">
              <label htmlFor="duration" className="">
                Duration :
              </label>

              <input
                disabled={!editMode}
                id="duration"
                className="bg-white shadow p-2 border rounded-xl"
                name="duration"
                value={requestDetails.duration}
                onChange={handleInputChange}
              />
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
              <div key={index} className="p-2 shadow w-full border rounded-2xl">
                {pitch.message}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailsContainer;
