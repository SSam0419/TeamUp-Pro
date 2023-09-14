type RequestDetails = {
  id: string;
  user_profile: UserProfile | null;
  title: string;
  industry: string;
  content: string;
  duration: string;
  budget: number;
  disclose_contact: boolean;
  status: "Active" | "Expired" | "Cancelled" | "Hired";
  pitches: Pitch[];
};
