import { create } from "zustand";
import {
  UserProfileSlice,
  createUserProfileSlice,
} from "./slices/userSessionSlice";
import { LoadingSlice, createLoadingSlice } from "./slices/loadingSlice";
import {
  RequestDetailsSlice,
  createRequestDetailsSlice,
} from "./slices/requestDetailsSlice";

type StoreState = UserProfileSlice & LoadingSlice & RequestDetailsSlice;

export const useAppStore = create<StoreState>()((...a) => ({
  ...createUserProfileSlice(...a),
  ...createLoadingSlice(...a),
  ...createRequestDetailsSlice(...a),
}));
