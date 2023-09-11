import { StateCreator } from "zustand";

export interface RequestDetailsSlice {
  fetchedRequestDetails: RequestDetails[];
  setFetchedRequestDetails: (fetchedRequestDetails: RequestDetails[]) => void;
}

export const createRequestDetailsSlice: StateCreator<RequestDetailsSlice> = (
  set
) => ({
  fetchedRequestDetails: [],

  setFetchedRequestDetails: (fetchedRequestDetails: RequestDetails[]) => {
    set({
      fetchedRequestDetails: fetchedRequestDetails,
    });
  },
});
