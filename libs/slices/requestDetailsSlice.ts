import { StateCreator } from "zustand";

export interface RequestDetailsSlice {
  fetchedRequestDetails: RequestDetails[];
  fetchedSingleRequestDetails: RequestDetails | null;
  setFetchedRequestDetails: (fetchedRequestDetails: RequestDetails[]) => void;
  setFetchedSingleRequestDetails: (
    fetchedRequestDetails: RequestDetails
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
    fetchedSingleRequestDetails: RequestDetails
  ) => {
    set({
      fetchedSingleRequestDetails: fetchedSingleRequestDetails,
    });
  },
});
