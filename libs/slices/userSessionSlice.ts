import { Session } from "@supabase/supabase-js";
import { StateCreator } from "zustand";

export interface IUserProfile {
  session: Session | null;
  profileInfo: UserProfile | null;
}

export interface UserProfileSlice {
  session: Session | null;
  profileInfo: UserProfile | null;
  setUserSession: (session: Session | null) => void;
  setUserProfile: (profileData: UserProfile | null) => void;
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
  setUserProfile: (profileData: UserProfile | null) => {
    set({
      profileInfo: profileData,
    });
  },
});
