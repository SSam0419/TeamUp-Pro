import { UserProfileClass } from "./UserProfileClass/UserProfileClass";

export type Pitch = {
  id: string;
  created_at: Date;
  delivery_time: number;
  delivery_unit: DurationUnit;
  message: string;
  price: number;
  professional_id: string;
  request_details_id: string;
  updated_at: Date;
  professional_profile: UserProfileClass;
  is_read: boolean;
  is_accepted: boolean;
};
