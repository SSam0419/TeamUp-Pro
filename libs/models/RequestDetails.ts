import { Pitch } from "./Pitch";
import { UserProfileClass } from "./UserProfileClass/UserProfileClass";

export type RequestDetails = {
  id: string;
  user_profile: UserProfileClass | null;
  title: string;
  industry: string;
  content: string;
  duration: string;
  created_at: Date;
  duration_unit: DurationUnit;
  month_until_expiration: number;
  budget_lower_limit: number;
  budget_upper_limit: number;
  status: RequestDetailsStatus;
  professional_pitch_view: Pitch[];
  pitch: Pitch;
  unlocked: boolean;
  base_location: string;
  language_requirements: string[];
  workmode: Workmode;
};
