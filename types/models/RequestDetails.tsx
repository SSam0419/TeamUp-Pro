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
  budget: number;
  disclose_contact: boolean;
  status: "Active" | "Expired" | "Cancelled" | "Hired";
  professional_pitch: Pitch[];
  pitch: Pitch;
  unlocked: boolean;
};
