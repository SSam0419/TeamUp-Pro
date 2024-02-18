import { UserProfileClass } from "./UserProfileClass/UserProfileClass";

export type Mailbox = {
  id: string;
  message: string;
  created_at: string;
  is_read: boolean;
  user_profile: UserProfileClass;
  professional_profile: UserProfileClass;
};
