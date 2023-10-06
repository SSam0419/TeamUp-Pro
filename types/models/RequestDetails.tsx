type RequestDetails = {
  id: string;
  user_profile: UserProfile | null;
  title: string;
  industry: string;
  content: string;
  duration: string;
  created_at: Date;
  duration_unit: string;
  month_until_expiration: number;
  budget_lower_limit: number;
  budget_upper_limit: number;
  status: "Active" | "Expired" | "Cancelled" | "Hired";
  // professional_pitch: Pitch[];
  professional_pitch_view: Pitch[];
  pitch: Pitch;
  unlocked: boolean;
};
