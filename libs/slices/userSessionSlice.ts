import { Session } from "@supabase/supabase-js";
import { StateCreator } from "zustand";
import { UserProfileClass } from "../types/models/UserProfileClass/UserProfileClass";

export interface IUserProfile {
  session: Session | null;
  profileInfo: UserProfileClass | null;
}

export interface UserProfileSlice {
  session: Session | null;
  profileInfo: UserProfileClass | null;
  setUserSession: (session: Session | null) => void;
  setUserProfile: (profileData: UserProfileClass | null) => void;
}

export const createUserProfileSlice: StateCreator<UserProfileSlice> = (
  set
) => ({
  session: null,
  profileInfo: null,

  setUserSession: (session: Session | null) => {
    set({
      session: session,
    });
  },
  setUserProfile: (profileData: UserProfileClass | null) => {
    set({
      profileInfo: profileData,
    });
  },
});
