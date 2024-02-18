import { StateCreator } from "zustand";
import { RequestDetails } from "../models/RequestDetails";

export interface RequestDetailsSlice {
  fetchedRequestDetails: RequestDetails[];
  fetchedSingleRequestDetails: RequestDetails | null;
  setFetchedRequestDetails: (fetchedRequestDetails: RequestDetails[]) => void;
  setFetchedSingleRequestDetails: (
    fetchedRequestDetails: RequestDetails | null
  ) => void;
}

export const createRequestDetailsSlice: StateCreator<RequestDetailsSlice> = (
  set
) => ({
  fetchedRequestDetails: [],
  fetchedSingleRequestDetails: null,
  setFetchedRequestDetails: (fetchedRequestDetails: RequestDetails[]) => {
    set({
      fetchedRequestDetails: fetchedRequestDetails,
    });
  },
  setFetchedSingleRequestDetails: (
    fetchedSingleRequestDetails: RequestDetails | null
  ) => {
    set({
      fetchedSingleRequestDetails: fetchedSingleRequestDetails,
    });
  },
});
