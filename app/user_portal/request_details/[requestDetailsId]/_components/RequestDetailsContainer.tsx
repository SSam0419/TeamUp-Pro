import { useAppStore } from "@/libs/ZustandStore";
import { REACT_LOADABLE_MANIFEST } from "next/dist/shared/lib/constants";
import React, { useEffect, useState } from "react";

const RequestDetailsContainer = () => {
  const { fetchedSingleRequestDetails } = useAppStore();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [requestDetails, setRequestDetails] = useState(
    fetchedSingleRequestDetails
  );

  useEffect(
    () => setRequestDetails(fetchedSingleRequestDetails),
    [fetchedSingleRequestDetails]
  );

  if (fetchedSingleRequestDetails == null || requestDetails == null) {
    return <div> ... </div>;
  }
  return (
    <div className="flex gap-3 flex-col p-2">
      <div>
        <p className="text-lg font-medium">{requestDetails.title}</p>
        <p>{requestDetails.industry}</p>
      </div>
      <div className="border"></div>
      <div>
        <label>Duration : </label>
        <input
          className="bg-white"
          value={requestDetails.duration}
          disabled={!editMode}
        ></input>
      </div>
      <div>
        <label>Budget (HKD) : </label>
        <input
          className="bg-white"
          disabled={!editMode}
          value={requestDetails.budget}
        ></input>
      </div>
      <div>
        <p>
          Disclose Contact : {requestDetails.disclose_contact ? "YES" : "NO"}
        </p>
      </div>
      <div>
        <label>
          Status :
          <select
            name="status"
            value={requestDetails.status}
            disabled={!editMode}
          >
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Hired">Hired</option>
          </select>
        </label>
      </div>
      <div className="border"></div>
      <div>
        <p>{requestDetails.content}</p>
      </div>
      <div className="border"></div>

      <label>
        Pitches:
        <ul>
          {requestDetails.pitches?.map((pitch, index) => (
            <li key={index}>{pitch.id}</li>
          ))}
        </ul>
      </label>
    </div>
  );
};

export default RequestDetailsContainer;
