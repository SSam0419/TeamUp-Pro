import { StateCreator } from "zustand";

export interface LoadingSlice {
  loadingState: boolean;
  setLoadingState: (isLoading: boolean) => void;
}

export const createLoadingSlice: StateCreator<LoadingSlice> = (set) => ({
  loadingState: false,

  setLoadingState: (isLoading: boolean) => {
    set({
      loadingState: isLoading,
    });
  },
});
